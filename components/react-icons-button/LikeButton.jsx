"use client";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { addLike } from "@/app/actions/addRemoveLike";
import { removeLike } from "@/app/actions/addRemoveLike";
import { signIn, getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";

const LikeButton = ({
	isLikedInitial,
	likesCount,
	textSize = "text-sm sm:text-lg",
	postId,
}) => {
	const [isLiked, setIsLiked] = useState(isLikedInitial);
	const [likesCounts, setLikesCounts] = useState(likesCount);
	const [providers, setProviders] = useState(null);
	const { data: session } = useSession();

	useEffect(() => {
		const setAuthProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		setAuthProviders();
	}, []);

	const handleAddLike = async () => {
		try {
			setLikesCounts((prev) => prev + 1);
			setIsLiked(true);
			await addLike(postId);
		} catch (error) {
			console.error(error);
			setLikesCounts((prev) => prev - 1);
			setIsLiked(false);
		}
	};

	const handleRemoveLike = async () => {
		try {
			setLikesCounts((prev) => prev - 1);
			setIsLiked(false);
			await removeLike(postId);
		} catch (error) {
			console.error(error);
			setLikesCounts((prev) => prev + 1);
			setIsLiked(true);
		}
	};

	const handleLike = async () => {
		if (!session?.user) {
			providers &&
				Object.values(providers).forEach((provider) => signIn(provider.id));
			return;
		}
		if (isLiked) {
			handleRemoveLike();
		} else {
			handleAddLike();
		}
	};

	return (
		<span
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				handleLike();
			}}
			className={`flex w-fit mx-auto justify-center items-center ${textSize}`}>
			{isLiked && (
				<FaHeart className="mr-1 text-red-500 hover:scale-110 transition-transform duration-200 hover:cursor-pointer" />
			)}
			{!isLiked && (
				<FaRegHeart className="mr-1 hover:text-red-500 hover:scale-110 transition-transform duration-200 hover:cursor-pointer" />
			)}
			{likesCounts}
		</span>
	);
};

export default LikeButton;
