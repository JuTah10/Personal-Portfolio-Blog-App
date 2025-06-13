import React from 'react'
import Link from 'next/link'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from '@/actions/user';
import { cookies } from 'next/headers';

export default async function Navbar() {
    const cookieStore = await cookies();
    const guestInfoRaw = cookieStore.get("guestInf")?.value;
    let user = null;
    let guestInf = null;

    if (!guestInfoRaw) {
        user = await currentUser();
    } else {
        guestInf = guestInfoRaw ? JSON.parse(decodeURIComponent(guestInfoRaw)) : null;
    }
    if (guestInfoRaw || user) await syncUser({ guestInf });
    const userInfor = guestInf || user ? {
        userName: guestInf ? guestInf.name.replace(/\s+/g, '') : user.username,
        emailAddress: guestInf ? guestInf.email : user.emailAddresses[0]?.emailAddress,
        guest: guestInf ? true : false
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

