import { Badge } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "@/i18n/provider";

const FrontNav = [
  { key: "nav.aboutUs", href: "/aboutus", badge: false },
  { key: "nav.blog", href: "/blog", badge: false },
  { key: "nav.portfolio", href: "/portfolio", badge: true },
  { key: "nav.pricing", href: "/pricing", badge: false },
  { key: "nav.contact", href: "/contact", badge: false },
];

const Navigation = () => {
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  return (
    <>
      <ul className="flex xl:flex-row flex-col xl:gap-9 gap-6 xl:items-center">
        {FrontNav.map((item) => {
          const href = `/${locale}${item.href}`;
          return (
            <li
              key={item.key}
              className={`rounded-full font-semibold text-15 py-1.5 px-2.5 ${
                pathname === href
                  ? "bg-lightprimary text-primary"
                  : "text-dark dark:text-white "
              }`}
            >
              <Link
                href={href}
                className="flex gap-3 items-center text-primary-ld"
              >
                {t(item.key)}
                {item.badge ? (
                  <Badge color={"lightprimary"}>{t("common.badges.new")}</Badge>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Navigation;
