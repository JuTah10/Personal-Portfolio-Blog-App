import Sidebar from "@/components/Sidebar";




export default async function BlogLayout({ children }) {
  const cookieStore = await cookies();
  const guestInfRaw = cookieStore.get("guestInf")?.value;
  const guestInf = guestInfRaw
    ? JSON.parse(decodeURIComponent(guestInfRaw))
    : null;

  const authUser = guestInf ? null : await currentUser();

  const clerkId = guestInf?.guestId || authUser.id;

  await syncUser({ guestInf: guestInf ?? null });

  const userInf = await getUserById({ clerkId });

  return (
    
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
   
  );
}
