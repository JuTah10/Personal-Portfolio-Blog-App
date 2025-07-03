"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserProfile({ newUserProfile }) {
    try {
        await prisma.user.update({
            where: {
                id: newUserProfile.id
            },
            data: {
                name: newUserProfile.name,
                location: newUserProfile.location,
                website: newUserProfile.website
            }
        })

        revalidatePath(`/profile/${newUserProfile.id}`);
        return { succcess: true };
    } catch (error) {
        console.error("Failed to updateUserInf: ", error);
        return { succcess: false, error: "Failed to update User Profile" };
    }
}

export async function fetchUserLikedPosts({ authorId }) {
    try {
        const posts = await prisma.like.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                authorId,
            },
            select: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        content: true,
                        image: true,
                        updatedAt: true
                    }
                }
            }
        });
        return posts;
    } catch (error) {
        console.error("Failed to fetch User Posted Posts: ", error);
    }
}