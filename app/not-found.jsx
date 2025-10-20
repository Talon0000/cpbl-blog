import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
	return (
		<section className="bg-green-50 min-h-screen">
			<div className="m-auto max-w-2xl py-24">
				<div className=" bg-white rounded-md shadow-lg px-6 py-24 border m-4 md:m-0">
					<FaExclamationTriangle className="text-yellow-400 text-8xl fa-5x mx-auto" />

					<div className="text-center">
						<h1 className="text-3xl font-semibold my-4 tracking-wider">
							頁面不存在
						</h1>
						<p className="text-gray-500 text-xl tracking-wider mb-10">
							你所尋找的頁面不存在
						</p>
						<Link
							href="/"
							className="bg-green-700 text-lg text-white px-6 py-4 rounded-md mb-10 hover:bg-green-900">
							回主頁
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFoundPage;
