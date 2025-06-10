"use server"

import { prisma } from "../lib/prisma.ts"
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
    try {
        const user = await currentUser();
        if (!user) return;

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: user.id
            }
        })

        if (existingUser) return existingUser;

        const dbUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
            }
        })
    } catch (error) {
        console.log("error in syncUser action", error)
    }
}

