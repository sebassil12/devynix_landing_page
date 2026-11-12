"use client";
import Link from "next/link";
import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/i18n/provider";

type Point = { title: string; subtitle: string };

// Icon per point; the copy itself comes from the dictionary.
const pointIcons = [
  "tabler:target-arrow",
  "tabler:flask",
  "tabler:refresh",
] as const;

export const AboutDevynix = () => {
  const { t, tList, locale } = useTranslation();
  const points = tList<Point>("home.about.points");

  return (
    <div className="bg-lightgray dark:bg-darkgray lg:py-24 py-12">
      <div className="container-1218 mx-auto">
        <div className="max-w-[860px] mx-auto bg-white dark:bg-dark rounded-tw shadow-elevation2 lg:p-12 p-7">
          <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white">
            {t("home.about.title")}
          </h2>
          <p className="text-17 leading-[32px] text-darklink pt-6">
            {t("home.about.description")}
          </p>
          <div className="grid grid-cols-12 gap-30 pt-10">
            {points.map((point, index) => (
              <div className="md:col-span-4 col-span-12" key={point.title}>
                <div className="h-10 w-10 rounded-tw bg-lightprimary flex justify-center items-center mb-4">
                  <Icon
                    icon={pointIcons[index] ?? pointIcons[0]}
                    height={22}
                    className="text-primary"
                  />
                </div>
                <h5 className="text-lg font-semibold text-dark dark:text-white">
                  {point.title}
                </h5>
                <p className="text-base text-darklink leading-7 pt-2">
                  {point.subtitle}
                </p>
              </div>
            ))}
          </div>
          <Button
            color={"primary"}
            as={Link}
            href={`/${locale}/aboutus`}
            className="font-bold mt-10 sm:w-fit w-full"
          >
            {t("home.about.cta")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutDevynix;
