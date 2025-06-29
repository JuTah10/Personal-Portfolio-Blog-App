"use client"
import React from 'react'
import Link from 'next/link'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

import { UserLogInContext } from "./UserLogInContextBlog";

export default function Navbar() {
    const { userInf } = React.useContext(UserLogInContext)

    const userInfor = userInf ? {
        userName: userInf.username,
        emailAddress: userInf.email,
        guest: userInf.email.startsWith("guest_") ? true : false
    } : null
    return (
        <div className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
            <div className='max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <Link
                            href="/"
                            className='text-xl font-bold text-primary font-mono tracking-wider'
                        >
                            Vu Nguyen
                        </Link>
                    </div>
                    <DesktopNavbar user={userInfor} />
                    <MobileNavbar user={userInfor} />
                </div>

            </div>
        </div>
    )
}

