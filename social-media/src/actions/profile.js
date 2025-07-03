"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserProfile({ newUserProfile }) {


    try {
        const testNewData = await prisma.user.update({
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