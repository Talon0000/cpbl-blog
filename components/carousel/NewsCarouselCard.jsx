import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/assets/images/defaultImage.png";
import formatted from "@/utils/formatTime";

const NewsCarouselCard = ({ post }) => {
	return (
		<div className="rounded-xl shadow-md max-w-3xl mx-auto flex flex-col hover:scale-105 transition-transform duration-300">
			<Link href={`/posts/${post._id}`}>
				<Image
					src={post.images.length > 0 ? `${post.images[0]}` : defaultImage}
					alt="home-image"
					className="rounded-t-xl w-full lg:h-[500px] object-cover"
					sizes="100vw"
					height={0}
					width={0}
				/>

				<div className="flex flex-col px-6 py-4 pb-6 space-y-2">
					<h1 className="font-semibold text-xl sm:text-2xl  md:tracking-wide lg:text-3xl ">
						{post.title}
					</h1>
					{/* 時間 */}
					<div className="flex items-center justify-between pt-4">
						<p className="text-gray-400 text-md sm:text-lg md:text-xl">
							作者: {post.author.username}
						</p>

						<p className="text-gray-400 text-sm sm:text-md md:text-lg">
							貼文日期: {formatted(post.createdAt)}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default NewsCarouselCard;
