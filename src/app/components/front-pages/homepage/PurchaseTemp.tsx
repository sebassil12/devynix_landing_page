"use client";
import Logo from "@/app/components/shared/logo/Logo";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "@/i18n/provider";

const PurchaseTemp = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      <div className="bg-primary lg:py-24 py-12 relative">
        <div className="absolute -start-10 top-24 xl:block hidden">
          <Image
            src="/images/front-pages/background/left-widget.png"
            height={420}
            width={420}
            alt=""
          />
        </div>
        <div className="container-1218 mx-auto relative z-1">
          <div className="flex flex-col items-center justify-center text-center ">
            <div className="h-14 w-14 rounded-tw flex justify-center items-center bg-white shadow-elevation4">
              <Logo />
            </div>
            <h3 className="sm:text-44 text-3xl font-bold !leading-[48px] text-white lg:px-20 py-6">
              {t("home.purchase.heading")}
            </h3>
            <p className="text-lg text-white lg:px-64 leading-8">
              {t("home.purchase.description")}
            </p>
            <Button
              color={"outlinewhite"}
              as={Link}
              href={`/${locale}/contact`}
              className="mt-5 px-4 sm:w-auto w-full"
            >
              {t("home.purchase.cta")}
            </Button>
          </div>
        </div>
        <div className="absolute -end-10 top-24 xl:block hidden">
          <Image
            src="/images/front-pages/background/right-widget.png"
            height={420}
            width={420}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default PurchaseTemp;
