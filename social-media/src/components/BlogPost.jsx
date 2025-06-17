"use client"
import React from 'react'

import { HeartIcon } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';

import { formatDistanceToNow } from "date-fns"

import { postLike } from '@/actions/post';

export default function BlogPost({ post, user }) {
    
    const [liked, setLiked] = React.useState(post.likes.some(like => like.authorId === user?.id));

    const [updateLikes, setUpdateLikes] = React.useState(post._count.likes);
    const [processingLike, setProcessingLike] = React.useState(false);

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

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                    <div className="flex space-x-3 sm:space-x-4">
                        <Link href={`/profile/${post.author.username}`}>
                            <Avatar className="size-8 sm:w-10 sm:h-10">
                                <AvatarImage src={post.author.image ?? "/avatar.png"} />
                            </Avatar>
                        </Link>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                                    <Link
                                        href={`/profile/${post.author.username}`}
                                        className="font-semibold truncate"
                                    >
                                        {post.author.name}
                                    </Link>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Link href={`/profile/${post.author.username}`}>
                                            @{post.author.username}
                                        </Link>
                                        <span>•</span>
                                        <span>{formatDistanceToNow(new Date(post.updatedAt))} ago</span>
                                    </div>
                                </div>

                                {(user?.role === "admin") && (
                                    <span>X</span> //need to implement admin/poster delete later
                                )}
                            </div>
                            <p className="mt-2 text-sm text-foreground break-words">{post.content}</p>
                        </div>
                    </div>
                    {post.image && (
                        <div className="rounded-lg overflow-hidden">
                            <img src={post.image} alt="Post content" className="w-full h-auto object-cover" />
                        </div>
                    )}

                    <div className="flex items-center pt-2 space-x-4">
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
                            )}
                            <span>{updateLikes}</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
