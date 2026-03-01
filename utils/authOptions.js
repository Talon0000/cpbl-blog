import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24, // 1 day
	},
	jwt: {
		maxAge: 60 * 60 * 24, // 1 day
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		// Invoked on successful sign in
		// profile: google回傳的原始JSON資料 {sub, name, email, picture, email_verified, locale}
		async signIn({ profile }) {
			// 1.Connect to the database
			await connectDB();
			// 2.Check if user exists
			const userExists = await User.findOne({ email: profile.email });
			// 3.if not, create user
			if (!userExists) {
				// Truncate username if too long
				const username = profile.name.slice(0, 20);

				await User.create({
					email: profile.email,
					username,
					image: profile.picture,
				});
			}
			// 4.Return true to allow sign in
			return true;
		},

		//這邊的 user則是 Next Auth收到 google資料後過濾後的 object {id, name, email, image}
		async jwt({ token, user }) {
			await connectDB();

			// 用 user.email去資料庫找該名用戶的資料，並將他們放入token裡 (登入才有值，後續重新整理不會有 user)
			if (user) {
				const dbUser = await User.findOne({ email: user.email });

				token.id = dbUser._id.toString();
				token.username = dbUser.username;
				token.email = dbUser.email;
				token.image = dbUser.image;
			}
			return token;
		},

		async session({ session, token }) {
			// token：這是從加密 Cookie 解密出來的內容
			// session：準備給前端的物件

			session.user.id = token.id;
			session.user.username = token.username;
			session.user.email = token.email;
			session.user.image = token.image;

			return session;
		},
	},
};
