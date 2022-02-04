import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const CustomSlider = ({ children }) => {
  return <Slider { ...sliderSettings }>{ children }</Slider>;
};

CustomSlider.propTypes = {
  children: PropTypes.array,
}
