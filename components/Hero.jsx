import PostSearchForm from "./PostSearchForm";

const Hero = () => {
	return (
		<section className="bg-green-900 py-20 ">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
				<div className="text-center space-y-4 -mt-4 mb-4">
					<h1 className="text-white font-semibold text-3xl sm:text-4xl md:text-6xl tracking-widest">
						還在等什麼呢？
					</h1>
					<p className="text-lg tracking-wider text-gray-300">
						馬上搜尋感興趣的貼文吧！
					</p>
				</div>
			</div>
			<div className="px-8 sm:px-14">
				{/* Form component */}
				<PostSearchForm />
			</div>
		</section>
	);
};

export default Hero;
