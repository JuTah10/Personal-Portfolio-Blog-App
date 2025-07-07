import { Geist, Geist_Mono } from "next/font/google";
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


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vu Nguyen",
  description: "Vu Nguyen Personal Portfolio",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
                <main className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
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
