import Link from "next/link";

const PaginationButton = ({ children, buildSearchParams, pageNumber }) => {
	return (
		<Link
			href={buildSearchParams(pageNumber)}
			className="text-base text-gray-500 border border-gray-300 px-3 py-2 hover:text-white hover:bg-green-700">
			{children}
		</Link>
	);
};

export default PaginationButton;
