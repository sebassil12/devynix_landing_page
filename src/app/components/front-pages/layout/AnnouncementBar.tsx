"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/i18n/provider";

const AnnouncementBar = () => {
  const { t, locale } = useTranslation();

  // State to control the visibility of the div
  const [isVisible, setIsVisible] = useState(true);

  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible && (
        <div className="bg-dark py-2 overflow-hidden relative  before:absolute before:left-0 before:lg:inline-block before:lg:none before:hidden before:content-[''] before:bg-[url('/images/front-pages/background/left-shape.png')] before:bg-no-repeat before:bg-contain before:top-0  before:w-[325px] before:h-[50px]   after:absolute after:end-1/4 after:lg:inline-block after:lg:none after:hidden after:content-[''] after:bg-[url('/images/front-pages/background/right-shape.png')] after:bg-no-repeat after:bg-contain after:top-0  after:w-[325px] after:h-[50px]">
          <div className="flex justify-center gap-4 items-center ">
            <Link
              href={`/${locale}`}
              className="py-1 px-2 rounded-[8px] bg-lightbtn text-xs font-bold text-white"
            >
              {t("announcement.badge")}
            </Link>
            <p className="text-13 font-medium text-white opacity-80">
              {t("announcement.message")}
            </p>
            <button
              type="button"
              onClick={toggleVisibility}
              aria-label={t("announcement.dismiss")}
              className="absolute end-4"
            >
              <Icon
                icon="solar:close-circle-outline"
                className="text-primary"
                height={24}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementBar;
