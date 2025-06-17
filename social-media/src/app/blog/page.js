
import React from 'react'
import CreateNewPost from '@/components/CreateNewPost'
import OwnerInf from '@/components/OwnerInf'
import BlogPost from '@/components/BlogPost'
import { auth } from "@clerk/nextjs/server";
import { getUserById } from '@/actions/user';
import { fetchPosts } from '@/actions/post'

export default async function BlogPage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;
  const user = userId ? await getUserById({ clerkId: userId }) : null;
  const posts = await fetchPosts();




  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-7'>
        {isSignedIn && (user?.role === "admin") && <CreateNewPost user={user} />}
        <div className='space-y-6'>
          <BlogPost posts={posts} user={user}/>
        </div>
      </div>
      <div className='hidden lg:block lg:col-span-3 sticky top-20'>
        <OwnerInf />
      </div>
    </div>
  )
}
