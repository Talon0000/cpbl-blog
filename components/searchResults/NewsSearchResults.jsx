import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import NewsCard from "../postsCard/NewsCard";
import Pagination from "../Pagination";
import findResultPosts from "@/app/actions/findResultPosts";
import countTotalResultPosts from "@/app/actions/countTotalResultPosts";
import converToSerializableObject from "@/utils/converToSerializableObject";

const NewsSearchResults = async ({ query, newsPage }) => {
	const pageSize = 3;
	const pageGroupSize = 10;
	const skip = Math.max(0, (newsPage - 1) * pageSize);
	const totalPages = await countTotalResultPosts(query, pageSize);

	const newsDocs = await findResultPosts(query, "createdAt", pageSize, skip);
	const news = converToSerializableObject(newsDocs);

	return (
		<section className="px-6 py-4">
			<div className="container-xl md:container m-auto px-4 py-6">
				<Link
					href="/posts"
					className="flex items-center w-fit text-green-700 lg:text-lg hover:underline mb-4">
					<FaArrowAltCircleLeft className="mr-2 " />
					返回貼文總覽
				</Link>

				<h1 className="text-3xl lg:text-4xl text-center tracking-wide mb-4">
					搜尋結果
				</h1>

				{news.length === 0 ? (
					<p className="text-center lg:text-lg mt-6">查無搜尋結果</p>
				) : (
					<div className="max-w-7xl mx-auto py-6">
						<div className="flex flex-col space-y-4">
							{news.map((n) => (
								<NewsCard key={n._id} news={n} />
							))}
						</div>
						<Pagination
							queryKey={"newsPage"}
							totalPages={totalPages}
							pageGroupSize={pageGroupSize}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default NewsSearchResults;
