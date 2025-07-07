"use client"
import { UploadDropzone, UploadIcon } from '@uploadthing/react'
import React from 'react'

export default function BlogUploadImage({ endpoint, value, onChange }) {
  if (value) {
    console.log("here")
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
      className="cursor-pointer w-UploadIcon h-70 p-4 flex flex-col items-center gap-2 border border-zinc-700 rounded-lg
  "
      appearance={{
        button: `bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-5 rounded transition-colors duration-150`,
      }}

      onClientUploadComplete={(res) => {
        console.log(res)
        const uploadedUrl = res?.[0]?.fileUrl || res?.[0]?.url;
        if (uploadedUrl) {
          onChange(uploadedUrl);
        }
      }}

      onUploadError={(error) => {
        console.log(error);
      }}
    />


  )
}
