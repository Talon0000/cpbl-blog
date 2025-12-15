import Link from "next/link";
import formatted from "@/utils/formatTime";
import { getSessionUser } from "@/utils/getSessionUser";
import LikeButton from "../react-icons-button/LikeButton";
import CommentButton from "../react-icons-button/CommentButton";
import countComments from "@/app/actions/countComments";

const DiscussionCard = async ({ discussion }) => {
	const sessionUser = await getSessionUser();
	const isLiked = discussion.likes.includes(sessionUser?.userId);

	const commentsCount = await countComments(discussion._id);

	return (
		<Link
			href={`/posts/${discussion._id}`}
			className="rounded-lg shadow-lg w-full text-white bg-slate-700 p-4 hover:scale-105 transition-transform duration-200">
			<h1 className="mb-2 text-lg md:text-2xl tracking-wide font-semibold">
				<span className="text-orange-300">[討論]</span> {discussion.title}
			</h1>
			{discussion.commentsCount >= 3 && (
				<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
					熱門
				</span>
			)}

			<div className="flex justify-between items-end -mt-2">
				<div>
					<p className="mt-4 text-sm md:text-base text-gray-300">
						{discussion.author.username}
					</p>
					<p className="text-gray-300 text-sm sm:text-base lg:text-lg">
						{formatted(discussion.createdAt)}
					</p>
				</div>
				<div className="flex space-x-4 ">
					<LikeButton
						isLikedInitial={isLiked}
						likesCount={discussion.likesCount}
						postId={discussion._id}
						textSize="text-sm sm:text-base md:text-lg"
					/>
					<CommentButton
						id={discussion._id}
						commentsCount={commentsCount}
						textSize="text-sm sm:text-base md:text-lg"
					/>
				</div>
			</div>
		</Link>
	);
};

export default DiscussionCard;
