"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { getNotifications } from '@/actions/notifications'
import { UserLogInContext } from '@/components/UserLogInContextBlog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Ellipsis, Check, Settings } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState([]);
  const [readNotifications, setReadNotifications] = React.useState(true);
  const { userInf } = React.useContext(UserLogInContext);
  const router = useRouter();


  React.useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications({ receiverId: userInf.id })
      setNotifications(data)

    }
    fetchNotifications();

  }, [])



  return (
    <div className='w-full flex justify-center items-center'>
      <Card className="w-[80%]">
        <CardHeader>
          <CardTitle>
            Notifications
          </CardTitle>
          <CardDescription
            className="my-2"
          >
            <Button
              variant={`${readNotifications ? "secondary" : "ghost"}`}
              className="rounded-3xl cursor-pointer"
              onClick={() => setReadNotifications(true)}
            >
              All
            </Button>
            <Button
              variant={`${!readNotifications ? "secondary" : "ghost"}`}
              className="rounded-3xl cursor-pointer"
              onClick={() => setReadNotifications(false)}
            >
              Unread
            </Button>
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-3xl cursor-pointer"
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Check /> Mark all as read
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <Settings /> Notification Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent>
          {notifications.map((notification) => {
            return (
              <Card
                onClick={() => router.push(`/blog/#${notification.post.id}`)}
                key={notification.id + notification.post.id + notification.comment?.id}
                className="mb-2"
              >
                <CardContent className="p-4 sm:py-0 flex items-center space-x-3 sm:space-x-4 ">
                  <Avatar className="size-8 sm:w-10 sm:h-10">
                    <AvatarImage src={notification.sender.image ?? "https://www.gravatar.com/avatar/?d=mp"} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm">
                        <div>
                          <span className="font-semibold">{notification.sender.username}</span>
                          <span className='ml-1 font-thin'>
                            {notification.comment ?
                              "commented on your post"
                              :
                              "liked your post"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

              </Card>

            )
          })}
        </CardContent>

      </Card>
    </div>

  )
}
