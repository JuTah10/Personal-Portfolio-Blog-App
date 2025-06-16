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
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-7'>
        {isSignedIn && (user?.role === "admin") && <CreateNewPost user={user} />}
      </div>
      <div className='hidden lg:block lg:col-span-3 sticky top-20'>
        <OwnerInf />
      </div>
    </div>
  )
}
