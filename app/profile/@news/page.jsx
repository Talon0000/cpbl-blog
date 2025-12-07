//import NewsCard from "@/components/postsCard/NewsCard";
import ProfileNewsCard from "@/components/postsCard/ProfileNewsCard";
import Pagination from "@/components/Pagination";
import findCountProfilePosts from "@/app/actions/findCountProfilePosts";

export const metadata = {
	title: "個人檔案",
};

const ProfileNews = async ({ searchParams }) => {
	const { newsPage = 1, startDate, endDate } = await searchParams;

	const pageSize = 4;
	const pageGroupSize = 10;
	const skip = Math.max(0, (newsPage - 1) * pageSize);

	const { posts: news, postsAmounts } = await findCountProfilePosts(
		"news",
		"createdAt",
		startDate,
		endDate,
		skip,
		pageSize
	);

	const totalPages = Math.ceil(postsAmounts / pageSize);

	return (
		<>
			{news.length === 0 ? (
				<p className="text-lg text-emerald-700 mt-10 text-center">暫無新聞</p>
			) : (
				<>
					<div className="flex flex-col space-y-2 sm:px-8 md:px-0" id="profileNews">
						{news.map((n) => (
							<ProfileNewsCard key={n._id} news={n} />
						))}
					</div>
					<div className="-mt-10 mb-10 lg:mt-0">
						<Pagination
							queryKey={"newsPage"}
							totalPages={totalPages}
							pageGroupSize={pageGroupSize}
							toSection="profileNews"
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ProfileNews;
