import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import { MapPinIcon, LinkIcon } from 'lucide-react'


export default function UserCard({ userInf }) {
  return (
    <Card className="w-full max-w-sm">
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

        <Separator className="my-4" />
        <div className="w-full space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPinIcon className="w-4 h-4 mr-2" />
            {userInf.location || "No location"}
          </div>
          <div className="flex items-center text-muted-foreground">
            <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
            {userInf.website ? (
              <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
                {userInf.website}
              </a>
            ) : (
              "No website"
            )}
          </div>
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
