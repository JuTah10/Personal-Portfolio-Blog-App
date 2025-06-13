import { currentUser } from '@clerk/nextjs/server';
import { UnauthenticatedSidebar } from './UnauthenticatedSidebar';
import { cookies } from 'next/headers';

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
    return (
        <>Hello</>
    );

}

