import findComments from "@/app/actions/findComments";
import converToSerializableObject from "@/utils/converToSerializableObject";
import countTotalCommentsPages from "@/app/actions/countTotalCommentsPages";
import CommentCard from "./CommentCard";
import Pagination from "../../pagination/Pagination";

const CommentsList = async ({ postId, commentPage }) => {
	const pageSize = 10;
	const skip = Math.max(0, (commentPage - 1) * pageSize);
	const totalPages = await countTotalCommentsPages(postId, pageSize);

	const commentsDocs = await findComments(postId, pageSize, skip);
	const comments = converToSerializableObject(commentsDocs);

	return (
		<div className="flex flex-col w-3/4 md:w-2/3 space-y-4 mt-6 mb-16 ">
			{/* Comment Card */}
			{comments.length > 0 ? (
				comments.map((comment) => (
					<CommentCard key={comment._id} comment={comment} />
				))
			) : (
				<p className="text-xl text-center text-green-700">尚未有留言</p>
			)}
			{comments.length > 0 && (
				<Pagination
					queryKey={"commentPage"}
					totalPages={totalPages}
					pageGroupSize={10}
					toSection="commentPage-section"
				/>
			)}
		</div>
	);
};

export default CommentsList;
