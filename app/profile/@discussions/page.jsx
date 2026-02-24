import findCountProfilePosts from "@/app/actions/findCountProfilePosts";
//import DiscussionCard from "@/components/postsCard/DiscussionCard";
import ProfileDiscussionCard from "@/components/postCard/ProfileDiscussionCard";
import Pagination from "@/components/pagination/Pagination";

const ProfileDiscussions = async ({ searchParams }) => {
	const { discussionPage = 1, startDate, endDate } = await searchParams;

	const pageSize = 3;
	const pageGroupSize = 10;
	const skip = Math.max(0, (discussionPage - 1) * pageSize);

	const { posts: discussions, postsAmounts } = await findCountProfilePosts(
		"discussion",
		"createdAt",
		startDate,
		endDate,
		skip,
		pageSize
	);

	const totalPages = Math.ceil(postsAmounts / pageSize);

	return (
		<>
			{discussions.length === 0 ? (
				<p className="text-lg text-emerald-700 mt-10 text-center">暫無討論</p>
			) : (
				<>
					<div
						className="flex flex-col mx-0 sm:mx-10 md:mx-0 lg:mx-8 xl:mx-16 2xl:mx-28 space-y-2 px-2 sm:px-4 md:px-0 xl:px-12"
						id="profileDiscussions">
						{discussions.map((discussion) => (
							<ProfileDiscussionCard key={discussion._id} discussion={discussion} />
						))}
					</div>
					<div className="-mt-10 lg:-mt-6">
						<Pagination
							queryKey={"discussionPage"}
							totalPages={totalPages}
							pageGroupSize={pageGroupSize}
							toSection="profileDiscussions"
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ProfileDiscussions;
