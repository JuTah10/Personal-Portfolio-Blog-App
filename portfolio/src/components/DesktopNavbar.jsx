"use client"
import React from "react";
import { BellIcon, HomeIcon, UserIcon, NotebookPen, FolderDot, LogOutIcon, Linkedin, Mail, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ModeToggle";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import { useRouter } from "next/navigation";


function DesktopNavbar({ user }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [hideCtrlKey, setHideCtrKey] = React.useState(false);
    const [hideShiftKey, setHideShiftKey] = React.useState(false);


    React.useEffect(() => {
        function down(e) {
            if (open) {
                if (e.shiftKey) {
                    setHideShiftKey(true);
                }
                if (e.key === "H" && (e.shiftKey)) {
                    e.preventDefault()
                    setOpen((open) => !open);
                    router.push('/')
                }
                if (e.key === "P" && (e.shiftKey)) {
                    e.preventDefault()
                    setOpen((open) => !open);
                    router.push('/#projects')
                }
                if (e.key === "B" && (e.shiftKey)) {
                    e.preventDefault()
                    setOpen((open) => !open);
                    router.push('/blog')
                }
                if (e.key === "L" && (e.shiftKey)) {
                    e.preventDefault()
                    setOpen((open) => !open);
                    window.open("https://www.linkedin.com/in/vu-nguyen-5a739026b/")
                }
                if (e.key === "E" && (e.shiftKey)) {
                    e.preventDefault()
                    setOpen((open) => !open);
                    window.open("mailto:vn22dy@brocku.ca")
                }
                if (e.key === "G" && (e.shiftKey)) {
                    e.preventDefault()
                    setOpen((open) => !open);
                    window.open("https://github.com/JuTah10")
                }

            }
            if (e.ctrlKey) {
                setHideCtrKey(true);
            }
            if (e.key === "k" && (e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }

        }
        function up(e) {
            if (e.key === "Control") {
                setHideCtrKey(false);
            }
            if (e.key === "Shift") {
                setHideShiftKey(false);
            }
        }
        document.addEventListener("keydown", down)
        document.addEventListener("keyup", up);
        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener("keyup", up);
        };
    }, [open])

    return (
        <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            <Button
                onClick={() => setOpen((open) => !open)}
                variant="secondary" className="flex items-center gap-2 cursor-pointer"
                asChild
            >
                <span>
                    <span className="hidden lg:inline">Press{" "}</span>
                    <kbd className={`${hideCtrlKey && "invisible"} bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none`}>
                        <span className="text-xs">Ctrl</span>
                    </kbd>

                    <span className="mx-1">+</span>
                    <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                        <span className="text-xs">K</span>
                    </kbd>
                </span>
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
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        <CommandItem>
                            <HomeIcon />
                            <span>Home</span>
                            <CommandShortcut>
                                <kbd className={`${hideShiftKey && "invisible"} bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none`}>Shift</kbd>
                                <span className="mx-2">+</span>
                                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">H</kbd>
                            </CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <FolderDot />
                            <span>Projects</span>
                            <CommandShortcut>
                                <kbd className={`${hideShiftKey && "invisible"} bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none`}>Shift</kbd>
                                <span className="mx-2">+</span>
                                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">P</kbd>
                            </CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <NotebookPen />
                            <span>Blog</span>
                            <CommandShortcut>
                                <kbd className={`${hideShiftKey && "invisible"} bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none`}>Shift</kbd>
                                <span className="mx-2">+</span>
                                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">B</kbd>
                            </CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Links">
                        <CommandItem>
                            <Linkedin />
                            <span>LinkedIn</span>
                            <CommandShortcut>
                                <kbd className={`${hideShiftKey && "invisible"} bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none`}>Shift</kbd>
                                <span className="mx-2">+</span>
                                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">L</kbd>
                            </CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Mail />
                            <span>Email</span>
                            <CommandShortcut>
                                <kbd className={`${hideShiftKey && "invisible"} bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none`}>Shift</kbd>
                                <span className="mx-2">+</span>
                                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">E</kbd>
                            </CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Github />
                            <span>Github</span>
                            <CommandShortcut>
                                <kbd className={`${hideShiftKey && "invisible"} bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none`}>Shift</kbd>
                                <span className="mx-2">+</span>
                                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">G</kbd>
                            </CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

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