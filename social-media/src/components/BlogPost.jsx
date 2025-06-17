"use client"
import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from './ui/avatar';
import Link from 'next/link';

import { formatDistanceToNow } from "date-fns"

export default function BlogPost({ posts, admin }) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (posts) setLoading(false);
    }, [posts])


    if (loading) return (
        <div className='flex justify-center items-center animate-spin'>
            <AiOutlineLoading3Quarters />
        </div>
    );

    return (
        <>
            {
                posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
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

                                            {admin && (
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
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
}
