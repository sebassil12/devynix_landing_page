"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import mainbanner from "@public/images/front-pages/background/feature-image.png";
import mainbanner2 from "@public/images/front-pages/background/widget_materialM_2.png";
import mainbanner3 from "@public/images/front-pages/background/widget_materialM_3.png";
import mainbanner4 from "@public/images/front-pages/background/widget_materialM_4.png";
import { Accordion, Button, HR } from "flowbite-react";
import { useTranslation } from "@/i18n/provider";

type Tab = { label: string; items: { title: string; desc: string }[] };

// ponytail: the template repeated the same markup four times, differing only by
// image and data. One data-driven render instead.
const tabVisuals = [
  { icon: "material-symbols:groups-outline-rounded", image: mainbanner },
  { icon: "material-symbols:account-balance-outline", image: mainbanner2 },
  { icon: "material-symbols-light:photo-frame-outline-sharp", image: mainbanner3 },
  { icon: "material-symbols:widgets-outline-rounded", image: mainbanner4 },
];

const FeatureTabs = () => {
  const { t, tList } = useTranslation();
  const tabs = tList<Tab>("home.featureTabs.tabs");
  const [activeIndex, setActiveIndex] = useState(0);

  const active = tabs[activeIndex];
  const visual = tabVisuals[activeIndex] ?? tabVisuals[0];

  return (
    <>
      <div
        id="products"
        className="bg-lightgray dark:bg-darkgray lg:py-24 py-12"
      >
        <div className="container-1218 mx-auto">
          {/* Tabs */}
          <div className="overflow-x-auto ">
            <div className="flex shrink-0 gap-4 md:pb-14 pb-8">
              {tabs.map((tab, index) => (
                <div
                  key={tab.label}
                  onClick={() => setActiveIndex(index)}
                  className={`py-4 px-6 whitespace-nowrap w-full rounded-tw cursor-pointer text-dark text-base font-semibold text-center flex gap-2 justify-center items-center md:hover:bg-lightprimary md:dark:hover:bg-lightprimary md:hover:text-primary shadow-elevation2 ${
                    activeIndex === index
                      ? "text-white bg-primary dark:bg-primary shadow-elevation3"
                      : "dark:text-white bg-white dark:bg-dark"
                  }`}
                >
                  <Icon
                    icon={tabVisuals[index]?.icon ?? tabVisuals[0].icon}
                    height={22}
                  />
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-30">
            <div className="lg:col-span-6 col-span-12">
              <Image src={visual.image} className="w-full" alt="banner" />
            </div>
            <div className="lg:col-span-6 col-span-12 lg:ps-7">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white pb-6">
                {t("home.featureTabs.heading")}
              </h2>
              <Accordion className="shadow-none dark:shadow-none divide-y-0 !rounded-none">
                {(active?.items ?? []).map((item) => (
                  <Accordion.Panel key={item.title} className="bg-white dark:bg-dark">
                    <Accordion.Title className="focus:ring-0 px-0 text-17 font-semibold text-ld py-5 ">
                      {item.title}
                    </Accordion.Title>
                    <Accordion.Content className="px-0 pt-0 !rounded-none">
                      <p className="text-base text-darklink leading-7 ">
                        {item.desc}
                      </p>
                    </Accordion.Content>
                    <HR className="my-0" />
                  </Accordion.Panel>
                ))}
              </Accordion>
              <Button color={"primary"} className="font-bold mt-6">
                {t("home.featureTabs.cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureTabs;
