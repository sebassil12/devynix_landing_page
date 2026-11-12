"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Button } from "flowbite-react";
import { useTranslation } from "@/i18n/provider";

type Tier = { licenseType: string; licenseDesc: string; price: string };

// Which tier allows SaaS use / unlimited projects / is highlighted — structural,
// not translatable, so it stays in code and lines up with the dictionary array.
const tierFlags = [
  { isSaasUse: false, unlimited: false, isPopular: false },
  { isSaasUse: false, unlimited: true, isPopular: false },
  { isSaasUse: true, unlimited: false, isPopular: true },
  { isSaasUse: true, unlimited: true, isPopular: false },
];

export const Packages = () => {
  const { t, tList } = useTranslation();
  const tiers = tList<Tier>("home.packages.tiers");

  return (
    <>
      <div className="dark:bg-dark">
        <div className="container-1218 mx-auto lg:pt-24 pt-12">
          <div className="flex w-full justify-center mb-12">
            <div className="text-center">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white text-center">
                {t("home.packages.title")}
              </h2>
              <p className="text-17 leading-[32px] pt-4 text-darklink">
                {t("home.packages.description")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {tiers.map((item, index) => {
              const flags = tierFlags[index] ?? tierFlags[0];
              return (
                <div
                  className="xl:col-span-3 md:col-span-6 col-span-12"
                  key={item.licenseType}
                >
                  <div className="p-6 rounded-tw border border-ld">
                    <div className="pb-8">
                      <h6 className="text-xl font-semibold text-ld mb-4 flex items-center gap-2">
                        {item.licenseType}
                        {flags.isPopular ? (
                          <Badge
                            color={"lightprimary"}
                            className="text-xs font-bold rounded-full"
                            size={"small"}
                          >
                            {t("common.badges.popular")}
                          </Badge>
                        ) : null}
                      </h6>
                      <p className="text-ld opacity-90 leading-[24px] text-sm ">
                        {item.licenseDesc}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-40 leading-tight font-bold text-primary">
                        {item.price}
                      </div>
                      <p className="text-base self-end text-ld opacity-90 relative -top-1">
                        {t("home.packages.perOneTime")}
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3.5">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="tabler:circle-check"
                          className="text-xl text-secondary"
                        />
                        <p className="text-15 text-ld font-medium tracking-wide">
                          {t("home.packages.included.fullSourceCode")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="tabler:circle-check"
                          className="text-xl text-secondary"
                        />
                        <p className="text-15 text-ld font-medium tracking-wide">
                          {t("home.packages.included.documentation")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon
                          icon={
                            flags.isSaasUse
                              ? "tabler:circle-check"
                              : "tabler:circle-x"
                          }
                          className={`text-xl ${
                            flags.isSaasUse ? "text-secondary" : "text-error"
                          }`}
                        />
                        <p
                          className={`text-15 text-ld font-medium tracking-wide ${
                            flags.isSaasUse ? "" : "opacity-90"
                          }`}
                        >
                          {t("home.packages.included.saasUse")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-15 text-ld flex items-center gap-1 font-medium tracking-wide">
                          <Icon
                            icon="tabler:circle-check"
                            className="text-xl text-secondary"
                          />
                          <span className="font-bold">
                            {flags.unlimited
                              ? t("home.packages.included.unlimitedProjectStrong")
                              : t("home.packages.included.oneProjectStrong")}
                          </span>{" "}
                          {t("home.packages.included.projectSuffix")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="tabler:circle-check"
                          className="text-xl text-secondary shrink-0"
                        />
                        <p className="text-15 text-ld font-medium tracking-wide whitespace-nowrap">
                          <span className="font-bold">
                            {t("home.packages.included.oneYearStrong")}
                          </span>{" "}
                          {t("home.packages.included.technicalSupportSuffix")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button
                        size={"lg"}
                        className="text-lg py-0 bg-dark hover:bg-primaryemphasis text-white font-medium rounded-md w-full"
                      >
                        {t("home.packages.cta")}
                      </Button>
                    </div>
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
