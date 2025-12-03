import findPosts from "@/app/actions/findPosts";
import converToSerializableObject from "@/utils/converToSerializableObject";
import DiscussionCard from "./postsCard/DiscussionCard";
import Link from "next/link";

const HotDiscussionPosts = async () => {
	const discussionsDocs = await findPosts("discussion", "commentsCount", 3);
	const discussions = converToSerializableObject(discussionsDocs);

	return (
		<section className="bg-emerald-50 py-6">
			<div className="max-w-3xl mx-auto ">
				<h1 className="text-3xl tracking-wide text-gray-800 mb-4 md:text-4xl text-center font-semibold">
					熱門討論
				</h1>
				<div className="flex flex-col items-center mx-4 space-y-4 py-10">
					{discussions.map((discussion) => (
						<DiscussionCard key={discussion._id} discussion={discussion} />
					))}
				</div>
				<div className="w-fit mx-auto mt-4 px-10 py-2 bg-gray-700 text-xl hover:bg-gray-500 hover:scale-105 hover:cursor-pointer transition-transform duration-300 text-white rounded-lg shadow-md">
					<Link href="/posts">查看所有評論&新聞</Link>
				</div>
			</div>
		</section>
	);
};

export default HotDiscussionPosts;
