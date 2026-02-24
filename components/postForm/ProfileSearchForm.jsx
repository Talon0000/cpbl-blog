"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ProfileSearchForm = () => {
	const router = useRouter();
	const [error, serError] = useState({ type: "", date: "" });

	const handleSubmit = (e) => {
		e.preventDefault();

		serError({ type: "", date: "" });
		const type = e.target.type.value;
		const startDate = e.target.startDate.value;
		const endDate = e.target.endDate.value;

		if ((startDate && !endDate) || (!startDate && endDate)) {
			serError({ date: "請選擇完整的日期範圍" });
			return;
		}

		if (new Date(startDate) > new Date(endDate)) {
			serError({ date: "開始日期不能晚於結束日期" });
			return;
		}

		if (!type) {
			serError({ type: "請選擇貼文類型" });
			return;
		}

		if (!startDate && !endDate) {
			return router.push(`/profile?type=${type}`);
		}

		return router.push(
			`/profile?type=${type}&startDate=${startDate}&endDate=${endDate}`
		);
	};

	const handleChange = (e) => {
		const { name } = e.target;
		if (name === "startDate" || name === "endDate") {
			serError((prev) => ({ ...prev, date: "" }));
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center p-0 xs:px-3 xs:py-4 md:px-0 space-y-4">
			<h3 className="text-xl text-center md:text-lg lg:text-left text-gray-600 ">
				選擇日期範圍
			</h3>
			<div className="flex justify-evenly border border-emerald-700 px-3 py-1 w-full xxs:w-[80%] rounded-md md:flex-col lg:flex-row md:w-full md:items-center">
				<input
					type="date"
					className="text-base xs:text-lg sm:text-xl md:text-lg focus:outline-none"
					onChange={handleChange}
					name="startDate"
				/>
				～
				<input
					type="date"
					className="text-base xs:text-lg sm:text-xl md:text-lg focus:outline-none"
					onChange={handleChange}
					name="endDate"
				/>
			</div>
			{error.date !== "" && <p className="text-red-500">*{error.date}</p>}
			<h3 className="text-xl text-center pt-4 py-2 md:text-lg lg:text-left text-gray-600">
				選擇貼文類型
			</h3>
			<div className="flex flex-col sm:flex-row md:flex-col w-full xxs:w-[80%] text-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-y-2 md:space-x-0">
				<select
					name="type"
					className="w-full px-3 pl-6 py-1 rounded-md text-lg  text-center border border-emerald-700 focus:outline-none"
					required>
					<option value="all">全部</option>
					<option value="news">新聞</option>
					<option value="discussion">討論</option>
				</select>
				{error.type !== "" && <p className="text-red-500">{error.type}</p>}
				<button
					type="submit"
					className="w-full px-3 py-1 text-lg text-center border border-emerald-700 focus:outline-none rounded-md hover:bg-green-600 hover:text-white">
					查詢
				</button>
			</div>
		</form>
	);
};

export default ProfileSearchForm;
