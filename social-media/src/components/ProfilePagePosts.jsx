import React from 'react'

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { HeartIcon } from "lucide-react"

import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation';

export default function ProfilePagePosts({ posts }) {
    const { theme } = useTheme();
    const router = useRouter();
    return (
        <Card
            className={`grid md:grid-cols-2 p-4 ${theme === "dark" ? "brightness-75" : ""}`}
        >
            {posts.map((post) => {
                return (
                    <Card
                        key={post.post.id}
                        className="brightness-125 bg-card text-card-foreground self-start"
                    >
                        <CardContent className="px-4 sm:px-6">
                            <div className="flex space-x-3 sm:space-x-4 justify-start items-center">
                                <Avatar className="size-8 sm:w-10 sm:h-10">
                                    <AvatarImage src={post.author.image ?? "/avatar.png"} />
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                                            <div className="font-semibold truncate">
                                                {post.author.name}
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <div>
                                                    @{post.author.username}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p
                                        className={`mt-2 text-sm text-foreground break-words whitespace-pre-line }`}
                                    >
                                        {post.post.content}
                                    </p>
                                </div>
                            </div>
                            {post.post.image && (
                                <div className="rounded-lg overflow-hidden">
                                    <img src={post.post.image} alt="Post content" className="w-full h-auto object-cover" />
                                </div>
                            )}
                            {/* Like and Go to Post button */}
                            <div className="flex justify-between items-center pt-2 space-x-4">
                                <Button
                                    variant="ghost"
                                    size="small"
                                    className="gap-2 text-red-500"
                                    disabled
                                >
                                    <HeartIcon className="size-5 fill-current" />
                                </Button>
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
    )
}
