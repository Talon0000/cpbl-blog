import Image from "next/image";
import Link from "next/link";
import formatted from "@/utils/formatTime";
import defaultImage from "@/assets/images/defaultImage.png";
import ProfileDeleteButton from "../react-icons-button/ProfileDeleteButton";
import { FaEdit } from "react-icons/fa";

const ProfileNewsCard = ({ news }) => {
	return (
		<div className="flex flex-col px-4 py-4 xl:py-6 shadow-md space-y-3 xl:space-y-0 xl:space-x-4 xl:flex-row">
			<div className="flex flex-col items-center xl:flex-row ">
				<Link
					href={`/posts/${news._id}`}
					className="w-[100%] sm:w-[450px] md:w-[300px] lg:w-[450px] xl:w-[350px] aspect-[16/9] relative overflow-hidden transition-all duration-200">
					<Image
						src={news.images[0] || defaultImage}
						alt="News-Image"
						className="object-cover hover:scale-105 hover:opacity-60 transition-transform duration-300"
						fill
						priority
					/>
				</Link>
			</div>

			<div className="flex flex-col items-start space-y-1 xl:justify-between w-full">
				<Link href={`/posts/${news._id}`}>
					<h3 className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-xl tracking-wide hover:text-gray-500">
						{news.title}
					</h3>
				</Link>
				<div className="flex justify-between w-full ">
					<div className="flex flex-col items-start space-y-1">
						<span className="pt-4 lg:text-lg xl:text-base">
							{news.author.username}
						</span>
						<span className="text-green-800 font-semibold text-sm xs:text-base md:text-sm lg:text-base xl:text-sm">
							{formatted(news.createdAt)}
						</span>
					</div>
					<div className="flex items-end space-x-1">
						<Link
							href={`/posts/${news._id}/edit`}
							className="flex items-center space-x-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs xs:text-sm md:text-xs lg:text-sm px-2 py-1 rounded-lg">
							<FaEdit />
							<span>編輯</span>
						</Link>
						<ProfileDeleteButton post={news} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileNewsCard;
