import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/assets/images/defaultImage.png";
import formatted from "@/utils/formatTime";

const NewsCarouselCard = ({ post }) => {
	return (
		<div className="rounded-xl shadow-md max-w-3xl mx-auto flex flex-col hover:scale-105 transition-transform duration-300">
			<Link href={`/posts/${post._id}`}>
				<div className="w-full aspect-video lg:aspect-none lg:h-[500px] relative overflow-hidden rounded-t-xl">
					<Image
						src={post.images.length > 0 ? post.images[0] : defaultImage}
						alt="home-image"
						className="object-cover"
						fill
						sizes="100vw"
						priority
					/>
				</div>

				<div className="flex flex-col px-6 py-4 pb-4 xs:pb-6 space-y-2">
					<h1 className="font-semibold text-lg sm:text-2xl md:tracking-wide lg:text-3xl ">
						{post.title}
					</h1>
					{/* 時間 */}
					<div className="flex flex-col items-start sm:flex-row sm:items-center justify-between pt-4">
						<p className="text-gray-400 text-sm xs:text-base pb-2 sm:pb-0 sm:text-lg md:text-xl">
							作者: {post.author.username}
						</p>

						<p className="text-gray-400 text-sm sm:text-base md:text-lg">
							日期: {formatted(post.createdAt)}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default NewsCarouselCard;
