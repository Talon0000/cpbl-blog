"use server";

import connectDB from "@/config/database";
import Post from "@/models/Post";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";
import { postDbSchema } from "@/lib/validators";
import converToSerializableObject from "@/utils/converToSerializableObject";

export default async function addPost(formData) {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = sessionUser;

	const images = formData
		.getAll("images")
		.filter((image) => image.name && image.size > 0);

	const postData = {
		author: userId,
		type: formData.get("type"),
		teams: formData.getAll("teams"),
		title: formData.get("title"),
		content: formData.get("content"),
	};

	const imageUrls = [];

	if (images.length > 0) {
		for (const imageFile of images) {
			const imageBuffer = await imageFile.arrayBuffer();
			const imageData = Buffer.from(imageBuffer);

			const imageBase64 = imageData.toString("base64");

			const result = await cloudinary.uploader.upload(
				`data:image/png;base64,${imageBase64}`,
				{ folder: "cpblblog" }
			);

			imageUrls.push(result.secure_url);
		}
	}

	try {
		const parsedData = postDbSchema.parse({
			...postData,
			images: imageUrls.length > 0 ? imageUrls : undefined,
		});
		//console.log(parsedData);
		const newPost = new Post(parsedData);
		//console.log("Saved post:", newPost);
		const savedPostDoc = await newPost.save();

		revalidatePath("/", "layout");

		const savedPost = converToSerializableObject(savedPostDoc);

		return savedPost;
	} catch (error) {
		if (error.name === "ZodError") {
			throw new Error("表單資料格式錯誤");
		}
		console.error("DB save failed:", error);
		throw new Error("資料有誤或儲存失敗，請稍後再試");
	}

	//redirect("/posts");
}
