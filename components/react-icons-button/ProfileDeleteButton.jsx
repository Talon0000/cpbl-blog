"use client";

import { MdDelete } from "react-icons/md";
import deletePost from "@/app/actions/deletePost";
import findCountProfilePosts from "@/app/actions/findCountProfilePosts";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ProfileDeleteButton({ post }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const startDate = searchParams.get("startDate") || undefined;
	const endDate = searchParams.get("endDate") || undefined;
	const newsPage = Number(searchParams.get("newsPage") || 1);
	const discussionPage = Number(searchParams.get("discussionPage") || 1);
	const params = new URLSearchParams(searchParams.toString());
	const newsPageSize = 4;
	const discussionPageSize = 4;

	async function handleDeletePost() {
		if (isDeleting) return;

		const confirmed = window.confirm(`確定要刪除「${post.title}」嗎？`);

		if (!confirmed) return;

		setIsDeleting(true);
		try {
			await deletePost(post._id);

			const { postsAmounts } = await findCountProfilePosts(
				post.type,
				"createdAt",
				startDate,
				endDate
			);

			if (post.type === "news") {
				const totalPages = Math.ceil(postsAmounts / newsPageSize);
				if (totalPages < newsPage) {
					params.set("newsPage", totalPages);
					router.replace(`?${params.toString()}#profileNews`);
				}
			} else {
				const totalPages = Math.ceil(postsAmounts / discussionPageSize);
				if (totalPages < discussionPage) {
					params.set("discussionPage", totalPages);
					router.replace(`?${params.toString()}#profileDiscussions`);
				}
			}

			toast.success(`${post.type === "news" ? "新聞" : "討論"}刪除成功！`);
		} catch (error) {
			console.error("刪除文章失敗: ", error);
			toast.error(`${post.type === "news" ? "新聞" : "討論"}刪除失敗，請稍後再試！`);
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<button
			className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white text-xs xs:text-sm md:text-xs lg:text-sm px-2 py-1 rounded-lg disabled:bg-red-400 disabled:cursor-not-allowed"
			type="button"
			disabled={isDeleting}
			onClick={handleDeletePost}>
			<MdDelete />
			<span>{isDeleting ? "刪除中..." : "刪除"}</span>
		</button>
	);
}
