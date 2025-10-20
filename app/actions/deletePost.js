"use server";

import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import cloudinary from "@/config/cloudinary";
import { revalidatePath } from "next/cache";

export default async function deletePost(postId) {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			throw new Error("User ID is required");
		}

		const { userId } = sessionUser;

		const post = await Post.findById(postId);
		if (!post) {
			throw new Error("找不到該貼文");
		}

		if (post.author.toString() !== userId) {
			throw new Error("未授權");
		}

		if (post.images.length > 0) {
			const publicIds = post.images.map((imageUrl) => {
				const parts = imageUrl.split("/");
				const folder = parts.at(-2);
				const filename = parts.at(-1).split(".").at(0);

				return `${folder}/${filename}`;
			});

			for (let publicId of publicIds) {
				await cloudinary.uploader.destroy(publicId);
			}
		}

		await post.deleteOne();
		await Comment.deleteMany({ post: postId });

		revalidatePath("/", "layout");
	} catch (error) {
		console.error("Error deleting post: ", error);

		throw new Error("刪除貼文時發生錯誤");
	}
}
