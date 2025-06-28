import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser, getUserById } from "@/actions/user";
import UserLogInContextBlog from "@/components/UserLogInContextBlog";



export default async function BlogLayout({ children }) {
  const cookieStore = await cookies();
  const guestInfRaw = cookieStore.get("guestInf")?.value;
  const guestInf = guestInfRaw
    ? JSON.parse(decodeURIComponent(guestInfRaw))
    : null;

  const authUser = guestInf ? null : await currentUser();

  const clerkId = guestInf?.guestId || authUser?.id;

  let userInf = null;
  if (clerkId) {
    await syncUser({ guestInf: guestInf ?? null });

    userInf = await getUserById({ clerkId });
  }



  return (
    <UserLogInContextBlog userInf={userInf}>
      <main>
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="hidden lg:block lg:col-span-3">
                <Sidebar />
              </div>
              <div className="lg:col-span-9">
                {children}
              </div>
            </div>

          </div>
        </div>
      </main>
    </UserLogInContextBlog>
  );
}
