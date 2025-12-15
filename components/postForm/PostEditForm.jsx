"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema } from "@/lib/validators";
import updatePost from "@/app/actions/updatePost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PostEditForm = ({ post }) => {
	const router = useRouter();

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(postFormSchema),
		defaultValues: {
			type: post.type,
			teams: post.teams,
			title: post.title,
			content: post.content,
		},
	});

	const watchedTeams = watch("teams");
	// console.log(watchedTeams);
	function handleSelectAll(e) {
		if (e.target.checked) {
			setValue("teams", allTeams);
		} else {
			setValue("teams", []);
		}
	}

	//File類型沒辦法透過data傳給server action要透過FormData
	const onSubmit = async (data, e) => {
		const formElement = e.target;
		const formData = new FormData(formElement);

		//const updatePostById = updatePost.bind(null, post._id, formData);

		try {
			//未加 {new:true} 回傳更新前的document
			const updatedPost = await updatePost(post._id, formData);

			router.push(`/posts/${updatedPost._id}`);
			toast.success(`${post.type === "news" ? "新聞" : "討論"}編輯成功！`);
		} catch (error) {
			console.error("更新文章失敗：", error);
			toast.error(`${post.type === "news" ? "新聞" : "討論"}編輯失敗，請稍後再試！`);
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
				編輯貼文
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
					required
					//defaultValue={post.type}
				>
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
							//defaultChecked={post.teams.includes(team)}
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
					//defaultValue={post.title}
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
					//defaultValue={post.content}
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
					{isSubmitting ? "更新貼文中..." : "編輯貼文"}
				</button>
			</div>
		</form>
	);
};

export default PostEditForm;
