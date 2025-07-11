import React from 'react'

import { Button } from '../../../components/ui/button'
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
import { Input } from '../../../components/ui/input';

import { HeartIcon, MessageCircleIcon, Loader2Icon } from 'lucide-react';



export default function CreateNewComment({ user, liked, handleLike, updateLikes, handleComment, commentPosting, newComment, setNewComment, comment }) {
    const inputRef = React.useRef(null);

    return (
        <div className='lg:mt-4'>
            <div className='flex items-center'>
                {user ?
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`cursor-pointer text-muted-foreground gap-2 ${liked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
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
                    className="cursor-pointer text-muted-foreground gap-2 hover:text-blue-500"
                    onClick={() => {
                        if (inputRef.current) inputRef.current.focus();
                    }}
                >
                    <MessageCircleIcon
                        className={`size-5  "fill-blue-500 text-blue-500" }`}
                    />
                    <span>{comment.length}</span>
                </Button>
            </div>
            {/* input field */}
            <div className='relative mt-4 border-t-1 w-full p-2 flex justify-center items-center'>
                {commentPosting ?
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    :
                    <>
                        <Input
                            ref={inputRef}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={`${user ? "Add a comment..." : "Sign in to leave a comment"}`}
                            className="p-4 pr-11 font-bold border-none focus-visible:ring-0 !bg-card resize-none"
                            disabled={!user || commentPosting}
                        />
                        <button
                            disabled={!newComment.trim() || commentPosting}
                            className='absolute top-3 right-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={async () => {
                                await handleComment();
                                setNewComment("");
                            }}
                        >
                            Post
                        </button>
                    </>
                }
            </div>

        </div>
    )
}
