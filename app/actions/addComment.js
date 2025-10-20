"use server";

import connectDB from "@/config/database";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { commentSchema } from "@/lib/validators";

export const addComment = async (prevState, formData, postId) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			throw new Error("User ID is required");
		}

		const { userId } = sessionUser;

		const commentContent = formData.get("comment");

		if (!commentContent) {
			return { error: "內容不可為空" };
		}

		const commentData = {
			author: userId,
			post: postId,
			content: commentContent,
		};
		const parsedData = commentSchema.parse(commentData);
		// await Comment.create(parsedData);
		const newComment = new Comment(parsedData);
		await newComment.save();
		await Post.updateOne({ _id: postId }, { $inc: { commentsCount: 1 } });
		revalidatePath("/", "layout");
		return { success: true };
	} catch (error) {
		console.error("DB save failed", error);
		if (error.name === "ZodError") return { error: "內容不可為空" };
		return { error: "出了點問題，請稍後再試" };
	}
};
