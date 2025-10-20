import findCountProfilePosts from "@/app/actions/findCountProfilePosts";
//import DiscussionCard from "@/components/postsCard/DiscussionCard";
import ProfileDiscussionCard from "@/components/postsCard/ProfileDiscussionCard";
import Pagination from "@/components/Pagination";

const ProfileDiscussions = async ({ searchParams }) => {
	const { discussionPage = 1, startDate, endDate } = await searchParams;

	const pageSize = 4;
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
						className="flex flex-col space-y-2 px-2 sm:px-4 md:px-0 xl:px-12"
						id="profileDiscussions">
						{discussions.map((discussion) => (
							<ProfileDiscussionCard key={discussion._id} discussion={discussion} />
						))}
					</div>
					<Pagination
						queryKey={"discussionPage"}
						totalPages={totalPages}
						pageGroupSize={pageGroupSize}
						toSection="profileDiscussions"
					/>
				</>
			)}
		</>
	);
};

export default ProfileDiscussions;
