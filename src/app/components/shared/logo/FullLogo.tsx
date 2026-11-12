"use client";
import React from "react";
import Image from "next/image";
import LogoMark from "@public/images/logos/devynix-mark.svg";
import Link from "next/link";
const FullLogo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image src={LogoMark} alt="Devynix" width={40} height={40} />
      <span className="text-xl font-bold tracking-tight text-dark dark:text-white">
        Devynix
      </span>
    </Link>
  );
};

export default FullLogo;
