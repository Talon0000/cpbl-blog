import Image from "next/image";
import logo from "@/assets/images/logo.svg";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-200 py-4">
			<div className="container mx-auto flex flex-col items-center justify-between md:flex-row px-4">
				<Image src={logo} alt="logo" width={70} height={70} />

				<div className="text-sm text-gray-500 mt-2 md:mt-0">
					&copy; {currentYear} CPBL Blog. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
