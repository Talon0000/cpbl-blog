import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
	session: {
		strategy: "jwt",
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

		async jwt({ token, user }) {
			await connectDB();

			if (user) {
				const dbUser = await User.findOne({ email: user.email });

				token.id = dbUser._id.toString();
				token.username = dbUser.username;
				token.email = dbUser.email;
				token.image = dbUser.image;
			}
			return token;
		},
		// Session callback function that modifies the session object
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.username = token.username;
			session.user.email = token.email;
			session.user.image = token.image;

			return session;
		},
	},
	cookies: {
		sessionToken: {
			name: "__Secure-next-auth.session-token",
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
};
