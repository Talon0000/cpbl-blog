import PostEditForm from "@/components/postForm/PostEditForm";
import { findSpecificPost } from "@/app/actions/findSpecificPost";
import converToSerializableObject from "@/utils/converToSerializableObject";

export const metadata = {
	title: "編輯貼文",
};

const EditPostPage = async ({ params }) => {
	const { postId } = await params;
	const postDoc = await findSpecificPost(postId);
	const post = converToSerializableObject(postDoc);

	return (
		<section className="bg-green-50 min-h-screen">
			<div className="max-w-2xl mx-auto py-24">
				<div className="bg-white px-6 py-8 mb-4 rounded-md shadow-md border m-4 md:m-0">
					<PostEditForm post={post} />
				</div>
			</div>
		</section>
	);
};

export default EditPostPage;
