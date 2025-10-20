"use server";

import connectDB from "@/config/database";
import Post from "@/models/Post";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import converToSerializableObject from "@/utils/converToSerializableObject";
import cloudinary from "@/config/cloudinary";
import { postDbSchema } from "@/lib/validators";

export default async function updatePost(postId, formData) {
	try {
		await connectDB();
		console.log(postId);
		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			throw new Error("User ID is required");
		}

		const { userId } = sessionUser;

		const existingPost = await Post.findById(postId);
		if (!existingPost) {
			throw new Error("找不到該貼文");
		}

		if (existingPost.author.toString() !== userId) {
			throw new Error("Current user doesn't own this post");
		}

		const postData = {
			author: userId,
			type: formData.get("type"),
			teams: formData.getAll("teams"),
			title: formData.get("title"),
			content: formData.get("content"),
		};

		let imageUrls = [];
		const images = formData
			.getAll("images")
			.filter((image) => image.name && image.size > 0);
		if (images && images.length > 0) {
			const publicIds = existingPost.images.map((imageUrl) => {
				const parts = imageUrl.split("/");
				const folder = parts.at(-2);
				const filename = parts.at(-1).split(".").at(0);

				return `${folder}/${filename}`;
			});

			for (let publicId of publicIds) {
				await cloudinary.uploader.destroy(publicId);
			}

			for (let imageFile of images) {
				const imageBuffer = await imageFile.arrayBuffer();
				const imageData = Buffer.from(imageBuffer);
				const imageBase64 = imageData.toString("base64");

				const result = await cloudinary.uploader.upload(
					`data:${imageFile.type};base64,${imageBase64}`,
					{ folder: "cpblblog" }
				);
				imageUrls.push(result.secure_url);
			}

			//平行上傳
			// const uploadPromises = images.map(async (imageFile) => {
			// 	const imageBuffer = await imageFile.arrayBuffer();
			// 	const imageData = Buffer.from(imageBuffer);
			// 	const imageBase64 = imageData.toString("base64");

			// 	const result = await cloudinary.uploader.upload(
			// 		`data:${imageFile.type};base64,${imageBase64}`,
			// 		{ folder: "cpblblog" }
			// 	);
			// 	return result.secure_url;
			// });

			// imageUrls = await Promise.all(uploadPromises);
		}

		const parsedData = postDbSchema.parse({
			...postData,
			images: imageUrls.length > 0 ? imageUrls : undefined,
		});
		//findByIdAndUpdate 不支援直接加 .lean()，因為它是 update 操作，不是普通 find
		const updatedPostDoc = await Post.findByIdAndUpdate(postId, parsedData);
		const updatedPost = converToSerializableObject(updatedPostDoc);

		revalidatePath("/", "layout");

		return updatedPost;
	} catch (error) {
		console.error("Failed updating post: ", error);
		throw error;
	}
}
