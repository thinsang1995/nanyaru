'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { RulesProps } from '../../typing/utils'
import ErrorMessage from './ErrorMessage'

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
  const isProcessingRef = useRef(false)

  const handleFileChange = (
    files: FileList | null,
    currentValue: File[],
    onChange: (value: File[]) => void,
  ) => {
    if (!files || files.length === 0 || isProcessingRef.current) return

    isProcessingRef.current = true
    const newFiles = Array.from(files)
    const existingFiles = Array.isArray(currentValue) ? currentValue : []
    const totalFiles = [...existingFiles, ...newFiles].slice(0, maxFiles)

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
          isProcessingRef.current = false
        }
      }
      reader.onerror = () => {
        loadedCount++
        if (loadedCount === totalFiles.length) {
          isProcessingRef.current = false
        }
      }
      reader.readAsDataURL(file)
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
    if (!isProcessingRef.current) {
      fileInputRef.current?.click()
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        // Ensure value is always an array
        const currentValue = Array.isArray(value) ? value : []

        return (
          <div className='w-full'>
            <div
              className='border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-200 bg-gray-50'
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
              />
              <div className='flex flex-col items-center'>
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
