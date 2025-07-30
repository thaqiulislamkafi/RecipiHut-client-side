import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
    return (
        <div>

            <Swiper modules={[Autoplay]} onSlideChange={()=> console.log('slide change')} autoplay={{delay :4000 , disableOnInteraction : false}} loop={true} onSwiper={(swiper) => console.log(swiper)}>
                
                <SwiperSlide>
                    <div className='banner Slide-1 relative h-screen max-h-[500px] bg-[image:linear-gradient(to_top,black,transparent),url("https://i.postimg.cc/7YG2K5xm/pic-1.jpg")] bg-cover bg-center sora-font'>
                        <div className='text-white w-[85.94vw] mx-auto'>
                            {/* <p className='cover-title'>From Kitchen to Craving</p> */}
                           <div className='cover-title'> <Typewriter loop={true} words={['From Kitchen to Craving']} /></div> 
                            <p className='cover-description'>Discover handpicked recipes from master chefs around the world. Order what you love, when you crave it — freshly prepared and ready to delight.</p>
                            <button className='Button cover-button'>Explore</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='banner Slide-2 relative h-screen max-h-[500px] bg-[image:linear-gradient(to_top,black,transparent),url("https://i.postimg.cc/t4d7cP8t/pic-2.jpg")] bg-cover bg-center sora-font'>
                        <div className='text-white w-[85.94vw] mx-auto'>
                            {/* <p className='cover-title'>Book Your Bite</p> */}
                           <div className='cover-title'> <Typewriter loop={true} words={['Book Your Bite']} /></div> 
                            <p className='cover-description'> Reserve your favorite dishes like never before. Whether it's a cozy family dinner or a festive feast, we've got the recipe waiting.</p>
                            <button className='Button cover-button'>Explore</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='banner Slide-3 relative h-screen max-h-[500px] bg-[image:linear-gradient(to_top,black,transparent),url("https://i.postimg.cc/d0bst0Mt/pic-3.jpg")] bg-cover bg-center sora-font'>
                        <div className='text-white w-[85.94vw] mx-auto'>
                            {/* <p className='cover-title'>Taste the Tradition</p> */}
                           <div className='cover-title'> <Typewriter loop={true} words={['Taste the Tradition']} /></div> 

                            <p className='cover-description'>Savor authentic, home-style recipes rooted in culture and crafted with care. One click brings heritage flavors to your table.</p>
                            <button className='Button cover-button'>Explore</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>


        </div>
    );
};

export default Banner;