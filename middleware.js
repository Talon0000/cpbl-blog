import { withAuth } from "next-auth/middleware";

export default withAuth({
	pages: {
		signIn: "/api/auth/signin",
	},
});

export const config = {
	matcher: ["/posts/add", "/profile", "/posts/:path*/edit"],
};

// export { default } from "next-auth/middleware";

// export const config = {
// 	matcher: ["/posts/add", "/profile", "/posts/:path*/edit"],
// };
