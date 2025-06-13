"use server"

import { prisma } from "../lib/prisma.ts"
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser({ guestInf }) {
    try {
        let user = null;
        if (!guestInf) {
            user = await currentUser();
            if (!user) return;
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: guestInf ? guestInf.guestId : user.id
            }
        })

        if (existingUser) return existingUser;

        await prisma.user.create({
            data: {
                clerkId: guestInf ? guestInf.guestId : user.id,
                name: guestInf ? guestInf.name : `${user.firstName || ""} ${user.lastName || ""}`,
                username: guestInf ? guestInf.name.replace(/\s+/g, '') : user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: guestInf ? guestInf.email : user.emailAddresses[0].emailAddress,
                image: guestInf ? guestInf.image : user.imageUrl,
            }
        })
    } catch (error) {
        console.log("error in syncUser action", error)
    }
}

