"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const image1 = '/images/image.jpg'
const image2 = '/images/image-copy.png'
const image3 = '/images/image-copy-2.png'
const image4 = '/images/image-copy.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Women Solid Round Green T-Shirt",
      subtitle: "Big Saving Days Sale",
      price: "$59.00",
      image: image1,
      bgColor: "bg-[#F3F4F0]",
    },
	{
      id: 1,
      title: "Women Solid Round Green T-Shirt",
      subtitle: "Big Saving Days Sale",
      price: "$59.00",
      image: image2,
      bgColor: "bg-[#F3F4F0]",
    },
	{
      id: 1,
      title: "Women Solid Round Green T-Shirt",
      subtitle: "Big Saving Days Sale",
      price: "$59.00",
      image: image3,
      bgColor: "bg-[#F3F4F0]",
    },
	{
      id: 1,
      title: "Women Solid Round Green T-Shirt",
      subtitle: "Big Saving Days Sale",
      price: "$59.00",
      image: image4,
      bgColor: "bg-[#F3F4F0]",
    },
  ];

  return (
    <div className=" py-15 ">
		<Swiper
			spaceBetween={30}
			centeredSlides={true}
			autoplay={{
				delay: 50000,
				disableOnInteraction: false,
			}}
			pagination={{ clickable: true }}
			navigation={true}
			loop={true}
			modules={[Autoplay, Pagination, Navigation]}
			className="mySwiper rounded-xl overflow-hidden"
		>
        {slides.map((slide,i) => (
			<SwiperSlide key={i}>
				<div className={`flex flex-col md:flex-row items-center ${slide.bgColor} min-h-100`}>
				
				{/* Left Content Side */}
					<div className="w-full md:w-1/2 p-12 flex flex-col items-start text-left">
						<span className="text-gray-600 font-medium mb-2">
							{slide.subtitle}
						</span>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
							{slide.title}
						</h1>
						<div className="flex items-center gap-4">
							<span className="text-lg text-gray-700">Starting At Only</span>
							<span className="text-2xl font-bold text-red-600">{slide.price}</span>
						</div>
						<button className="mt-8 bg-[#D14D4D] text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors uppercase tracking-wider text-sm">
							Shop Now
						</button>
					</div>

					{/* Right Image Side */}
					<div className="w-full md:w-1/2 h-full flex justify-end">
						<img 
							src={typeof slide.image === 'string' ? slide.image : slide.image} 
							alt={slide.title}
							className="object-cover h-100 w-200"
						/>
					</div>
				</div>
			</SwiperSlide>
			))}
		</Swiper>
		</div>
	);
};

export default HeroSlider;