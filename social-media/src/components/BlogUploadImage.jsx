"use client"
import React from 'react'
import { UploadDropzone } from '@uploadthing/react'
import { XIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'


export default function BlogUploadImage({ endpoint, value, onChange }) {
  if (value) {
    return (
      <div className="relative size-40">
        <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      className="cursor-pointer w-UploadIcon h-70 p-4 flex flex-col items-center gap-2 border border-zinc-700 rounded-lg"
      appearance={{
        button: `bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-5 rounded transition-colors duration-150`,
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error) => {
        toast.error("Error uploading photos. Please try again!")
        console.log(`ERROR! ${error.message}`);
      }}
    />
  )
}
