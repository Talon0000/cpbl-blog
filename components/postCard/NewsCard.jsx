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
					className="w-[100%] sm:w-[275px] md:w-[325px] lg:w-[400px] xl:w-[300px] 3xl:w-[350px] aspect-[16/9] relative overflow-hidden transition-all duration-200">
					<Image
						src={news.images[0] || defaultImage}
						alt="News-Image"
						className="object-cover hover:scale-105 hover:opacity-60 transition-transform duration-300"
						fill
						priority
					/>
				</Link>
			</div>

			<div className="flex flex-col items-start space-y-1 ">
				<Link href={`/posts/${news._id}`}>
					<h3 className="text-xl sm:text-xl sm:leading-normal md:text-2xl md:leading-relaxed md:tracking-wider xl:text-xl xl:leading-relaxed 3xl:text-2xl 3xl:leading-relaxed tracking-wide hover:text-gray-500">
						{news.title}
					</h3>
				</Link>
				<span className="pt-4 md:text-lg xl:text-base 3xl:text-lg">
					{news.author.username}
				</span>
				<span className="text-green-800 font-semibold sm:text-sm md:text-base lg:text-lg xl:text-base 3xl:text-lg">
					{formatted(news.createdAt)}
				</span>
			</div>
		</div>
	);
};

export default NewsCard;
