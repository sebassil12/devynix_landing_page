"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import review1 from "@public/images/profile/user-2.jpg";
import review2 from "@public/images/profile/user-3.jpg";
import review3 from "@public/images/profile/user-4.jpg";
import { useTranslation } from "@/i18n/provider";

const avatars = [review1, review2, review3];

type Review = { title: string; subtitle: string; review: string };

const ClientReviews = () => {
  const { t, tList } = useTranslation();
  const userReview = tList<Review>("home.reviews.items");

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = userReview.length;

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    swipeToSlide: true,
    dots: false,
    arrows: false,
    beforeChange: (oldIndex: any, newIndex: React.SetStateAction<number>) =>
      setCurrentSlide(newIndex),
  };

  return (
    <div className="lg:pt-24 pt-14 pb-14 dark:bg-dark">
      <div className="container-1218 mx-auto">
        <div className="grid grid-cols-12 gap-30">
          <div className="lg:col-span-5 col-span-12">
            <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white">
              {t("home.reviews.title")}
            </h2>
            <p className="text-17 leading-[32px] sm:py-6 text-darklink">
              {t("home.reviews.description")}
            </p>
            <div className="flex  items-center md:mt-0 mt-4  gap-4 custom-controls">
              <Arrow
                direction="left"
                label={t("home.reviews.previous")}
                onClick={() => sliderRef.current?.slickPrev()}
              />
              <span className="counter text-15 font-medium text-darklink">
                {t("home.reviews.counter", {
                  current: currentSlide + 1,
                  total: totalSlides,
                })}
              </span>
              <Arrow
                direction="right"
                label={t("home.reviews.next")}
                onClick={() => sliderRef.current?.slickNext()}
              />
            </div>
          </div>
          <div className="lg:col-span-7 col-span-12">
            <div className="slider-container client-reviews">
              <Slider ref={sliderRef} {...settings}>
                {userReview.map((item, index) => (
                  <div key={item.title} className="lg:ps-6">
                    <p className="sm:text-2xl text-xl text-ld">{item.review}</p>
                    <div className="flex justify-between items-center pt-10">
                      <div className="flex gap-4 items-center">
                        <Image
                          src={avatars[index] ?? avatars[0]}
                          alt={item.title}
                          className="h-14 w-14 rounded-full"
                        />
                        <div>
                          <h6 className="text-xl font-bold mb-1">
                            {item.title}
                          </h6>
                          <p className="text-15 font-medium text-ld opacity-50">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <span className="h-12 w-12 rounded-full me-0.5 bg-primary flex justify-center items-center">
                          <Image
                            src="/images/front-pages/background/quotes.svg"
                            alt=""
                            height={20}
                            width={20}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Arrow = ({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-label={label}
    className="custom-arrow bg-lightgray dark:bg-darkgray rounded-full flex justify-center items-center cursor-pointer h-8 w-8 rtl:scale-x-[-1]"
    onClick={onClick}
  >
    <Icon
      icon={`tabler:chevron-${direction}`}
      className="text-darklink text-xl"
    />
  </button>
);

export default ClientReviews;
