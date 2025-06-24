import React from 'react'

import { Button } from './ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { HeartIcon, MessageCircleIcon } from 'lucide-react';

export default function CreateNewComment({ user, liked, handleLike, updateLikes, post }) {
    return (
        <div>
            {user ?
                <Button
                    variant="ghost"
                    size="sm"
                    className={`text-muted-foreground gap-2 ${liked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
                        }`}
                    onClick={handleLike}
                >
                    {liked ? (
                        <HeartIcon className="size-5 fill-current" />
                    ) : (
                        <HeartIcon className="size-5" />
                    )
                    }
                    <span>{updateLikes}</span>
                </Button>
                :
                <Dialog>
                    <DialogTrigger asChild>
                        <button className='cursor-pointer flex gap-2 items-center hover:text-red-500'>
                            <HeartIcon className="size-5" />
                            <span>{updateLikes}</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Warning</DialogTitle>
                            <DialogDescription>
                                Please log in, create an account, or continue as a guest to proceed.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" className="cursor-pointer">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }
            <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground gap-2 hover:text-blue-500"

            >
                <MessageCircleIcon
                    className={`size-5  "fill-blue-500 text-blue-500" }`}
                />
                <span>{post.comments.length}</span>
            </Button>
        </div>
    )
}
