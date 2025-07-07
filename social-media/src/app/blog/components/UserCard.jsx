import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"



export default function UserCard({ userInf }) {
  return (
    <Card className="w-full max-w-sm sticky top-20">
      <CardContent>
        <div className='flex flex-col justify-center items-center gap-y-1'>
          <Avatar className="w-20 h-20 border-2 mb-4">
            <AvatarImage src={userInf.image} />
          </Avatar>
          <CardTitle>
            <h1>{userInf.name}</h1>
          </CardTitle>
          <CardDescription>
            {userInf.username}
          </CardDescription>
        </div>

        {userInf.clerkId.startsWith("guest_") && (
          <div
            className="border-t-2 border-red-400 mt-4 pt-2 text-red-400 text-center text-xs"
          >
            Create a real user account to edit your profile
          </div>
        )}
      </CardContent>
    </Card>
  )
}
