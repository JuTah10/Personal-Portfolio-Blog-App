"use client";

import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon, NotebookPen, FolderDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./ui/ModeToggle";

function MobileNavbar({ user }) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { isSignedIn } = useAuth();

    return (
        <div className="flex md:hidden items-center space-x-2">
            <ModeToggle variant="ghost" />

            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MenuIcon className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 mt-6">
                        <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                            <Link href="/">
                                <HomeIcon className="w-4 h-4" />
                                Home
                            </Link>
                        </Button>

                        <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                            <Link href="/#projects">
                                <FolderDot className="w-4 h-4" />
                                Project
                            </Link>
                        </Button>

                        <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                            <Link href="/blog">
                                <NotebookPen className="w-4 h-4" />
                                Blog
                            </Link>
                        </Button>

                        {isSignedIn ? (
                            <>
                                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                                    <Link href="/notifications">
                                        <BellIcon className="w-4 h-4" />
                                        Notifications
                                    </Link>
                                </Button>
                                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                                    <Link
                                        href={`/profile/${user.username ?? user.emailAddress.split("@")[0]
                                            }`}
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </Button>
                                <SignOutButton>
                                    <Button variant="ghost" className="flex items-center gap-3 justify-start w-full">
                                        <LogOutIcon className="w-4 h-4" />
                                        Logout
                                    </Button>
                                </SignOutButton>
                            </>
                        ) : (
                            <SignInButton mode="modal">
                                <Button variant="default" className="w-full">
                                    Sign In
                                </Button>
                            </SignInButton>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileNavbar;