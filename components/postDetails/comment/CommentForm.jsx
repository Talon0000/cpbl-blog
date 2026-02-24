"use client";

import TextAutoSize from "react-textarea-autosize";
import { addComment } from "@/app/actions/addComment";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

const CommentForm = ({ postId }) => {
	const [comment, setComment] = useState("");
	const [formState, formAction] = useActionState(actionWithPostId, {
		error: "",
		success: false,
	});

	// 轉換function
	async function actionWithPostId(prevState, formData) {
		return await addComment(prevState, formData, postId);
	}

	function SubmitButton() {
		const { pending } = useFormStatus();
		return (
			<button
				disabled={pending}
				className=" px-4 py-2 bg-green-700 w-fit text-white rounded-md shadow-md hover:bg-green-900 disabled:bg-green-400 disabled:cursor-not-allowed">
				{pending ? "發送中..." : "發送"}
			</button>
		);
	}

	return (
		<form action={formAction} onSubmit={() => setComment("")}>
			<div className="flex justify-center items-center space-x-2 mb-6 py-2">
				<TextAutoSize
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					maxRows={4}
					required
					placeholder="分享你的看法吧！"
					className="rounded-md w-[16rem] xs:w-[18rem] sm:w-[20rem] md:w-[24rem] px-3 py-1 border-2 border-gray-400 resize-none focus:outline-none focus:border-none focus:ring-2 focus:ring-green-700"></TextAutoSize>
				<input type="hidden" name="comment" value={comment} />

				{formState?.error && <p className="text-red-500 mt-1">*{formState.error}</p>}

				<SubmitButton />
			</div>
		</form>
	);
};

export default CommentForm;
