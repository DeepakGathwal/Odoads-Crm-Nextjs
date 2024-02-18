import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";

const page = [
  {
    title: "About us",
    url: "../../imgs/block-about.jpg",
    link: "about",
  },
  {
    title: "Our pricing",
    url: "../../imgs/block-price.jpg",
    link: "pricing",
  },
  {
    title: "On features",
    url: "../../imgs/block-features.jpg",
    link: "features",
  },
  {
    title: "Let`s talk",
    url: "../../imgs/block-contact.jpg",
    link: "contact",
  },
];

const Pages = () => {
  const route = useRouter();
  {
    var settings = {
      autoplay: true,
      className: "center",
      // centerMode: true,
      infinite: true,
      autoplaySpeed: 4000,
      cssEase: "linear",
      dots: false,
      slidesToShow: 1,
      prevArrow: null, // Hide the previous arrow button
      nextArrow: null, // Hide the next arrow button
      speed: 4000,

      // pauseOnHover: true,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function (currentSlide, nextSlide) {},
      afterChange: function (currentSlide) {},
    };
  }

  let slider = settings;
  return (
    <>
      <Slider {...slider}>
        {page.map((e, i) => (
          <img
            src={e.url}
            alt={e.alt}
            key={i}
            className="slid-img"
            onClick={() => route.push(`/${e.link}`)}
          />
        ))}
      </Slider>
    </>
  );
};

export default Pages;
