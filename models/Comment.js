import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Author is required"],
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: [true, "Post is required"],
		},
		content: {
			type: String,
			required: [true, "Content is required"],
		},
	},
	{
		timestamps: true,
	}
);

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
