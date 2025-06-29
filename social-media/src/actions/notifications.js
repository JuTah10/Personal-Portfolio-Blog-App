"use server"
import { prisma } from "@/lib/prisma";

export async function getNotifications({ receiverId }) {
    try {
        const result = await prisma.notification.findMany({
            where: {
                receiverId
            },
            orderBy:{
                createdAt: "desc"
            },
            select: {
                sender: {
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
                        image: true
                    }
                },
                comment: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true
                    }
                }
            }
        })
        return result
    } catch (error) {
        console.error("Failed fetch Notificationss", error);
        throw error;
    }
}