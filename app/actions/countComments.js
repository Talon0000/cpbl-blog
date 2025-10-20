"use server";

import connectDB from "@/config/database";
import Comment from "@/models/Comment";

export default async function countComments(postId) {
	try {
		await connectDB();

		const commentAmounts = await Comment.countDocuments({ post: postId });
		return commentAmounts;
	} catch (error) {
		console.error("Failed to count comments: ", error);
		throw new Error("計算留言失敗");
	}
}
