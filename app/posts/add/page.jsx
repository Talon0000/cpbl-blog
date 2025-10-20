import PostAddForm from "@/components/PostAddForm";

export const metadata = {
	title: "新增貼文",
};

const AddPostPage = () => {
	return (
		<section className="bg-green-50 min-h-screen">
			<div className="max-w-2xl mx-auto py-24">
				<div className="bg-white px-6 py-8 mb-4 rounded-md shadow-md border m-4 md:m-0">
					<PostAddForm />
				</div>
			</div>
		</section>
	);
};

export default AddPostPage;
