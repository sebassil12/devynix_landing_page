"use client";
import React from "react";
import Link from "next/link";
import { DevynixMark } from "@/app/components/front-pages/macana/DevynixMark";

const Logo = () => {
  return (
    <Link href={"/"}>
      <DevynixMark className="h-10 w-10" />
    </Link>
  );
};

export default Logo;
