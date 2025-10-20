export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/posts/add", "/profile", "/posts/saved"],
};
