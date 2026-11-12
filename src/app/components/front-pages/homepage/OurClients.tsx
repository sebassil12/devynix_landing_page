"use client";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/i18n/provider";

const featureVisuals = [
  { icon: "tabler:chart-bubble", bgcolor: "bg-lighterror", color: "text-error" },
  {
    icon: "tabler:building-store",
    bgcolor: "bg-lightprimary",
    color: "text-primary",
  },
  {
    icon: "material-symbols:category-outline",
    bgcolor: "bg-lightsuccess",
    color: "text-success",
  },
  {
    icon: "material-symbols:earthquake",
    bgcolor: "bg-lightgray dark:bg-darkgray",
    color: "text-dark dark:text-white",
  },
];

const OurClients = () => {
  const { t, tList, locale } = useTranslation();
  const features = tList<{ title: string; subtitle: string }>(
    "home.clients.features"
  );

  return (
    <>
      <div className="lg:py-24 py-12 dark:bg-dark">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30">
            <div className="lg:col-span-5 col-span-12">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white">
                {t("home.clients.title")}
              </h2>
              <p className="text-17 leading-[32px] text-darklink py-6">
                {t("home.clients.description")}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="text-dark dark:text-white text-15 font-bold underline decoration-2 underline-offset-[6px] text-primary-ld"
              >
                {t("home.clients.cta")}
              </Link>
            </div>
            <div className="lg:col-span-7 col-span-12 lg:ps-5 ">
              <div className="grid grid-cols-12 md:gap-12 gap-6">
                {features.map((item, index) => {
                  const visual = featureVisuals[index] ?? featureVisuals[0];
                  return (
                    <div className="md:col-span-6 col-span-12" key={item.title}>
                      <div
                        className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-tw ${visual.bgcolor}`}
                      >
                        <Icon
                          icon={visual.icon}
                          className={`${visual.color}`}
                          height={24}
                        />
                      </div>
                      <h4 className="font-bold text-dark dark:text-white py-5 text-22">
                        {item.title}
                      </h4>
                      <p className="text-15 text-darklink md:pt-2 leading-6">
                        {item.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurClients;
