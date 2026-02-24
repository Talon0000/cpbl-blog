import findPosts from "../../../actions/findPosts";
import converToSerializableObject from "@/utils/converToSerializableObject";
import NewsCard from "@/components/postCard/NewsCard";
import countTotalPages from "@/app/actions/countTotalPostsPages";
import Pagination from "@/components/pagination/Pagination";

const NewsPage = async ({ searchParams }) => {
	const { newsPage = 1 } = await searchParams;

	const pageSize = 6;
	const pageGroupSize = 10;

	const skip = Math.max(0, (newsPage - 1) * pageSize);
	const newsDocs = await findPosts("news", "createdAt", pageSize, skip);
	const totalPages = await countTotalPages("news", pageSize);
	const newsPosts = converToSerializableObject(newsDocs);

	return (
		<section
			id="newsPage-section"
			className="max-w-8xl mx-auto px-4 sm:px-10 py-6 lg:px-16 ">
			<h2 className="text-3xl md:text-4xl py-4 border-b-2 mb-6">賽事新聞</h2>
			<div className="flex flex-col space-y-2 xs:px-6 sm:px-0 xl:grid xl:grid-cols-2 xl:space-y-0 xl:gap-2">
				{newsPosts.length > 0 ? (
					newsPosts.map((newsPost) => (
						<NewsCard key={newsPost._id} news={newsPost} />
					))
				) : (
					<p>暫無新聞可顯示</p>
				)}
			</div>
			{newsPosts.length > 0 && (
				<Pagination
					queryKey={"newsPage"}
					pageGroupSize={pageGroupSize}
					totalPages={totalPages}
					toSection="newsPage-section"
				/>
			)}
		</section>
	);
};

export default NewsPage;
