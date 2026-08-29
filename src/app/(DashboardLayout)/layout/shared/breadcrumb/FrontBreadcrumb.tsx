"use client";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "@/i18n/provider";

interface BreadCrumbType {
  /** Dictionary path, e.g. "pricing.breadcrumbTitle" — lets server pages stay server pages. */
  titleKey: string;
  linkKey?: string;
}

const FrontEndBreadcrumb = ({ titleKey, linkKey }: BreadCrumbType) => {
  const { t, locale } = useTranslation();

  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray sm:pb-14 pb-8">
        <div className="container-1218 mx-auto md:pt-14 pt-7 ">
          <div className="flex sm:justify-between justify-center  items-center flex-wrap">
            <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white text-center">
              {t(titleKey)}
            </h2>
            <div className="flex  items-center gap-4 uppercase text-sm font-bold md:mt-0 mt-4">
              <span className="text-ld opacity-80">{t("common.brand")}</span>
              <IconChevronRight size={15} />{" "}
              <Link href={`/${locale}`} className="text-primary">
                {linkKey ? t(linkKey) : null}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontEndBreadcrumb;
