import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Author is required"],
		},
		type: {
			type: String,
			enum: ["news", "discussion"],
			required: [true, "Post type is required"],
		},
		teams: {
			type: [String],
			enum: [
				"統一7-ELEVEn獅",
				"中信兄弟",
				"樂天桃猿",
				"富邦悍將",
				"味全龍",
				"台鋼雄鷹",
			],
			required: [true, "Teams are required"],
		},
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		images: [
			{
				type: String,
			},
		],
		content: {
			type: String,
			required: [true, "Content is required"],
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		likesCount: {
			type: Number,
			default: 0,
		},
		commentsCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
