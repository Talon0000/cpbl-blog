"use server";

import connectDB from "@/config/database";
import Post from "@/models/Post";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";

export default async function findUserPosts(type, sortField, skip, pageSize) {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			throw new Error("User ID is required");
		}

		const { userId } = sessionUser;

		const post = await Post.find({
			author: new mongoose.Types.ObjectId(userId),
			type,
		})
			.sort({ [sortField]: -1 })
			.skip(skip)
			.limit(pageSize)
			.populate("author")
			.lean();
		if (!post) {
			throw new Error("找不到貼文");
		}
		return post;
	} catch (error) {
		console.error("Failed to find posts: ", error);
		throw new Error("查找貼文失敗");
	}
}
