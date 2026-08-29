import React from "react";
import type { Metadata } from "next";
import FrontEndBreadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/FrontBreadcrumb";
import PurchaseTemp from "@/app/components/front-pages/homepage/PurchaseTemp";
import BlogDetailData from "@/app/components/apps/blog/detail";
import { BlogProvider } from "@/app/context/BlogContext";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.meta.blogDetail.title };
}

const page = () => {
  return (
    <>
      <FrontEndBreadcrumb
        titleKey="blog.breadcrumbTitle"
        linkKey="blog.detailBreadcrumbLink"
      />
      <div className="bg-lightgray dark:bg-darkgray">
        <div className="container-1218 mx-auto pb-12">
          <BlogProvider>
            <BlogDetailData />
          </BlogProvider>
        </div>
      </div>
      <PurchaseTemp />
    </>
  );
};

export default page;
