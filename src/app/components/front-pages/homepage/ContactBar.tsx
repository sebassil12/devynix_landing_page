"use client";
import Link from "next/link";
import React from "react";
import user1 from "@public/images/profile/user-1.jpg";
import user2 from "@public/images/profile/user-12.jpg";
import Image from "next/image";
import { useTranslation } from "@/i18n/provider";

const ContactBar = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      <div className="bg-primary md:flex justify-center items-center py-4 px-5">
        <div className="sm:flex gap-4 items-center">
          <div className="flex sm:justify-start items-center justify-center ps-3">
            <div className="-ms-3 h-10 w-10 relative z-5 opacity-50">
              <Image src={user1} className="rounded-full" alt="icon" />
            </div>
            <div className="-ms-3 h-11 w-11 relative z-5">
              <Image src={user2} className="rounded-full" alt="icon" />
            </div>
          </div>
          <p className="text-base text-white sm:text-left text-center md:py-0 py-2">
            {t("home.contactBar.message")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="text-base font-semibold text-white underline sm:text-left text-center block"
          >
            {t("home.contactBar.cta")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ContactBar;
