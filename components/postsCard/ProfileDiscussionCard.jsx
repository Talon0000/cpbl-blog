import Link from "next/link";
import formatted from "@/utils/formatTime";
import { getSessionUser } from "@/utils/getSessionUser";
import LikeButton from "../react-icons-button/LikeButton";
import CommentButton from "../react-icons-button/CommentButton";
import countComments from "@/app/actions/countComments";
import ProfileDeleteButton from "../ProfileDeleteButton";
import { FaEdit } from "react-icons/fa";

const ProfileDiscussionCard = async ({ discussion }) => {
	const sessionUser = await getSessionUser();
	const isLiked = discussion.likes.includes(sessionUser?.userId);

	const commentsCount = await countComments(discussion._id);

	return (
		<>
			<Link
				href={`/posts/${discussion._id}`}
				className="rounded-lg shadow-lg w-full text-white bg-slate-700 p-4 hover:scale-105 transition-transform duration-200">
				<h1 className="text-xl mb-2 sm:text-xl xl:text-2xl tracking-wide font-semibold">
					<span className="text-orange-300">[討論]</span> {discussion.title}
				</h1>
				{discussion.commentsCount >= 5 && (
					<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
						熱門
					</span>
				)}

				<div className="flex justify-between items-end -mt-2">
					<div>
						<p className="mt-4 text-base md:text-sm lg:text-base text-gray-300">
							{discussion.author.username}
						</p>
						<p className="text-gray-300 text-sm lg:text-base xl:text-lg">
							{formatted(discussion.createdAt)}
						</p>
					</div>
					<div className="flex space-x-4 text-lg">
						<LikeButton
							isLikedInitial={isLiked}
							likesCount={discussion.likesCount}
							postId={discussion._id}
							textSize="text-base sm:text-lg md:text-base lg:text-lg"
						/>
						<CommentButton
							id={discussion._id}
							commentsCount={commentsCount}
							textSize="text-base sm:text-lg md:text-base lg:text-lg"
						/>
					</div>
				</div>
			</Link>
			<div className="flex justify-end space-x-1">
				<Link
					href={`/posts/${discussion._id}/edit`}
					className="flex items-center space-x-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm md:text-xs lg:text-sm px-2 py-1 rounded-lg">
					<FaEdit />
					<span>編輯</span>
				</Link>
				<ProfileDeleteButton post={discussion} />
			</div>
		</>
	);
};

export default ProfileDiscussionCard;
