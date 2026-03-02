import "@/assets/styles/globals.css";
import { Noto_Sans_TC } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer, Bounce } from "react-toastify";

// export const dynamic = "force-dynamic";

const notosans = Noto_Sans_TC({
	subsets: ["latin"],
});

export const metadata = {
	title: {
		template: `%s | ${process.env.PROJECT_NAME}`,
		default: `${process.env.PROJECT_NAME}`,
	},
	keywords:
		"棒球, 中華職棒, CPBL, 統一7-ELEVEn獅, 中信兄弟, 樂天桃猿, 富邦悍將, 味全龍, 台鋼雄鷹",
	description: "分享與討論你對中華職棒賽事的想法吧",
};

export default function RootLayout({ children }) {
	return (
		<html className={notosans.className} lang="zh-Hant">
			<body>
				<AuthProvider>
					<Navbar />
					<main className="min-h-screen">{children}</main>
					<Footer />
					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						pauseOnHover={false}
						theme="colored"
						transition={Bounce}
					/>
				</AuthProvider>
			</body>
		</html>
	);
}
