"use server"
import { revalidatePath } from "next/cache";
import { getUserIdFromClerkId } from "./user";


export async function createPost(content, image) {
    try {
        const adminId = await getUserIdFromClerkId();

        const post = await prisma.post.create({
            data: {
                content,
                image,
                authorId: adminId
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
                        authorId: true,
                        createdAt: true
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