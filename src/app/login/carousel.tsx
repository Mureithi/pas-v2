import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1524758870432-af57e54afa26?q=80&w=2558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Image 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=2558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Image 2',
    },
    // Add more images as needed
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="w-3/4 h-3/4">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
