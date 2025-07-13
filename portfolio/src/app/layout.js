import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser, getUserById } from "@/actions/user";
import { fetchPosts } from '@/actions/post'
import UserLogInContextBlog from "@/components/UserLogInContextBlog";

import Navbar from "@/components/Navbar";

import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
  title: "Vu Nguyen",
  description: "Vu Nguyen Personal Portfolio",
  icons: {
    icon: "favicon.ico"
  }
};

export default async function RootLayout({ children }) {

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

  const posts = await fetchPosts();

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${quicksand.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserLogInContextBlog userInf={userInf} posts={posts}>
              <div className="min-h-screen">
                <Navbar />
                <main>
                  <div className="max-w-screen-2xl mx-auto px-4">
                    {children}
                  </div>

                </main>
              </div>
            </UserLogInContextBlog>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
