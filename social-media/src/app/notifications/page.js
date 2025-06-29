"use client"
import React from 'react'
import { getNotifications } from '@/actions/notifications'
import { UserLogInContext } from '@/components/UserLogInContextBlog';

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState([]);
  const { userInf } = React.useContext(UserLogInContext);


  React.useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications({ receiverId: userInf.id }) 
      setNotifications(data)

    }
    fetchNotifications();

  }, [])


  return (
    <div>
      
    </div>
  )
}
