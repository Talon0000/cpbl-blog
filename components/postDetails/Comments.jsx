import CommentForm from "./comment/CommentForm";
import CommentsList from "./comment/CommentsList";
import FallbackButton from "./comment/FallbackButton";
const Comments = ({ session, postId, commentPage }) => {
	return (
		<section
			className="flex flex-col items-center max-w-5xl mx-auto"
			id="commentPage-section">
			<h3 className="text-3xl md:text-4xl text-center pb-6">留言區</h3>
			{/* comment form */}
			{session ? <CommentForm postId={postId} /> : <FallbackButton />}
			{/* comment list */}
			<CommentsList postId={postId} commentPage={commentPage} />
		</section>
	);
};

export default Comments;
