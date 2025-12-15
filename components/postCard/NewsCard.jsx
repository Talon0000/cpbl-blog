import Image from "next/image";
import Link from "next/link";
import formatted from "@/utils/formatTime";
import defaultImage from "@/assets/images/defaultImage.png";

const NewsCard = ({ news }) => {
	return (
		<div className="flex flex-col px-4 py-6 shadow-md space-y-3 sm:space-y-0 sm:space-x-4 sm:flex-row">
			<div className="flex flex-col items-center sm:flex-row">
				<Link
					href={`/posts/${news._id}`}
					className="w-[400px] sm:w-[300px] md:w-[350px] lg:w-[400px] aspect-[16/9] relative overflow-hidden transition-all duration-200">
					<Image
						src={news.images[0] || defaultImage}
						alt="News-Image"
						className="object-cover hover:scale-105 hover:opacity-60 transition-transform duration-300"
						fill
					/>
				</Link>
			</div>

			<div className="flex flex-col items-start space-y-1 ">
				<Link href={`/posts/${news._id}`}>
					<h3 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl tracking-wide hover:text-gray-500">
						{news.title}
					</h3>
				</Link>
				<span className="pt-4 md:text-lg">{news.author.username}</span>
				<span className="text-green-800 font-semibold sm:text-sm md:text-md lg:text-lg">
					{formatted(news.createdAt)}
				</span>
			</div>
		</div>
	);
};

export default NewsCard;
