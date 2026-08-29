import React from "react";
import type { Metadata } from "next";
import FrontEndBreadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/FrontBreadcrumb";
import PurchaseTemp from "@/app/components/front-pages/homepage/PurchaseTemp";
import BlogPost from "@/app/components/front-pages/blog/BlogPost";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.meta.blog.title };
}

const page = () => {
  return (
    <>
      <FrontEndBreadcrumb
        titleKey="blog.breadcrumbTitle"
        linkKey="blog.breadcrumbLink"
      />
      <div className="bg-lightgray dark:bg-darkgray">
        <BlogPost />
      </div>
      <PurchaseTemp />
    </>
  );
};

export default page;
