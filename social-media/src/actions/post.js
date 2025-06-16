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
        revalidatePath("/blog"); //reinivalidate everytime user visit blog instead of using cache data
        return { success: true, post: post }

    } catch (error) {
        console.error("Failed to create post:", error);
        return { success: false, error: "Failed to create post" };
    }
}