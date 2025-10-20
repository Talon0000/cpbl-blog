"use server";
import connectDB from "@/config/database";
import Post from "@/models/Post";

export default async function countTotalPostPages(type, pageSize) {
	try {
		await connectDB();

		const pageAmounts = await Post.countDocuments({ type });
		const totalPages = Math.ceil(pageAmounts / pageSize);
		return totalPages;
	} catch (error) {
		console.error("Error counting total pages:", error);
		throw new Error("計算總頁數失敗");
	}
}
