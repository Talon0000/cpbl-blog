export const metadata = {
	title: "貼文總覽",
};

const PostLayout = ({ news, discussion }) => {
	return (
		<>
			{news}
			{discussion}
		</>
	);
};

export default PostLayout;
