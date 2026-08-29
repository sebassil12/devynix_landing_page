"use client";
import React, { useState } from "react";
import { Button, Drawer } from "flowbite-react";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import Navigation from "./Navigation";
import { useTranslation } from "@/i18n/provider";
const MobileMenu = () => {
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <div className="xl:hidden flex">
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center text-dark  h-10 w-10 rounded-full bg-transparent hover:bg-lightprimary"
        >
          <IconMenu2 />
        </Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className="h-full">
        <Drawer.Items className="p-6">
          <div className="mb-6">
            <FullLogo />
          </div>
          <Navigation />
          <Button
            as={Link}
            href={`/${locale}`}
            className="font-bold w-full mt-6"
            color={"sky"}
          >
            {t("common.actions.logIn")}
          </Button>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default MobileMenu;
