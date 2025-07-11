
"use client"
import React from 'react'
import CreateNewPost from '@/app/blog/components/CreateNewPost'
import OwnerInf from '@/app/blog/components/OwnerInf'
import BlogPostClient from '@/app/blog/components/BlogPostClient';


import { UserLogInContext } from '@/components/UserLogInContextBlog';


export default function BlogPage() {
  const { userInf, posts } = React.useContext(UserLogInContext);

  const isSignedIn = !!userInf;


  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-7'>
        {isSignedIn && (userInf?.role === "admin") && <CreateNewPost user={userInf} />}
        <div className='space-y-6'>
          <BlogPostClient user={userInf} posts={posts} />
        </div>
      </div>
      <div className='hidden lg:block lg:col-span-3'>
        <OwnerInf />
      </div>
    </div>
  )
}
