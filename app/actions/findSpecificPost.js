"use server";

import connectDB from "@/config/database";
import Post from "@/models/Post";

export const findSpecificPost = async (postId) => {
	try {
		await connectDB();

		const postsDocs = await Post.findById(postId).populate("author").lean();
		return postsDocs;
	} catch (error) {
		console.error("Failed to find the post:", error);
		throw new Error("查找貼文失敗");
	}
};
