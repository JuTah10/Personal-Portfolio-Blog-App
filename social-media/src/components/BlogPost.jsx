"use client"
import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from './ui/avatar';
import Link from 'next/link';


export default function BlogPost({ posts }) {
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
        <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
                {posts.map((post) => (
                    <div key={post.id} className="space-y-4">
                        <div className="flex space-x-3 sm:space-x-4">
                            <Link href={`/profile/${post.author.username}`}>
                                <Avatar className="size-8 sm:w-10 sm:h-10">
                                    <AvatarImage src={post.author.image ?? "/avatar.png"} />
                                </Avatar>
                            </Link>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
