"use client"
import { BellIcon, HomeIcon, UserIcon, NotebookPen, FolderDot, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ModeToggle";


function DesktopNavbar({ user }) {
    return (
        <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            <Button variant="secondary" className="flex items-center gap-2 cursor-pointer" asChild>
                <span className="hidden lg:inline">Command</span>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/">
                    <HomeIcon className="w-4 h-4" />
                    <span className="hidden xl:inline">Home</span>
                </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/#projects">
                    <FolderDot className="w-4 h-4" />
                    <span className="hidden xl:inline">Project</span>
                </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/blog">
                    <NotebookPen className="w-4 h-4" />
                    <span className="hidden xl:inline">Blog</span>
                </Link>
            </Button>

            {user ? (
                <>
                    {user.admin &&
                        <Button variant="ghost" className="flex items-center gap-2" asChild>
                            <Link href="/notifications">
                                <BellIcon className="w-4 h-4" />
                                <span className="hidden xl:inline">Notifications</span>
                            </Link>
                        </Button>
                    }

                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link
                            href={`/profile/${user.id}`}
                        >
                            <UserIcon className="w-4 h-4" />
                            <span className="hidden xl:inline">Profile</span>
                        </Link>
                    </Button>
                    {user.guest &&
                        <Button
                            onClick={() => {
                                document.cookie = "guestInf=; path=/; max-age=0";
                                window.location.href = "/blog";
                            }}
                            variant="ghost"
                            className="flex items-center gap-2 cursor-pointer"
                            asChild
                        >
                            <div>
                                <LogOutIcon className="w-4 h-4" />
                                <span className="hidden xl:inline">Log out</span>
                            </div>

                        </Button>}

                    <UserButton />
                </>
            ) : (
                <SignInButton mode="modal">
                    <Button
                        className="cursor-pointer"
                        variant="default"
                    >
                        Sign In
                    </Button>
                </SignInButton>
            )}
        </div>
    );
}
export default DesktopNavbar;