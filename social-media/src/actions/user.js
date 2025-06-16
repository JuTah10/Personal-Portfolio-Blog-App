"use server"

import { prisma } from "../lib/prisma.ts"
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser({ guestInf }) {
    try {
        const clerkUser = guestInf ? null : await currentUser();
        if (!guestInf && !clerkUser) return null;

        const clerkId = guestInf?.guestId ?? clerkUser.id;
        const name = (guestInf?.name
            ?? `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`
        ).trim();
        const username = guestInf
            ? guestInf.name.replace(/\s+/g, "")
            : clerkUser.username
            || clerkUser.emailAddresses[0].emailAddress.split("@")[0];
        const email = guestInf?.email ?? clerkUser.emailAddresses[0].emailAddress;
        const image = guestInf?.image ?? clerkUser.imageUrl;

        await prisma.user.upsert({
            where: { email },
            update: {
                clerkId,
                name,
                username,
                image,
            },
            create: {
                clerkId,
                name,
                username,
                email,
                image,
            },
        });
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

export async function getUserIdFromClerkId() {
    const { userId: clerkId } = await auth();

    if (!clerkId) throw new Error("User not found with this clerkId");

    const user = await getUserById({ clerkId });
    if (!user) throw new Error("User not found!");

    return user.id;
}

