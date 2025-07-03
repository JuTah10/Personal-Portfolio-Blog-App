"use server"
import { prisma } from "@/lib/prisma";

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

        return { succcess: true };
    } catch (error) {
        console.error("Failed to updateUserInf: ", error);
        return { succcess: false, error: "Failed to update User Profile" };
    }
}