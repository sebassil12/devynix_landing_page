"use client";
import React from "react";
import leader1 from "@public/images/front-pages/team/leader1.png";
import leader2 from "@public/images/front-pages/team/leader2.png";
import leader3 from "@public/images/front-pages/team/leader3.png";
import leader4 from "@public/images/front-pages/team/leader4.png";
import Image from "next/image";
import { useTranslation } from "@/i18n/provider";

const portraits = [leader1, leader2, leader3, leader4];

const OurTeam = () => {
  const { t, tList } = useTranslation();
  const team = tList<{ name: string; position: string }>("home.team.members");

  return (
    <>
      <div className="bg-dark lg:py-24 py-12">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30 pb-12">
            <div className="lg:col-span-7 col-span-12">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-white">
                {t("home.team.title")}
              </h2>
            </div>
            <div className="lg:col-span-5 col-span-12">
              <p className="text-17 leading-[32px] lg:ps-5">
                {t("home.team.description")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-30">
            {team.map((item, index) => (
              <div
                className="lg:col-span-3 md:col-span-6 col-span-12"
                key={item.name}
              >
                <div className="relative group">
                  <Image
                    src={portraits[index] ?? portraits[0]}
                    alt={item.name}
                  />
                  <div className="bg-white dark:bg-dark text-center rounded-md py-4 px-3 absolute bottom-3 start-3 end-3 lg:opacity-0 opacity-100 group-hover:opacity-100 transition-[0.5s]">
                    <h5 className="text-lg">{item.name}</h5>
                    <span>{item.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
