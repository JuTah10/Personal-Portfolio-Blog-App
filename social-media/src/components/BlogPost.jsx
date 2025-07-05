"use client"
import React from 'react'

import { HeartIcon, MessageCircleIcon, Trash, LoaderCircle } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';

import CreateNewComment from './CreateNewComment';
import Time from './Time';

import { formatDistanceToNow } from "date-fns"

import { postLike, createNewCommment, deletePost } from '@/actions/post';

import toast from 'react-hot-toast';

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


export default function BlogPost({ post, user }) {
    const [liked, setLiked] = React.useState(post.likes.some(like => like.authorId === user?.id));
    const [updateLikes, setUpdateLikes] = React.useState(post._count.likes);
    const [processingLike, setProcessingLike] = React.useState(false);

    const [showComments, setShowComments] = React.useState(false);

    const [comment, setComment] = React.useState(post.comments);
    const [commentAmount, setCommentAmount] = React.useState(post.comments.length)
    const [newComment, setNewComment] = React.useState("")
    const [commentPosting, setCommentPosting] = React.useState(false);

    const [isDeletingPost, setIsDeletingPost] = React.useState(false);

    const lines = post.content.split("\n")
    const title = lines[0];
    const content = lines.slice(1).join("\n");


    async function handleLike() {
        if (processingLike) return;
        try {
            setProcessingLike(true);
            setLiked(!liked);
            setUpdateLikes(prevLike => prevLike + (liked ? -1 : +1));
            await postLike({ authorId: user.id, postId: post.id })
        } catch (error) {
            setUpdateLikes(post._count.likes)
            setLiked(post.likes.some(like => like.authorId === user?.id));
            setLiked(post.likes.authorId === user?.id)
        } finally {
            setProcessingLike(false);
        }
    }

    async function handleComment() {
        if (commentPosting) return;
        try {
            setCommentPosting(true);
            const getComment = await createNewCommment({ content: newComment, authorId: user.id, postId: post.id })
            setComment(prevComment => [{ ...getComment, author: { image: user.image, username: user.username } }, ...prevComment]);
            setCommentAmount(prev => prev + 1);
        } catch (error) {
            console.error("Error frontend when adding new comment", error)
        } finally {
            setCommentPosting(false);
        }
    }

    async function handleDeletePost() {
        if (isDeletingPost) return;
        try {
            setIsDeletingPost(true);
            const result = await deletePost({ postId: post.id });
            if (result.success) {
                toast.success("Deleted Post")
            }
        } catch (error) {
            console.error("Error in BlogPost - handleDeletPost", error);
            toast.error("Failed to delete post. Please try again!");
        } finally {
            setIsDeletingPost(false);
        }
    }


    return (
        <Card id={post.id.toString()} className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                    <div className="flex space-x-3 sm:space-x-4">
                        <Link href={`/profile/${post.author.id}`}>
                            <Avatar className="size-8 sm:w-10 sm:h-10">
                                <AvatarImage src={post.author.image ?? "/avatar.png"} />
                            </Avatar>
                        </Link>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                                    <Link
                                        href={`/profile/${post.author.id}`}
                                        className="font-semibold truncate"
                                    >
                                        {post.author.name}
                                    </Link>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Link href={`/profile/${post.author.id}`}>
                                            @{post.author.username}
                                        </Link>
                                        <span>•</span>
                                        <span><Time date={post.updatedAt} /></span>

                                    </div>
                                </div>

                                {(user?.role === "admin") && (
                                    isDeletingPost ?
                                        <LoaderCircle className='size-4 animate-spin' />
                                        :
                                        <Trash
                                            onClick={handleDeletePost}
                                            className={`size-4 transition hover:brightness-70 cursor-pointer`}
                                        />
                                )}
                            </div>
                            <div>
                                <h1
                                    className='text-xl break-words my-1'
                                >
                                    {title}
                                </h1>
                                <p
                                    className={`text-sm text-foreground break-words whitespace-pre-line}`}
                                >
                                    {content}
                                </p>
                            </div>

                        </div>
                    </div>
                    {post.image && (
                        <div className="rounded-lg overflow-hidden">
                            <img src={post.image} alt="Post content" className="w-full h-auto object-cover" />
                        </div>
                    )}

                    <div className="flex items-center pt-2 space-x-4">
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
                            onClick={() => setShowComments((prev) => !prev)}
                        >
                            <MessageCircleIcon
                                className={`size-5 ${showComments ? "fill-blue-500 text-blue-500" : ""}`}
                            />
                            <span>{comment.length}</span>
                        </Button>
                    </div>


                    <Dialog open={showComments} onOpenChange={setShowComments}>
                        <DialogContent className="block lg:flex !w-[95vw] xl:!w-[60vw] !h-[90vh] !max-w-[100vw] !max-h-[90vh] overflow-y-auto">
                            <div className='p-4 w-full lg:w-[60%] border-b-2 lg:border-r-2 lg:border-b-0 mb-4 lg:mb-0'>
                                <DialogHeader>
                                    <DialogTitle className="mb-5 break-words pb-4 border-b-2">{title}</DialogTitle>
                                    <DialogDescription className="break-words whitespace-pre-line text-left overflow-y-auto">
                                        {content}
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                            <div className='w-full lg:w-[35%]'>
                                <div className='grid grid-rows-12 grid-cols-1 gap-2 h-full'>
                                    {/* Author infor display */}
                                    <div className="row-span-1 flex items-center space-x-3 sm:space-x-4">
                                        <Link href={`/profile/${post.author.id}`}>
                                            <Avatar className="size-8 sm:w-10 sm:h-10">
                                                <AvatarImage src={post.author.image} />
                                            </Avatar>
                                        </Link>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                                                    <Link
                                                        href={`/profile/${post.author.id}`}
                                                        className="font-semibold truncate"
                                                    >
                                                        {post.author.name}
                                                    </Link>
                                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                        <Link href={`/profile/${post.author.id}`}>
                                                            @{post.author.username}
                                                        </Link>
                                                        <span>•</span>
                                                        <span>{<Time date={post.updatedAt} />}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Comments */}
                                    <div
                                        className='row-span-9 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                                    >
                                        {(comment.length > 0) &&
                                            comment.map((com) => {
                                                return (
                                                    <div
                                                        key={com.id}
                                                        className='flex items-center space-x-3 sm:space-x-4 mx-2 my-4'>
                                                        <Avatar className="size-8 sm:w-10 sm:h-10">
                                                            <AvatarImage src={com.author.image ?? "https://www.gravatar.com/avatar/?d=mp"} />
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0 ">
                                                            <div className="flex items-start justify-between ">
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm min-w-0" >
                                                                    <div className='min-w-0'>
                                                                        <span className="font-semibold">{com.author.username}</span>
                                                                        <span className='ml-1 font-thin break-words whitespace-pre-wrap'>{com.content}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                                <Time date={com.createdAt} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    {/* Like/Comment/create new comment section */}
                                    <div className='row-span-2'>
                                        <CreateNewComment
                                            user={user}
                                            liked={liked}
                                            handleLike={handleLike}
                                            updateLikes={updateLikes}
                                            post={post}
                                            handleComment={handleComment}
                                            commentPosting={commentPosting}
                                            newComment={newComment}
                                            setNewComment={setNewComment}
                                            comment={comment}
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </CardContent>
        </Card>
    );
}
