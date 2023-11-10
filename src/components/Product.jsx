import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { getAssetURL } from '../utils';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import '../styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const Product = ({ productImages }) => {
  console.log(productImages);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="sm:flex flex-col items-start sm:flex-row sm:items-center w-full lg:w-[500px] order-last lg:order-first gap-5">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-10 sm:mb-0">
        {productImages.map((product, index) => (
          <SwiperSlide key={index}>
            <img src={getAssetURL(product.directus_files_id.id)} alt="image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper order-last sm:order-first">
        {productImages.map((product, index) => (
          <SwiperSlide key={index}>
            <img src={getAssetURL(product.directus_files_id.id)} alt="product" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Product;
