"use server";

import connectDB from "@/config/database";
import Post from "@/models/Post";

export default async function findResultPosts(query, sortField, pageSize, skip) {
	try {
		await connectDB();

		const postsDocs = await Post.find(query)
			.sort({ [sortField]: -1 })
			.limit(pageSize)
			.populate("author", "username")
			.skip(skip)
			.lean();
		return postsDocs;
	} catch (error) {
		console.error("Failed to find posts", error);
		throw new Error("顯示文章錯誤");
	}
}
