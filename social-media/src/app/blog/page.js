import React from 'react'
import CreateNewPost from '@/components/CreateNewPost'
import OwnerInf from '@/components/OwnerInf'

export default function BlogPage() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6 border border-red-300'>
      <div className='lg:col-span-6 h-[2000px]'>
        <CreateNewPost />
      </div>
      <div className='hidden lg:block lg:col-span-4 sticky top-20'>
        <OwnerInf />
      </div>
    </div>
  )
}
