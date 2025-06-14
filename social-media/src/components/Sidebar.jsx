"use server"
import { currentUser } from '@clerk/nextjs/server';
import { UnauthenticatedSidebar } from './UnauthenticatedSidebar';
import UserCard from './UserCard';
import { cookies } from 'next/headers';
import { syncUser, getUserById } from '@/actions/user';

export default async function Sidebar() {
    const cookieStore = await cookies();
    const guestInfoRaw = cookieStore.get("guestInf")?.value;
    let guestInf = null;
    let authUser = null;
    if (guestInfoRaw) {
        guestInf = guestInfoRaw ? JSON.parse(decodeURIComponent(guestInfoRaw)) : null;
    } else {
        authUser = await currentUser();
    }

    if (!guestInf && !authUser) return <UnauthenticatedSidebar />

    const clerkId = guestInf?.guestId || authUser?.id;

    let userInf;

    if (clerkId) {
        await syncUser({ guestInf: guestInf ?? null });
        userInf = await getUserById({ clerkId })
    };

    return (
        <UserCard userInf={userInf} />
    );

}

