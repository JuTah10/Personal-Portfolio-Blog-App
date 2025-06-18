
import React from 'react'
import CreateNewPost from '@/components/CreateNewPost'
import OwnerInf from '@/components/OwnerInf'
import BlogPostClient from '@/components/BlogPostClient';
import { auth } from "@clerk/nextjs/server";
import { getUserById } from '@/actions/user';
import { fetchPosts } from '@/actions/post'

import { cookies } from 'next/headers';

export default async function BlogPage() {

  async function getJsonCookie(name) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    if (!cookie) return null;

    try {
      return JSON.parse(decodeURIComponent(cookie.value));
    } catch (err) {
      console.error("Failed to parse server cookie:", err);
      return null;
    }
  }

  const { userId } = await auth();
  const isSignedIn = !!userId;
  let guest = null;

  if (!userId) {
    guest = await getJsonCookie("guestInf") ?? null;
  }
  const clerkId = userId ?? guest?.guestId;

  const user = clerkId ? await getUserById({ clerkId }) : null;

  const posts = await fetchPosts();



  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-7'>
        {isSignedIn && (user?.role === "admin") && <CreateNewPost user={user} />}
        <div className='space-y-6'>
          <BlogPostClient user={user} posts={posts} />
        </div>
      </div>
      <div className='hidden lg:block lg:col-span-3'>
        <OwnerInf />
      </div>
    </div>
  )
}
