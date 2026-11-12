"use client";
import React from "react";
import { useTranslation } from "@/i18n/provider";

const Archivement = () => {
  const { t, tList } = useTranslation();
  const stats = tList<{ value: string; label: string }>(
    "about.achievement.stats"
  );

  return (
    <>
      <div className="dark:bg-dark border-t border-ld">
        <div className="container-1218 mx-auto lg:py-24 py-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="xl:col-span-5 col-span-12">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white">
                {t("about.achievement.title")}
              </h2>
            </div>
            <div className="xl:col-span-7 col-span-12">
              <div className="flex flex-wrap lg:gap-8 gap-6">
                {stats.map((stat) => (
                  <div key={stat.value}>
                    <h3 className="text-primary lg:text-64 text-5xl leading-tight font-normal">
                      {stat.value}
                    </h3>
                    <span className="text-sm text-dark opacity-90">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Archivement;
