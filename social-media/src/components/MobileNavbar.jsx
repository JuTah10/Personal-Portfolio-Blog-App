"use client";

import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon, NotebookPen, FolderDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./ui/ModeToggle";

function MobileNavbar({ user }) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <div className="flex md:hidden items-center space-x-2">
            <ModeToggle variant="ghost" />

            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger className="cursor-pointer" asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <MenuIcon className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 mt-6">
                        <Button
                            onClick={() => setShowMobileMenu(false)}
                            variant="ghost"
                            className="flex items-center gap-3 justify-start" asChild>
                            <Link href="/">
                                <HomeIcon className="w-4 h-4" />
                                Home
                            </Link>
                        </Button>

                        <Button
                            onClick={() => setShowMobileMenu(false)}
                            variant="ghost"
                            className="flex items-center gap-3 justify-start" asChild>
                            <Link href="/#projects">
                                <FolderDot className="w-4 h-4" />
                                Project
                            </Link>
                        </Button>

                        <Button
                            onClick={() => setShowMobileMenu(false)}
                            variant="ghost"
                            className="flex items-center gap-3 justify-start" asChild>
                            <Link href="/blog">
                                <NotebookPen className="w-4 h-4" />
                                Blog
                            </Link>
                        </Button>

                        {user ? (
                            <>
                                <Button
                                    onClick={() => setShowMobileMenu(false)}
                                    variant="ghost"
                                    className="flex items-center gap-3 justify-start"
                                    asChild
                                >
                                    <Link href="/notifications">
                                        <BellIcon className="w-4 h-4" />
                                        Notifications
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => setShowMobileMenu(false)}
                                    variant="ghost"
                                    className="flex items-center gap-3 justify-start" asChild
                                >
                                    <Link
                                        href={`/profile/${user.id}`}
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </Button>
                                <SignOutButton>
                                    <Button
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                            document.cookie = "guestInf=; path=/; max-age=0";
                                            window.location.reload();
                                            
                                        }}
                                        variant="ghost"
                                        className="flex items-center gap-3 justify-start w-full cursor-pointer">
                                        <LogOutIcon className="w-4 h-4" />
                                        Logout
                                    </Button>
                                </SignOutButton>
                            </>
                        ) : (
                            <SignInButton mode="modal">
                                <Button
                                    onClick={() => setShowMobileMenu(false)}
                                    variant="default"
                                    className="w-full cursor-pointer">
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