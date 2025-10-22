"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema } from "@/lib/validators";
import addPost from "@/app/actions/addPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

const PostAddForm = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(postFormSchema),
		defaultValues: { teams: [] },
	});

	const watchedTeams = watch("teams");

	function handleSelectAll(e) {
		if (e.target.checked) {
			setValue("teams", allTeams);
		} else {
			setValue("teams", []);
		}
	}

	//File類型沒辦法透過data傳給server action要透過FormData
	const onSubmit = async (data, e) => {
		setIsSubmitting(true);
		try {
			const formElement = e.target;
			const formData = new FormData(formElement);

			const savedPost = await addPost(formData);

			router.push(`/posts/${savedPost._id}`);

			await new Promise((resolve) => setTimeout(resolve, 5000));
			toast.success(`${savedPost.type === "news" ? "新聞" : "討論"}新增成功！`);
		} catch (error) {
			console.error("新增文章失敗: ", error);
			toast.error(
				`${savedPost.type === "news" ? "新聞" : "討論"}新增失敗，請稍後再試！`
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const allTeams = [
		"統一7-ELEVEn獅",
		"中信兄弟",
		"樂天桃猿",
		"富邦悍將",
		"味全龍",
		"台鋼雄鷹",
	];

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-3xl font-semibold text-gray-700 tracking-wider text-center mb-6">
				新增貼文
			</h2>
			<div className="mb-4">
				<label
					htmlFor="type"
					className="block text-gray-700 text-lg tracking-wider font-semibold mb-2">
					貼文類型
				</label>
				<select
					name="type"
					id="type"
					className="border rounded w-full px-3 py-2 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
					{...register("type")}
					required>
					<option value="discussion">討論</option>
					<option value="news">新聞</option>
				</select>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-lg tracking-wider font-semibold mb-2">
					相關球隊
				</label>
				<label className="flex items-center space-x-2">
					<input
						type="checkbox"
						checked={watchedTeams.length === allTeams.length}
						onChange={(e) => handleSelectAll(e)}
						className="accent-green-700"
					/>
					<span>全部</span>
				</label>
				{allTeams.map((team) => (
					<label key={team} className="flex items-center space-x-2">
						<input
							type="checkbox"
							value={team}
							name="teams"
							{...register("teams")}
							className="accent-green-700"
						/>
						<span>{team}</span>
					</label>
				))}
				{errors.teams && (
					<p className="text-red-500 text-sm">*{errors.teams.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label
					htmlFor="title"
					className="block text-gray-700 text-lg tracking-wider font-semibold mb-2">
					貼文標題
				</label>
				<textarea
					name="title"
					id="title"
					className="w-full h-[42px] border rounded px-3 py-2 resize-none focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
					{...register("title")}
					required
				/>
				{errors.title && (
					<p className="text-red-500 text-sm">*{errors.title.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label
					htmlFor="content"
					className="block text-gray-700 text-lg tracking-wider font-semibold mb-2">
					貼文內容
				</label>
				<textarea
					name="content"
					id="content"
					className="w-full h-[200px] border rounded px-3 py-2 resize-none focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
					{...register("content")}
					required
				/>
				{errors.content && (
					<p className="text-red-500 text-sm">*{errors.content.message}</p>
				)}
			</div>

			<div className="mb-6">
				<label
					htmlFor="images"
					className="block text-gray-700 text-lg tracking-wider font-semibold mb-2">
					上傳圖片(非必選)
				</label>
				<input
					type="file"
					id="images"
					name="images"
					accept="image/*"
					className="border rounded w-full px-3 py-2"
					{...register("images")}
					multiple
				/>
				{errors.images && (
					<p className="text-red-500 text-sm">*{errors.images.message}</p>
				)}
			</div>

			<div>
				<button
					className="bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded-full w-full focus:outline-none disabled:bg-green-400 disabled:cursor-not-allowed"
					type="submit"
					disabled={isSubmitting}>
					{isSubmitting ? "新增貼文中..." : "新增貼文"}
				</button>
			</div>
		</form>
	);
};

export default PostAddForm;
