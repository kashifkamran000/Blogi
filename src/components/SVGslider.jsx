import React from 'react';
import Slider from 'react-slick';
import './SVGslider.css'; 
import image1 from '../../public/1.svg'
import image2 from '../../public/2.svg'
import image3 from '../../public/3.svg'
import image4 from '../../public/4.svg'
import image5 from '../../public/5.svg'
import image6 from '../../public/6.svg'
import image7 from '../../public/7.svg'

const images = [image1, image2, image3, image4, image5, image6, image7]

function PauseOnHover() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className='slider-image' />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PauseOnHover;
