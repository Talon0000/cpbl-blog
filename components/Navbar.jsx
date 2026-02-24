"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import defaultProfileImage from "@/assets/images/profile.png";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { ImProfile } from "react-icons/im";

const Navbar = () => {
	const { data: session } = useSession();
	const profileImage = session?.user?.image;

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [providers, setProviders] = useState(null);

	const pathname = usePathname();
	const menuRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsProfileMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const setAuthProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		setAuthProviders();
	}, []);

	return (
		<nav className="border-b border-green-50 text-white bg-green-900">
			<div className="max-w-full mx-auto px-2 sm:px-6 lg:px-14  py-4">
				<div className="relative flex items-center">
					{/* <!-- Hamburger Button --> */}
					<div className="absolute left-1 md:hidden">
						<button
							id="menu-btn"
							type="button"
							className={`${isMobileMenuOpen ? "open" : ""} hamburger `}
							onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
							<span className=" hamburger-top"></span>
							<span className=" hamburger-middle"></span>
							<span className=" hamburger-bottom"></span>
						</button>
					</div>
					{/* Logo & Menu */}
					<div className="flex flex-1 items-center justify-center md:justify-start space-x-8">
						{/* Logo */}
						<Link href="/" className="flex h-[64px] items-center ">
							<Image
								src={logo}
								className="mt-2"
								alt="logo"
								width={100}
								height={100}
							/>
							<span className="hidden md:block tracking-wider text-4xl font-semibold text-gray-50 ">
								CPBL社群平台
							</span>
						</Link>
						{/* Desktop menu hidden below md screens */}
						<div className="hidden md:block space-x-2 ">
							<Link
								href="/"
								className={`${
									pathname === "/" ? "bg-gray-300 text-green-700" : ""
								} hover:bg-gray-300 rounded-lg hover:text-green-700 px-4 py-2`}>
								主頁
							</Link>

							<Link
								href="/posts"
								className={`${
									pathname === "/posts" ? "bg-gray-300 text-green-700" : ""
								} hover:bg-gray-300 rounded-lg hover:text-green-700 px-4 py-2`}>
								貼文總覽
							</Link>
							{session && (
								<Link
									href="/posts/add"
									className={`${
										pathname === "/posts/add" ? "bg-gray-300 text-green-700" : ""
									} hover:bg-gray-300 rounded-lg hover:text-green-700 px-4 py-2`}>
									新增貼文
								</Link>
							)}
						</div>
					</div>
					{/* Right side menu (logged out)*/}
					{!session && (
						<div className="absolute right-1 flex items-center ">
							{providers &&
								Object.values(providers).map((provider, index) => (
									<button
										key={index}
										onClick={() => signIn(provider.id)}
										type="button"
										className=" flex items-center bg-gray-700 rounded-lg px-3 py-2 hover:bg-gray-400 ">
										<FaGoogle className="mr-1" />
										<span className="tracking-wider">註冊 或 登入</span>
									</button>
								))}
						</div>
					)}
					{/* Right side menu (logged in) */}
					{session && (
						<div className="absolute right-1" ref={menuRef}>
							{/* Profile dropdown button */}

							<button
								type="button"
								id="user-menu-button"
								className=" rounded-full focus:ring-2 ring-gray-400"
								// onBlur={() => setIsProfileMenuOpen(false)}
								onClick={() => setIsProfileMenuOpen((prev) => !prev)}>
								<Image
									src={profileImage || defaultProfileImage}
									alt="profile image"
									className="rounded-full"
									height={40}
									width={40}
								/>
							</button>

							{/* isProfileOpen */}
							{isProfileMenuOpen && (
								<div className="absolute flex flex-col right-0 top-12 w-40 text-sm rounded-md bg-white shadow-lg focus:outline-none">
									<Link
										href="/profile"
										className="flex items-center text-black tracking-wider hover:bg-gray-200 hover:text-green-700 rounded-t-md pl-4 pt-2 pb-1"
										onClick={() => setIsProfileMenuOpen(false)}>
										<ImProfile className="mr-1" />
										個人檔案
									</Link>
									{/* <Link
										href="/posts/saved"
										className="text-black tracking-wider hover:bg-gray-200 hover:text-green-700 pl-4 py-2"
										onClick={() => setIsProfileMenuOpen(false)}>
										收藏貼文
									</Link> */}
									<button
										className="flex items-center text-black tracking-wider hover:bg-gray-200 hover:text-green-700 rounded-b-md pl-4 pb-2 pt-1"
										onClick={() => {
											setIsProfileMenuOpen(false);
											signOut({
												callbackUrl: process.env.NEXT_PUBLIC_DOMAIN || "/",
											});
										}}>
										<MdLogout className="mr-1" />
										登出
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Mobile menu */}
			<div
				id="mobile-menu"
				className={`overflow-hidden transition-all ease-in-out duration-500 md:hidden ${
					isMobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
				}`}>
				<div className="space-y-2 mt-2 mb-3">
					<Link
						href="/"
						onClick={() => setIsMobileMenuOpen(false)}
						className={`${
							pathname === "/" ? "bg-gray-300 text-green-700" : ""
						} hover:bg-gray-300 rounded-lg hover:text-green-700 block mx-3 px-3 py-2 text-lg sm:text-xl`}>
						主頁
					</Link>
					<Link
						href="/posts"
						onClick={() => setIsMobileMenuOpen(false)}
						className={`${
							pathname === "/posts" ? "bg-gray-300 text-green-700" : ""
						} hover:bg-gray-300 rounded-lg hover:text-green-700 block mx-3 px-3 py-2 text-lg sm:text-xl`}>
						貼文總覽
					</Link>
					{session && (
						<Link
							href="/posts/add"
							onClick={() => setIsMobileMenuOpen(false)}
							className={`${
								pathname === "/posts/add" ? "bg-gray-300 text-green-700" : ""
							} hover:bg-gray-300 rounded-lg hover:text-green-700 block mx-3 px-3 py-2 text-lg sm:text-xl`}>
							新增貼文
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
