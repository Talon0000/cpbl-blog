"use server";

import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Post from "@/models/Post";
import converToSerializableObject from "@/utils/converToSerializableObject";

export default async function findCountProfilePosts(
	type,
	sortField,
	startDate,
	endDate,
	skip,
	pageSize
) {
	try {
		await connectDB();

		const sort = sortField ? { [sortField]: -1 } : { createdAt: -1 };

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			throw new Error("User ID is required");
		}
		const { userId } = sessionUser;

		const filter = { author: userId };

		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);

			//end只有到當天00:00，要 +1才能抓到當天一整天
			end.setDate(end.getDate() + 1);

			filter.createdAt = { $gte: start, $lte: end };
		}

		if (!type) {
			throw new Error("Type is required");
		}

		filter.type = type;

		const postsDocs = await Post.find(filter)
			.sort(sort)
			.populate("author")
			.skip(skip)
			.limit(pageSize)
			.lean();

		const postsAmounts = await Post.countDocuments(filter);

		return { posts: converToSerializableObject(postsDocs), postsAmounts };
	} catch (error) {
		console.error("Failed to find posts: ", error);
		throw new Error("查找貼文時出了些問題");
	}
}
