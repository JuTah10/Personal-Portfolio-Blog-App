"use client"
import React from 'react'
import { getNotifications } from '@/actions/notifications'
import { UserLogInContext } from '@/components/UserLogInContextBlog';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Ellipsis, Check, Settings } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState([]);
  const [readNotifications, setReadNotifications] = React.useState(true);
  const { userInf } = React.useContext(UserLogInContext);


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
               onClick={()=>setReadNotifications(true)}
            >
              All
            </Button>
            <Button
              variant={`${!readNotifications ? "secondary" : "ghost"}`}
              className="rounded-3xl cursor-pointer"
              onClick={()=>setReadNotifications(false)}
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

        </CardContent>
     
      </Card>
    </div>

  )
}
