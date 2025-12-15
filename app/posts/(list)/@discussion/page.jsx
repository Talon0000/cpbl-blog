import findPosts from "../../../actions/findPosts";
import converToSerializableObject from "@/utils/converToSerializableObject";
import DiscussionCard from "@/components/postCard/DiscussionCard";
import Pagination from "@/components/pagination/Pagination";
import countTotalPages from "@/app/actions/countTotalPostsPages";

const DiscussionPage = async ({ searchParams }) => {
	const { discussionPage = 1 } = await searchParams;
	const pageSize = 5;
	const pageGroupSize = 10;

	const skip = Math.max(0, (discussionPage - 1) * pageSize);
	const totalPages = await countTotalPages("discussion", pageSize);
	const discussionDocs = await findPosts("discussion", "createdAt", pageSize, skip);
	const discussionPosts = converToSerializableObject(discussionDocs);

	return (
		<section id="discussionPage-section" className="max-w-3xl mx-auto px-10 py-6">
			<h2 className="text-3xl md:text-4xl text-center py-4 border-b-2 mb-6">
				討論區
			</h2>
			<div className="flex flex-col space-y-4 px-4 sm:px-10 lg:px-0">
				{discussionPosts.length > 0 ? (
					discussionPosts.map((discussionPost) => (
						<DiscussionCard key={discussionPost._id} discussion={discussionPost} />
					))
				) : (
					<p>暫無討論可顯示</p>
				)}
			</div>
			{discussionPosts.length > 0 && (
				<Pagination
					queryKey={"discussionPage"}
					totalPages={totalPages}
					pageGroupSize={pageGroupSize}
					toSection="discussionPage-section"
				/>
			)}
		</section>
	);
};

export default DiscussionPage;
