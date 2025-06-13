import { currentUser } from '@clerk/nextjs/server';
import { UnauthenticatedSidebar } from './UnauthenticatedSidebar';

export default async function Sidebar() {
    const authUser = await currentUser();
    if (!authUser) return <UnauthenticatedSidebar />
    return(
        <>Hello</>
    );

}

