"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { getNotifications, setReadNotification } from '@/actions/notifications'
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

import Time from '@/components/Time';
import { Ellipsis, Check, Settings, LoaderCircle } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState([]);
  const [readNotifications, setReadNotifications] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const { userInf } = React.useContext(UserLogInContext);
  const router = useRouter();


  React.useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications({ receiverId: userInf.id })
      setNotifications(data);
      setLoading(false);
    }
    fetchNotifications();

  }, [])



  return (
    <div className='w-full flex justify-center items-center'>
      <Card className="w-full md:w-[80%]">
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
        {loading ?
          <div className='w-full flex justify-center items-center h-[200px]'>
            <LoaderCircle className='animate-spin' />
          </div>

          :
          <CardContent>
            {notifications.filter(notification => readNotifications || !notification.read).map((notification) => {
              return (
                <Card
                  onClick={async () => {
                    try {
                      await setReadNotification({ notificationId: notification.id })
                      router.push(`/blog/#${notification.post.id}`)
                    } catch (error) {
                      console.error("Failed to mark notification as read:(front-end)", error);
                    }

                  }}
                  key={notification.id}
                  className={`mb-2 cursor-pointer ${notification.read ? "brightness-90" : "hover:brightness-70"}`}
                >
                  <CardContent className="flex items-center space-x-3 sm:space-x-4">
                    {notification.read ?
                      null
                      :
                      <span
                        className='text-blue-400'
                      >
                        •
                      </span>
                    }

                    <Avatar className="size-8 sm:w-10 sm:h-10">
                      <AvatarImage src={notification.sender.image ?? "https://www.gravatar.com/avatar/?d=mp"} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm">
                          <div>
                            <div className="font-semibold flex ">
                              <div
                                className='mr-1 max-w-[100px] truncate'
                              >
                                {notification.sender.username}
                              </div>
                              <span
                                className='font-thin whitespace-nowrap'
                              >
                                <Time date={notification.createdAt}/>
                              </span>
                            </div>
                            <div className='font-thin'>
                              {notification.comment ?
                                <div className='flex items-center justify-start'>
                                  commented
                                  <div
                                    className='mx-1 font-bold max-w-[50px] md:max-w-[200px] truncate'
                                  >
                                    {notification.comment.content}
                                  </div>
                                  <span>on your post.</span>

                                </div>
                                :
                                <div>liked your post.</div>
                              }

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </CardContent>
        }


      </Card>
    </div>

  )
}
