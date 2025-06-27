"use server"
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

export async function postLike({ authorId, postId }) {
    try {
        const hasLiked = await prisma.like.findUnique({
            where: {
                authorId_postId: { authorId, postId }
            }
        })
        if (hasLiked) {
            await prisma.like.delete({
                where: {
                    authorId_postId: { authorId, postId }
                }
            });
            return;
        }
        await prisma.like.create({
            data: { authorId, postId }

        })
    } catch (error) {
        console.error("Failed to insert to Like table", error);
        throw error;
    }
}

export async function createNewCommment({ content, authorId, postId }) {
    try {
        await prisma.comment.create({
            data:{
                content,
                authorId,
                postId
            }
        })
    } catch (error) {
        console.error("Failed to insert to Comment table", error);
        throw error;
    }

}