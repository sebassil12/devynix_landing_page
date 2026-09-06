"use client";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { DevynixMark } from "@/app/components/front-pages/macana/DevynixMark";
import Logo from "@/app/components/shared/logo/Logo";
import { useTranslation } from "@/i18n/provider";

// ponytail: the template's three columns pointed at dashboard routes that no
// longer exist (/widgets/cards, /react-tables/basic, ...). Repointed at the
// pages this site actually has.
const columns = [
  {
    headingKey: "footer.columns.product",
    links: [
      { key: "footer.links.home", href: "" },
      { key: "footer.links.aboutUs", href: "/aboutus" },
      { key: "footer.links.contact", href: "/contact" },
    ],
  },
  {
    headingKey: "footer.columns.resources",
    links: [{ key: "footer.links.faq", href: "/#faq" }],
  },
];

const socials = [
  { key: "footer.social.facebook", img: "facebook" },
  { key: "footer.social.twitter", img: "twitter" },
  { key: "footer.social.instagram", img: "instagram" },
];

export const Footer = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      <div className="bg-dark">
        <div className="container-1218 mx-auto ">
          <div className="border-b border-darkborder lg:py-24 py-12">
            <div className="grid grid-cols-12 gap-30 ">
              <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                <DevynixMark className="mb-8 h-14 w-14" />
              </div>
              {columns.map((column) => (
                <div
                  key={column.headingKey}
                  className="lg:col-span-3 sm:col-span-6 col-span-12"
                >
                  <h4 className="text-17 text-white font-semibold mb-8">
                    {t(column.headingKey)}
                  </h4>
                  <div className="flex flex-col gap-4">
                    {column.links.map((item) => (
                      <Link
                        key={item.key}
                        href={`/${locale}${item.href}`}
                        className="text-sm text-lightmuted hover:text-primary block"
                      >
                        {t(item.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                <h4 className="text-17 text-white font-semibold mb-8">
                  {t("footer.columns.followUs")}
                </h4>
                <div className="flex items-center gap-5">
                  {socials.map((social) => (
                    <Tooltip
                      key={social.key}
                      content={t(social.key)}
                      placement="bottom"
                      className="shrink-0"
                    >
                      <Link href="/" aria-label={t(social.key)}>
                        <Image
                          src={`/images/front-pages/background/${social.img}.svg`}
                          height={22}
                          width={22}
                          alt={t(social.key)}
                        />
                      </Link>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-1218 mx-auto ">
          <div className="flex md:justify-between justify-center items-center flex-wrap md:py-10 py-8">
            <div className="flex items-center gap-3">
              <Logo />
              <p className="text-15 text-lightmuted ">{t("footer.rights")}</p>
            </div>
            <p className="text-15 text-lightmuted  flex items-center gap-1 md:pt-0 pt-3">
              {t("footer.producedBy")}{" "}
              <Link className="text-white text-primary-ld" href={`/${locale}`}>
                {t("footer.producer")}
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
