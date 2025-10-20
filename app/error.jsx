"use client";
import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";

const ErrorPage = ({ error }) => {
	return (
		<section className="bg-green-50 min-h-screen">
			<div className="m-auto max-w-2xl py-24">
				<div className="bg-white py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<FaExclamationCircle className="text-red-400 text-8xl fa-5x mx-auto" />

					<div className="text-center">
						<h1 className="text-3xl font-semibold mt-4 mb-2 tracking-wider">
							出了點問題
						</h1>
						<p className="text-gray-500 text-xl mb-10">{error.toString()}</p>
						<Link
							href="/"
							className="bg-green-700 hover:bg-green-900 text-lg text-white font-semibold py-4 px-6 rounded">
							回首頁
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ErrorPage;
