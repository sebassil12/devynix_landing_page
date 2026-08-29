"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "@/i18n/provider";

const HeroText = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray">
        <div className="container-1218 mx-auto md:py-14 py-7">
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-6 col-span-12 lg:text-start text-center">
              <h1 className="xl:text-5xl text-4xl text-dark dark:text-white xl:leading-[64px] leading-[50px] font-normal">
                <b>{t("about.hero.title")}</b>
                <br />
                {t("about.hero.titleSuffix")}
              </h1>
              <div className="sm:flex lg:justify-start justify-center gap-5 py-6">
                <Button
                  color={"primary"}
                  as={Link}
                  href={`/${locale}`}
                  className="px-4 font-bold sm:w-fit w-full"
                >
                  {t("about.hero.primaryCta")}
                </Button>
                <Button
                  color={"outlineprimary"}
                  as={Link}
                  href={`/${locale}`}
                  className="px-4 font-bold sm:w-fit w-full sm:mt-0 mt-4"
                >
                  {t("about.hero.secondaryCta")}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 lg:text-left text-center">
              <p className="text-base text-ld opacity-90 leading-8 xl:ps-20 pt-4">
                {t("about.hero.lead")}{" "}
                <b className="opacity-100">{t("about.hero.brandPhrase")}</b>{" "}
                {t("about.hero.leadRest")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroText;
