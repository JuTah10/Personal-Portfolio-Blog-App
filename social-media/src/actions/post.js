"use server"
import { prisma } from "@/lib/prisma";
import { UserRoundIcon } from "lucide-react";
import { revalidatePath } from "next/cache";



export async function createPost(content, image, authorId) {
    try {
        const post = await prisma.post.create({
            data: {
                content,
                image,
                authorId
            }
        })
        revalidatePath("/blog"); //reinivalidate everytime user visit blog path instead of using cache data
        return { success: true, post: post }

    } catch (error) {
        console.error("Failed to create post:", error);
        return { success: false, error: "Failed to create post" };
    }
}

export async function fetchPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                content: true,
                image: true,
                updatedAt: true,

                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                },
                likes: {
                    select: {
                        authorId: true,
                    }
                },

                comments: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                                image: true,
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },

                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                }

            }
        });

        return posts;
    } catch (error) {
        console.log("Error inside fetchPost", error);
    }
}

export async function postLike({ authorId: userId, postId }) {
    try {
        const hasLiked = await prisma.like.findUnique({
            where: {
                authorId_postId: { authorId: userId, postId }
            }
        })

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                authorId: true
            }
        })
        if (hasLiked) {
            await prisma.like.delete({
                where: {
                    authorId_postId: { authorId: userId, postId }
                }
            });
            return;
        }
        await prisma.$transaction([
            prisma.like.create({
                data: { authorId: userId, postId }
            }),
            ...(post.authorId !== userId
                ? [
                    prisma.notification.create({
                        data: {
                            type: "LIKE",
                            receiverId: post.authorId,
                            senderId: userId,
                            postId
                        }
                    })
                ] :
                [])
        ])
        

    } catch (error) {
        console.error("Failed to insert to Like table", error);
        throw error;
    }
}

export async function createNewCommment({ content, authorId, postId }) {
    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                authorId,
                postId
            }
        })
        return newComment;
    } catch (error) {
        console.error("Failed to insert to Comment table", error);
        throw error;
    }
}

export async function deletePost({ postId }) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) throw new Error("Post not found");
        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        revalidatePath("/blog");
        return { success: true }
    } catch (error) {
        console.error("Failed to delete Post", error);
        throw error;
    }
}