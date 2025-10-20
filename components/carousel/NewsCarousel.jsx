"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import NewsCarouselCard from "./NewsCarouselCard";

const NewsCarousel = ({ posts }) => {
	return (
		<section className="bg-white mx-auto max-w-6xl px-4 py-6">
			<h1 className="text-2xl tracking-wide text-gray-700 md:text-4xl text-center font-semibold">
				近期賽事新聞
			</h1>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				autoplay={{
					delay: 6000,
					pauseOnMouseEnter: true,
					disableOnInteraction: false,
				}}
				navigation
				pagination={{ clickable: true }}>
				{posts.length > 0 ? (
					posts.map((post) => (
						<SwiperSlide className="px-10 py-10">
							<NewsCarouselCard post={post} />
						</SwiperSlide>
					))
				) : (
					<p className="text-center font-semibold text-lg mt-4 lg:mt-6 lg:mb-4 tracking-wide sm:tracking-wider md:tracking-widest sm:text-xl md:text-2xl lg:text-3xl">
						目前還沒有任何新聞...
					</p>
				)}
			</Swiper>
		</section>
	);
};

export default NewsCarousel;
