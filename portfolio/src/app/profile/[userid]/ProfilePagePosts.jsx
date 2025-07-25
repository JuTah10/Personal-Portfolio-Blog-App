import React from 'react'

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { HeartIcon, MessageCircleIcon } from "lucide-react"

import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation';

export default function ProfilePagePosts({ posts, type }) {
    const { theme } = useTheme();
    const router = useRouter();


    return (
        <>
            {
                posts.length === 0 ?
                    <div className='flex flex-col justify-center items-center h-[150px] gap-4'>
                        {type === "liked" ?
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <HeartIcon className="size-15 text-red-500" />
                                <h1>Looks like there are no liked posts yet.</h1>
                            </div>
                            :
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <MessageCircleIcon className="size-15 text-blue-500" />
                                <h1>Looks like there are no commented posts yet.</h1>
                            </div>
                        }

                        <Button
                            className="cursor-pointer"
                            onClick={() => router.push("/blog")}
                        >
                            Check out other posts</Button>

                    </div>
                    :
                    <Card
                        className={`grid md:grid-cols-2 p-4 ${theme === "dark" ? "brightness-75" : ""}`}
                    >
                        {posts.map((post) => {
                            return (
                                <Card
                                    key={post.id}
                                    className="brightness-125 bg-card text-card-foreground self-start"
                                >
                                    <CardContent className="px-4 sm:px-6">
                                        <div className="flex space-x-3 sm:space-x-4 justify-start items-center">
                                            <Avatar className="size-8 sm:w-10 sm:h-10">
                                                <AvatarImage src={post.post.author.image ?? "/avatar.png"} />
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex">
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                                                        <div className="font-semibold truncate">
                                                            {post.post.author.name}
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                            <div>
                                                                @{post.post.author.username}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='max-h-[245px] w-full truncate'>
                                                    <h1
                                                        className='text-md break-words my-1 font-bold'
                                                    >
                                                        {post.post.content.split("\n")[0]}
                                                    </h1>
                                                    <p
                                                        className={`text-sm text-foreground break-words whitespace-pre-line`}
                                                    >
                                                        {post.post.content.split("\n").slice(1).join("\n")}
                                                    </p>
                                                    {post.image && (
                                                        <div className="rounded-lg overflow-hidden mt-2">
                                                            <img src={post.post.image} alt="Post content" className="w-full h-auto object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Like and Go to Post button */}
                                        <div className="flex justify-between items-center pt-2 space-x-4">
                                            {type === "liked" ?
                                                <Button
                                                    variant="ghost"
                                                    size="small"
                                                    className="gap-2 text-red-500"
                                                    disabled
                                                >
                                                    <HeartIcon className="size-5 fill-current" />
                                                </Button>
                                                :
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="gap-2 text-blue-500"
                                                    disabled
                                                >
                                                    <MessageCircleIcon
                                                        className={`size-5 fill-current`}
                                                    />
                                                </Button>
                                            }
                                            <Button
                                                className="cursor-pointer hover:brightness-75"
                                                onClick={() => router.push(`/blog/#${post.post.id}`)}
                                            >
                                                Go to Post
                                            </Button>
                                        </div>
                                    </CardContent>

                                </Card>
                            )
                        })}
                    </Card>
            }

        </>
    )
}
