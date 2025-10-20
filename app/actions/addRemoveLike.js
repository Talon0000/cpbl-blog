"use server";

import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

export async function addLike(postId) {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			throw new Error("User ID is required");
		}

		const { userId } = sessionUser;

		const post = await Post.findById(postId);
		if (!post) throw new Error("找不到貼文");

		if (post.likes.some((id) => id.toString() === userId)) {
			throw new Error("Could not like twice");
		}

		post.likes.push(userId);
		post.likesCount = post.likes.length;
		await post.save();

		revalidatePath("/", "layout");
	} catch (error) {
		console.error("add like failed: ", error);
		throw new Error("處理時發生錯誤");
	}
}

export async function removeLike(postId) {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			throw new Error("User ID is required");
		}

		const { userId } = sessionUser;

		const post = await Post.findById(postId);
		if (!post) throw new Error("找不到貼文");

		if (!post.likes.some((id) => id.toString() === userId)) {
			throw new Error("Could not remove like you didn't add");
		}

		post.likes = post.likes.filter((like) => like.toString() !== userId);
		post.likesCount = post.likes.length;
		await post.save();

		revalidatePath("/", "layout");
	} catch (error) {
		console.error("add like failed: ", error);
		throw new Error("處理時發生錯誤");
	}
}
