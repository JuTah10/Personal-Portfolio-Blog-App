"use server"
import { prisma } from "@/lib/prisma";

export async function getNotifications({ receiverId }) {
    try {
        const result = await prisma.notification.findMany({
            where: {
                receiverId
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                type: true,
                read: true,
                createdAt: true,
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

export async function setReadNotification({ notificationId }) {
    try {
        await prisma.notification.update({
            where: {
                id: notificationId
            },
            data: {
                read: true
            }
        })
    } catch (error) {
        console.error("Failed setting notificaions to Read", error);
        throw error;
    }
}