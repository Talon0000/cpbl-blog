"use server";

import connectDB from "@/config/database";
import Comment from "@/models/Comment";

export default async function findComments(postId, pageSize, skip) {
	try {
		await connectDB();
		const comments = await Comment.find({ post: postId })
			.sort({ createdAt: -1 })
			.limit(pageSize)
			.populate("author")
			.skip(skip)
			.lean();
		return comments;
	} catch (error) {
		console.error("Failed to find comments", error);
		throw new Error("顯示留言錯誤");
	}
}
