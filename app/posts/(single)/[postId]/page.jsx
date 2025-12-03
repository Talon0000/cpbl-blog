import { findSpecificPost } from "@/app/actions/findSpecificPost";
import converToSerializableObject from "@/utils/converToSerializableObject";
import { getSessionUser } from "@/utils/getSessionUser";
import Comments from "@/components/Comments";
import MainContent from "@/components/MainContent";
import { notFound } from "next/navigation";

const PostPage = async ({ params, searchParams }) => {
	const { postId } = await params;
	const { commentPage = 1 } = await searchParams;

	const postDocs = await findSpecificPost(postId);
	const post = converToSerializableObject(postDocs);

	const session = await getSessionUser();

	if (!postDocs) {
		notFound();
	}

	return (
		<>
			<MainContent post={post} />
			<Comments session={session} postId={postId} commentPage={commentPage} />
		</>
	);
};

export default PostPage;
