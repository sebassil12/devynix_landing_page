"use client";
import Image from "next/image";
import React from "react";
import ErrorImg from "@public/images/backgrounds/errorimg.svg";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";

const Error = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-white dark:bg-darkgray">
        <div className="text-center">
          <Image src={ErrorImg} alt="error" className="mb-4" />
          <h1 className="text-ld text-4xl mb-6">{t("notFound.heading")}</h1>
          <h6 className="text-xl text-ld">{t("notFound.message")}</h6>
          <Button
            color={"primary"}
            as={Link}
            href={`/${locale}`}
            className="w-fit mt-6 mx-auto"
          >
            {t("notFound.backToHome")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Error;
