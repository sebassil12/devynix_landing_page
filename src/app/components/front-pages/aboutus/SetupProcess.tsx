"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/i18n/provider";

const stepVisuals = [
  {
    icon: "tabler:building-store",
    bgcolor: "bg-lightprimary",
    color: "text-primary",
  },
  { icon: "tabler:chart-bubble", bgcolor: "bg-lighterror", color: "text-error" },
  {
    icon: "material-symbols:category-outline",
    bgcolor: "bg-lightsuccess",
    color: "text-success",
  },
  {
    icon: "material-symbols:earthquake",
    bgcolor: "bg-lightgray dark:bg-darkmuted",
    color: "text-dark dark:text-lightgray",
  },
];

const SetupProcess = () => {
  const { t, tList } = useTranslation();
  const steps = tList<{ title: string; subtitle: string }>(
    "about.setupProcess.steps"
  );

  return (
    <>
      <div className="dark:bg-dark">
        <div className="container-1218 mx-auto lg:py-24 py-12">
          <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white text-center pb-12">
            {t("about.setupProcess.title")}
          </h2>
          <div className="grid grid-cols-12 md:gap-30 gap-6">
            {steps.map((item, index) => {
              const visual = stepVisuals[index] ?? stepVisuals[0];
              return (
                <div
                  className="xl:col-span-3 md:col-span-6 col-span-12"
                  key={item.title}
                >
                  <div className={`${visual.bgcolor} p-30 rounded-tw`}>
                    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-tw bg-white dark:bg-darkgray shadow-elevation4">
                      <Icon
                        icon={visual.icon}
                        className={`${visual.color}`}
                        height={24}
                      />
                    </div>
                    <h4 className="font-bold text-dark dark:text-white py-5 text-22">
                      {item.title}
                    </h4>
                    <p className="text-15 text-darklink  leading-6">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupProcess;
