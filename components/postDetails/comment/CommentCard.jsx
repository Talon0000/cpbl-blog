import Image from "next/image";
import formatTime from "@/utils/formatTime";

const CommentCard = ({ comment }) => {
	return (
		<div className="px-4 py-2 border border-gray-200 rounded-md">
			<div className="flex justify-between">
				<div className="flex items-center space-x-1 md:space-x-2 ">
					<Image
						src={comment.author.image}
						width={0}
						height={0}
						className="rounded-full w-[36px] md:w-[40px] lg:w-[48px]"
						sizes="100vw"
						alt="authorAvatar"
					/>
					<div className="text-sm md:text-base">{comment.author.username}</div>
				</div>
				<div className="text-sm md:text-base">{formatTime(comment.createdAt)}</div>
			</div>
			<p className="pt-2 text-gray-600 text-sm whitespace-pre-wrap md:text-base md:pt-3 ">
				{comment.content}
			</p>
		</div>
	);
};

export default CommentCard;
