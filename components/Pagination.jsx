"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import PaginationButton from "./PaginationButton";

const Pagination = ({ queryKey, totalPages, pageGroupSize, toSection = false }) => {
	const searchParams = useSearchParams();
	const pathName = usePathname();

	const currentPage = Number(searchParams.get(queryKey) || 1);
	const currentPageGroup = Math.floor((currentPage - 1) / pageGroupSize);
	const startPage = currentPageGroup * pageGroupSize + 1;
	const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

	let pages = [];

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	const [isHover, setIsHover] = useState(null);

	const buildSearchParams = (pageNumber) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(queryKey, pageNumber);

		// const fragment = toSection ? `#${queryKey}-section` : "";
		return `${pathName}?${params.toString()}${toSection ? `#${toSection}` : ""}`;
	};

	return (
		<div className="relative mt-16">
			<div className="hidden lg:block">
				{/* 灰色底線 */}
				<div className="absolute -top-2 w-full h-[3px] bg-gray-300 " />

				{/* 頁碼 */}
				<div className="flex justify-center ">
					{/* 第一頁 */}
					{currentPage !== 1 && (
						<Link
							href={buildSearchParams(1)}
							onMouseEnter={() => setIsHover("第一頁")}
							onMouseLeave={() => setIsHover(null)}
							className="relative px-2 pb-2 text-gray-600 hover:text-green-700">
							{/* 頁數 */}
							第一頁
							{/* 對應線條變色 */}
							{"第一頁" === isHover && (
								<span className="absolute -top-2 left-1/2 w-16 h-[3px] bg-green-700 -translate-x-1/2" />
							)}
						</Link>
					)}

					{/* 上一頁 */}
					{currentPage > 1 && (
						<Link
							href={buildSearchParams(currentPage - 1)}
							onMouseEnter={() => setIsHover("上一頁")}
							onMouseLeave={() => setIsHover(null)}
							className="relative px-2 pb-2 text-gray-600 hover:text-green-700">
							{/* 頁數 */}
							上一頁
							{/* 對應線條變色 */}
							{"上一頁" === isHover && (
								<span className="absolute -top-2 left-1/2 w-16 h-[3px] bg-green-700 -translate-x-1/2" />
							)}
						</Link>
					)}

					{/* 數字頁碼 */}
					{pages.map((p) => (
						<Link
							key={p}
							href={buildSearchParams(p)}
							onMouseEnter={() => setIsHover(p)}
							onMouseLeave={() => setIsHover(null)}
							className={`relative px-5 pb-2 font-semibold ${
								p === currentPage
									? "text-green-700"
									: "text-gray-600 hover:text-green-700"
							}`}>
							{/* 頁數 */}
							{p}

							{/* 對應線條變色 */}
							{(p === currentPage || p === isHover) && (
								<span className="absolute -top-2 left-1/2 w-11 h-[3px] bg-green-700 -translate-x-1/2" />
							)}
						</Link>
					))}

					{/* 下一頁 */}
					{currentPage < totalPages && (
						<Link
							href={buildSearchParams(currentPage + 1)}
							onMouseEnter={() => setIsHover("下一頁")}
							onMouseLeave={() => setIsHover(null)}
							className="relative px-2 pb-2  text-gray-600 hover:text-green-700">
							{/* 頁數 */}
							下一頁
							{/* 對應線條變色 */}
							{"下一頁" === isHover && (
								<span className="absolute -top-2 left-1/2 w-16 h-[3px] bg-green-700 -translate-x-1/2" />
							)}
						</Link>
					)}

					{/* 最末頁 */}
					{currentPage !== totalPages && (
						<Link
							href={buildSearchParams(totalPages)}
							onMouseEnter={() => setIsHover("最末頁")}
							onMouseLeave={() => setIsHover(null)}
							className="relative px-2 pb-2 text-gray-600 hover:text-green-700">
							{/* 頁數 */}
							最末頁
							{/* 對應線條變色 */}
							{"最末頁" === isHover && (
								<span className="absolute -top-2 left-1/2 w-16 h-[3px] bg-green-700 -translate-x-1/2" />
							)}
						</Link>
					)}
				</div>
			</div>
			<div className="hidden sm:block lg:hidden">
				<div className="flex justify-center space-x-1">
					{currentPage !== 1 && (
						<PaginationButton buildSearchParams={buildSearchParams} pageNumber={1}>
							第一頁
						</PaginationButton>
					)}
					{currentPage > 1 && (
						<PaginationButton
							buildSearchParams={buildSearchParams}
							pageNumber={currentPage - 1}>
							上一頁
						</PaginationButton>
					)}
					{currentPage < totalPages && (
						<PaginationButton
							buildSearchParams={buildSearchParams}
							pageNumber={currentPage + 1}>
							下一頁
						</PaginationButton>
					)}
					{currentPage !== totalPages && (
						<PaginationButton
							buildSearchParams={buildSearchParams}
							pageNumber={totalPages}>
							最末頁
						</PaginationButton>
					)}
				</div>
			</div>
			<div className="sm:hidden">
				<div className="flex justify-center space-x-1">
					{currentPage > 1 && (
						<PaginationButton
							buildSearchParams={buildSearchParams}
							pageNumber={currentPage - 1}>
							上一頁
						</PaginationButton>
					)}
					{currentPage < totalPages && (
						<PaginationButton
							buildSearchParams={buildSearchParams}
							pageNumber={currentPage + 1}>
							下一頁
						</PaginationButton>
					)}
				</div>
			</div>
		</div>
	);
};

export default Pagination;
