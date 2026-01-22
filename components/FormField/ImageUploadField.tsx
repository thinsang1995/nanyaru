'use client'

import React, { useState, useRef } from 'react'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { RulesProps } from '../../typing/utils'
import ErrorMessage from './ErrorMessage'
import { compressImages } from '../../utils/imageCompression'

type IImageUploadFieldProps = {
  name: string
  rules?: RulesProps
  error?: FieldError
  maxFiles?: number
  acceptedTypes?: string
}

const ImageUploadField: React.FC<IImageUploadFieldProps> = ({
  name,
  error,
  rules,
  maxFiles = 5,
  acceptedTypes = 'image/*',
}) => {
  const { control } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const isProcessingRef = useRef(false)

  const handleFileChange = async (
    files: FileList | null,
    currentValue: File[],
    onChange: (value: File[]) => void,
  ) => {
    if (!files || files.length === 0 || isProcessingRef.current) return

    isProcessingRef.current = true
    setIsCompressing(true)

    try {
      const newFiles = Array.from(files)
      const existingFiles = Array.isArray(currentValue) ? currentValue : []

      // Compress new images
      console.log('Compressing images...')
      const compressedFiles = await compressImages(newFiles, {
        maxSizeMB: 1, // Max 1MB per image
        maxWidthOrHeight: 1920, // Max 1920px dimension
        quality: 0.8, // 80% quality
      })

      const totalFiles = [...existingFiles, ...compressedFiles].slice(0, maxFiles)

      // Update form value immediately
      onChange(totalFiles)

      // Create previews asynchronously
      const newPreviews: string[] = []
      let loadedCount = 0

      totalFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result as string)
          loadedCount++
          if (loadedCount === totalFiles.length) {
            setPreviews([...newPreviews])
          }
        }
        reader.onerror = () => {
          loadedCount++
        }
        reader.readAsDataURL(file)
      })
    } catch (error) {
      console.error('Image compression error:', error)
      alert('画像の圧縮中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setIsCompressing(false)
      isProcessingRef.current = false

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeFile = (index: number, currentValue: File[], onChange: (value: File[]) => void) => {
    if (isProcessingRef.current) return

    const existingFiles = Array.isArray(currentValue) ? currentValue : []
    const newFiles = existingFiles.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)

    onChange(newFiles)
    setPreviews(newPreviews)
  }

  const handleDivClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isProcessingRef.current && !isCompressing) {
      fileInputRef.current?.click()
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        const currentValue = Array.isArray(value) ? value : []

        return (
          <div className='w-full'>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                isCompressing
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50'
              }`}
              onClick={handleDivClick}
            >
              <input
                ref={fileInputRef}
                type='file'
                accept={acceptedTypes}
                multiple
                className='hidden'
                onChange={(e) => {
                  e.stopPropagation()
                  handleFileChange(e.target.files, currentValue, onChange)
                }}
                onClick={(e) => e.stopPropagation()}
                disabled={isCompressing}
              />
              <div className='flex flex-col items-center'>
                {isCompressing ? (
                  <>
                    <div className='w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3'>
                      <svg className='animate-spin w-7 h-7 text-blue-500' viewBox='0 0 24 24'>
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                          fill='none'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                    </div>
                    <p className='text-sm font-medium text-blue-700'>画像を圧縮中...</p>
                    <p className='text-xs text-blue-500 mt-1'>しばらくお待ちください</p>
                  </>
                ) : (
                  <>
                    <div className='w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3'>
                      <svg
                        className='w-7 h-7 text-green-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <p className='text-sm font-medium text-gray-700'>クリックして画像を選択</p>
                    <p className='text-xs text-gray-400 mt-1'>最大{maxFiles}枚まで（任意）</p>
                    <p className='text-xs text-gray-500 mt-1'>※大きな画像は自動で圧縮されます</p>
                  </>
                )}
              </div>
            </div>

            {/* Preview images */}
            {previews.length > 0 && (
              <div className='mt-4 grid grid-cols-3 gap-3'>
                {previews.map((preview, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className='w-full h-24 object-cover rounded-lg shadow-sm border border-gray-200'
                    />
                    <button
                      type='button'
                      className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md transition-all'
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        removeFile(index, currentValue, onChange)
                      }}
                      disabled={isCompressing}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File count indicator */}
            {currentValue.length > 0 && (
              <p className='text-sm text-green-600 mt-3 flex items-center gap-1'>
                <span>✓</span> {currentValue.length}/{maxFiles}枚選択中
                {currentValue.length > 0 && (
                  <span className='text-xs text-gray-500 ml-2'>
                    (合計: {(currentValue.reduce((sum, f) => sum + f.size, 0) / 1024).toFixed(0)}KB)
                  </span>
                )}
              </p>
            )}

            {error?.message && <ErrorMessage message={error.message} />}
          </div>
        )
      }}
    />
  )
}

export default ImageUploadField
