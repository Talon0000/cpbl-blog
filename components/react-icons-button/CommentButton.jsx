"use client";

import { FaRegComment, FaComment } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentButton = ({ id, commentsCount, textSize = "text-sm sm:text-lg" }) => {
	const [isHovered, setIsHovered] = useState(false);

	const router = useRouter();
	const handleComment = (e) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/posts/${id}#commentPage-section`);
	};

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleComment}
			className={`flex justify-center items-center ${textSize}`}>
			{!isHovered && <FaRegComment className="mr-1 " />}
			{isHovered && <FaComment className="mr-1 text-green-500" />}
			{commentsCount}
		</div>
	);
};

export default CommentButton;
