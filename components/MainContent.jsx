import formatTime from "@/utils/formatTime";
import Image from "next/image";
import defaultImage from "@/assets/images/defaultImage.png";
import Link from "next/link";
import LikeButton from "./react-icons-button/LikeButton";
import { getSessionUser } from "@/utils/getSessionUser";

const MainContent = async ({ post }) => {
	const sessionUser = await getSessionUser();
	const isLiked = post.likes.includes(sessionUser?.userId);

	return (
		<section className="max-w-7xl mx-auto px-4 md:px-10 py-6 mb-10">
			<h1 className="text-4xl  text-center sm:text-left boder py-4 border-b-2 mb-10">
				{post.type === "news" ? (
					<Link href="/posts#newsPage-section">賽事新聞</Link>
				) : (
					<Link href="/posts#discussionPage-section">討論區</Link>
				)}
			</h1>
			<h2 className="text-2xl md:text-3xl text-green-800 text-center sm:text-left pb-4 tracking-wide border-b border-b-gray-300">
				{post.title}
			</h2>
			<div className="flex flex-col items-center sm:items-start mb-4">
				<div className="pt-4 flex flex-col items-center space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
					<Image
						src={post.author.image}
						width={50}
						height={50}
						className="rounded-full"
						sizes="100vw"
						alt="authorAvatar"
					/>
					<div className="text-xl">{post.author.username}</div>
				</div>
				<div className="pt-3 pb-2 text-gray-400 font-semibold">
					{formatTime(post.createdAt)}
				</div>
			</div>
			{post.type === "news" && (
				<Image
					src={post.images[0] || defaultImage}
					width={0}
					height={0}
					sizes="100vw"
					alt="postImage"
					className="w-full"
				/>
			)}
			{/* {post.type === "discussion" && post.images.length > 0 ? (
				<Image
					src={post.images[0] || defaultImage}
					width={0}
					height={0}
					sizes="100vw"
					alt="postImage"
					className="w-full"
				/>
			) : null} */}

			{post.type === "discussion" && post.images.length > 1 ? (
				<div className=" grid grid-cols-1 sm:grid-cols-2 gap-2 my-6">
					{post.images.map((image, idx) => (
						<Image
							key={idx}
							src={image || defaultImage}
							width={0}
							height={0}
							sizes="100vw"
							alt={`postImage-${idx}`}
							className="object-cover rounded-md w-full aspect-[16/9]"
						/>
					))}
				</div>
			) : post.type === "discussion" && post.images.length === 1 ? (
				<Image
					src={post.images[0] || defaultImage}
					width={0}
					height={0}
					sizes="100vw"
					alt="postImage"
					className="w-full"
				/>
			) : null}

			<p className="text-gray-600 tracking-tight lg:tracking-normal leading-[2rem] whitespace-pre-wrap my-12">
				{post.content}
			</p>

			<LikeButton
				isLikedInitial={isLiked}
				likesCount={post.likesCount}
				textSize="text-lg sm:text-xl"
				postId={post._id}
			/>
		</section>
	);
};

export default MainContent;
