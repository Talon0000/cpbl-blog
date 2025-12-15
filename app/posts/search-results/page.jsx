import PostSearchForm from "@/components/postForm/PostSearchForm";
import DiscussionsSearchResults from "@/components/searchResults/DiscussionsSearchResults";
import NewsSearchResults from "@/components/searchResults/NewsSearchResults";

export const metadata = {
	title: "搜尋結果",
};

const SearchResultsPage = async ({ searchParams }) => {
	const {
		keyword,
		team,
		type,
		discussionPage = 1,
		newsPage = 1,
	} = await searchParams;

	const query = {
		type: type,
	};

	if (keyword && keyword.trim() !== "") {
		const keywordPattern = new RegExp(keyword, "i"); // i = 忽略大小寫
		query.$or = [{ title: keywordPattern }, { content: keywordPattern }];
	}

	if (team && team !== "全部") {
		query.teams = team;
	}

	// console.log("搜尋條件:", query);

	if (type === "news") {
		return (
			<>
				<section className="bg-green-900 px-4 py-4 pb-6">
					<div className="px-8 md:px-14">
						<PostSearchForm />
					</div>
				</section>
				<NewsSearchResults query={query} newsPage={newsPage} />
			</>
		);
	}

	return (
		<>
			<section className="bg-green-900 px-4 py-4 pb-6">
				<div className="px-8 md:px-14">
					<PostSearchForm />
				</div>
			</section>
			<DiscussionsSearchResults query={query} discussionPage={discussionPage} />
		</>
	);
};

export default SearchResultsPage;
