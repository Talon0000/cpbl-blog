"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PostSearchForm = () => {
	const [keyword, setKeyword] = useState("");
	const [team, setTeam] = useState("全部");
	const [type, setType] = useState("news");

	const router = useRouter();

	function handleSubmit(e) {
		e.preventDefault();

		if (keyword === "" && team === "全部" && type === "news") {
			router.push("/posts#newsPage-section");
		} else if (keyword === "" && team === "全部" && type === "discussion") {
			router.push("/posts#discussionPage-section");
		} else {
			const query = `?${keyword && `keyword=${keyword}&`}team=${team}&type=${type}`;
			router.push(`/posts/search-results${query}`);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mt-4 max-w-3xl mx-auto flex flex-col md:flex-row items-center">
			<div className="w-full mb-4 md:w-5/12 md:pr-2 md:mb-0">
				<input
					type="text"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="關鍵字 (球員, 標題, 內文..."
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-green-700"
				/>
			</div>
			<div className="w-full mb-4 md:w-3/12 md:pr-2 md:mb-0">
				<select
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-green-700"
					value={team}
					onChange={(e) => setTeam(e.target.value)}>
					<option value="全部">全部</option>
					<option value="統一7-ELEVEn獅">統一7-ELEVEn獅</option>
					<option value="中信兄弟">中信兄弟</option>
					<option value="樂天桃猿">樂天桃猿</option>
					<option value="富邦悍將">富邦悍將</option>
					<option value="味全龍">味全龍</option>
					<option value="台鋼雄鷹">台鋼雄鷹</option>
				</select>
			</div>
			<div className="flex w-full md:w-auto justify-center space-x-2">
				<div className="w-1/3 md:w-auto mt-2 md:mt-0">
					<select
						className="w-full px-3 py-3 rounded-lg bg-white text-center text-gray-800 focus:outline-none focus:ring focus:ring-green-700"
						value={type}
						onChange={(e) => setType(e.target.value)}>
						<option value="news">新聞</option>
						<option value="discussion">評論</option>
					</select>
				</div>

				<button
					type="submit"
					className="w-2/3 md:w-auto mt-2 md:mt-0 md:ml-4 px-8 py-3 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-600">
					搜尋
				</button>
			</div>
		</form>
	);
};

export default PostSearchForm;
