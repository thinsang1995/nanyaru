export interface CompressionOptions {
  maxSizeMB?: number
  maxWidthOrHeight?: number
  quality?: number
}

export async function compressImage(file: File, options: CompressionOptions = {}): Promise<File> {
  const {
    maxSizeMB = 1, // Default: compress to max 1MB
    maxWidthOrHeight = 1920, // Default: max dimension 1920px
    quality = 0.8, // Default: 80% quality
  } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('Failed to read file'))

    reader.onload = (e) => {
      const img = new Image()

      img.onerror = () => reject(new Error('Failed to load image'))

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img

        if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
          if (width > height) {
            height = (height / width) * maxWidthOrHeight
            width = maxWidthOrHeight
          } else {
            width = (width / height) * maxWidthOrHeight
            height = maxWidthOrHeight
          }
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // Use better image smoothing
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'))
              return
            }

            // Check if we need to compress more
            const sizeMB = blob.size / 1024 / 1024

            if (sizeMB > maxSizeMB && quality > 0.1) {
              // Recursively compress with lower quality
              const newFile = new File([blob], file.name, { type: 'image/jpeg' })
              compressImage(newFile, {
                maxSizeMB,
                maxWidthOrHeight,
                quality: quality - 0.1,
              })
                .then(resolve)
                .catch(reject)
            } else {
              // Create compressed file
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })

              resolve(compressedFile)
            }
          },
          'image/jpeg',
          quality,
        )
      }

      img.src = e.target?.result as string
    }

    reader.readAsDataURL(file)
  })
}

export async function compressImages(files: File[], options?: CompressionOptions): Promise<File[]> {
  const compressionPromises = files.map((file) => compressImage(file, options))
  return Promise.all(compressionPromises)
}
