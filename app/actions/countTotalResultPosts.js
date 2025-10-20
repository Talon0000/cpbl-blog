"use server";

import connectDB from "@/config/database";
import Post from "@/models/Post";

const countTotalResultPosts = async (query, pageSize) => {
	try {
		await connectDB();

		const pageAmounts = await Post.countDocuments(query);
		const totalPages = Math.ceil(pageAmounts / pageSize);
		//console.log(pageAmounts);
		return totalPages;
	} catch (error) {
		console.error("Error counting total pages:", error);
		throw new Error("計算總頁數失敗");
	}
};

export default countTotalResultPosts;
