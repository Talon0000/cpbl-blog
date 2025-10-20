"use server";

import connectDB from "@/config/database";
import Post from "@/models/Post";

export default async function findHotPosts(type) {
	try {
		await connectDB();

		const discussionDocs = await Post.aggregate([
			{ $match: { type } },
			{
				$lookup: {
					from: "comments",
					localField: "_id",
					foreignField: "post",
					as: "comments",
				},
			},
			{
				$addFields: {
					commentsCount: { $size: "$comments" },
				},
			},
			{ $sort: { commentsCount: -1 } },
			{ $limit: 3 },
			{ $project: { comments: 0 } },
		]);

		return discussionDocs;
	} catch (error) {
		console.error("Failed to find posts: ", error);
		throw new Error("查找貼文時出了些問題");
	}
}
