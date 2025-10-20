"use server";
import connectDB from "@/config/database";
import Comment from "@/models/Comment";

export default async function countTotalCommentsPages(postId, pageSize) {
	try {
		await connectDB();

		const pageAmounts = await Comment.countDocuments({ post: postId });
		const totalPages = Math.ceil(pageAmounts / pageSize);
		return totalPages;
	} catch (error) {
		console.error("Error counting total pages:", error);
		throw new Error("計算總頁數失敗");
	}
}
