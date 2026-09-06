"use client";
import React from "react";
import Link from "next/link";
import { DevynixMark } from "@/app/components/front-pages/macana/DevynixMark";

const FullLogo = () => {
  return (
    <Link href={"/"}>
      <DevynixMark className="h-12 w-12" />
    </Link>
  );
};

export default FullLogo;
