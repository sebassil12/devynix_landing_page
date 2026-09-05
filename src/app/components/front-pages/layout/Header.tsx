"use client";
import React, { useState, useEffect } from "react";
import "flowbite";
import FullLogo from "@/app/components/shared/logo/FullLogo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

const FrontHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={` top-0 z-50 ${
        isSticky
          ? "bg-white dark:bg-dark shadow-md fixed w-full py-5"
          : "bg-lightgray dark:bg-darkgray lg:py-9 py-5 "
      }`}
    >
      <div className="container-1218 mx-auto flex justify-between items-center">
        <FullLogo />
        <div className="xl:block hidden">
          <Navigation />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default FrontHeader;
