import NewsCarousel from "./carousel/NewsCarousel";
import converToSerializableObject from "@/utils/converToSerializableObject";
import HotDiscussionPosts from "./HotDiscussionPosts";
import findPosts from "@/app/actions/findPosts";

const HomePosts = async () => {
	const postsDocs = await findPosts("news", "createdAt", 3);
	const latestNewsPosts = converToSerializableObject(postsDocs);

	return (
		<>
			<NewsCarousel posts={latestNewsPosts} />
			<HotDiscussionPosts />
		</>
	);
};

export default HomePosts;
