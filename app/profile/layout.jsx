"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import defaultProfileImage from "@/assets/images/profile.png";
import Image from "next/image";
import ProfileSearchForm from "@/components/postForm/ProfileSearchForm";

const ProfileLayout = ({ news, discussions }) => {
	const searchParams = useSearchParams();

	const { data: sessionUser } = useSession();

	const type = searchParams.get("type") || "all";

	return (
		<section className="bg-emerald-50">
			<div className="container m-auto py-24">
				<div className="bg-white px-0 py-8 xs:px-6 rounded-md shadow-md border m-4 md:m-0">
					<h1 className="text-3xl xs:text-4xl mb-4 text-slate-700 text-center md:text-left">
						個人檔案
					</h1>
					<div className="flex flex-col md:flex-row">
						<div className="px-4 mt-10 mx-auto md:px-0 md:mx-20 w-full md:w-2/6">
							<div className="mb-4">
								<Image
									alt="profileImage"
									src={sessionUser?.user?.image || defaultProfileImage}
									width={0}
									height={0}
									sizes="100vw"
									className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 mx-auto md:mx-0 rounded-full"
								/>
							</div>
							<h2 className="text-center text-gray-600 md:text-left mb-4 text-xl xs:text-2xl md:text-xl lg:text-2xl">
								<span className="">姓名: </span>
								{sessionUser?.user?.name}
							</h2>
							<h2 className="text-center text-gray-600 md:text-left mb-10 text-xl xs:text-2xl md:text-xl lg:text-2xl">
								<span className="">Email: </span>
								{sessionUser?.user?.email}
							</h2>

							<ProfileSearchForm />
						</div>
						<div className="md:w-4/6">
							<h1 className="text-3xl text-center my-5">你的貼文</h1>
							{type === "all" ? (
								<>
									<div className="mb-4">{news}</div>

									{discussions}
								</>
							) : type === "news" ? (
								news
							) : (
								discussions
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileLayout;
