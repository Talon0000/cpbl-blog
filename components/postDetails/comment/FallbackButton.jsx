"use client";
import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const FallbackButton = () => {
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setAuthProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		setAuthProviders();
	}, []);

	return (
		<>
			{providers &&
				Object.values(providers).map((provider, idx) => (
					<button
						key={idx}
						className="w-fit px-3 py-1 text-green-700  md:text-xl border border-green-600 rounded-lg hover:bg-green-700 hover:text-white "
						onClick={() => signIn(provider.id)}>
						登入加入討論吧！
					</button>
				))}
		</>
	);
};

export default FallbackButton;
