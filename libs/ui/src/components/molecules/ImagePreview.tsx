'use client'
import { TrashIcon } from 'lucide-react'
import { ReactNode, useState, useEffect } from 'react'
import { Button } from '../atoms/button'

export interface IImageUploadProps {
  src?: Blob | MediaSource
  clearImage: () => void
  children: ReactNode
}

export const ImagePreview = ({
  src,
  clearImage,
  children,
}: IImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    // Check if `src` is a FileList and has at least one file
    if (src instanceof FileList && src.length > 0) {
      const file = src[0] // Get the first file from the FileList
      const objectUrl = URL.createObjectURL(file)
      setImageUrl(objectUrl)

      // Cleanup
      return () => {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [src])

  if (src) {
    return (
      <div className="grid items-center justify-center h-full max-w-sm grid-cols-1 grid-rows-1 aspect-square">
        <img
          src={imageUrl}
          alt=""
          className="object-cover w-full h-full col-start-1 row-start-1 rounded shadow"
        />
        <Button
          className="col-start-1 row-start-1 p-2 text-white bg-black/30 justify-self-center"
          onClick={clearImage}
        >
          <TrashIcon /> Clear
        </Button>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-full h-full  min-h-[12rem] bg-gray-100 shadow-inner">
      {children}
    </div>
  )
}
