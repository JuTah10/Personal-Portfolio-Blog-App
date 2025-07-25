"use server"

import { prisma } from "../lib/prisma.ts"
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser({ guestInf }) {
    try {
        const clerkUser = guestInf ? null : await currentUser();
        if (!guestInf && !clerkUser) return null;
        const email = guestInf?.email ?? clerkUser.emailAddresses[0].emailAddress;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            const clerkId = guestInf?.guestId ?? clerkUser.id;
            const name = (guestInf?.name
                ?? `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`
            ).trim();
            const username = guestInf
                ? guestInf.name.replace(/\s+/g, "")
                : clerkUser.username
                || clerkUser.emailAddresses[0].emailAddress.split("@")[0];

            const image = guestInf?.image ?? clerkUser.imageUrl;

            await prisma.user.create({
                data: {
                    clerkId,
                    name,
                    username,
                    email,
                    image,
                },
            });
        }


    } catch (err) {
        console.error("error in syncUser action", err);
        return null;
    }
}

export async function getUserById({ clerkId }) {
    return prisma.user.findUnique({
        where: {
            clerkId
        },
    })
}

