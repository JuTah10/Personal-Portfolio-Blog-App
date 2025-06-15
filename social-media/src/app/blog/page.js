"use client"
import React from 'react'
import CreateNewPost from '@/components/CreateNewPost'
import OwnerInf from '@/components/OwnerInf'
import { useAuth } from "@clerk/nextjs";
import { getUserById } from '@/actions/user';

export default function BlogPage() {
  const { isSignedIn, userId } = useAuth();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const data = await getUserById({ clerkId: userId });
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user (Blog Page):", err);
      }
    }

    fetchUser();

  }, [userId])

  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6 border border-red-300'>
      <div className='lg:col-span-6 h-[2000px]'>
        {isSignedIn && (user?.role === "admin") && <CreateNewPost />}
      </div>
      <div className='hidden lg:block lg:col-span-4 sticky top-20'>
        <OwnerInf />
      </div>
    </div>
  )
}
