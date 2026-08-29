"use client";
import { Accordion } from "flowbite-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";

export const FAQ = () => {
  const { t, tList } = useTranslation();
  const questions = tList<{ question: string; answer: string }>(
    "home.faq.items"
  );

  return (
    <>
      <div className="dark:bg-dark" id="faq">
        <div className="max-w-[800px] mx-auto px-5 lg:py-24 py-12">
          <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-dark dark:text-white text-center mb-14">
            {t("home.faq.title")}
          </h2>
          <Accordion className="shadow-none dark:shadow-none divide-y-1 divide-b-0 divided:border-ld !rounded-none flex flex-col gap-4">
            {questions.map((item) => (
              <Accordion.Panel key={item.question}>
                <Accordion.Title className="focus:ring-0 px-6  text-lg text-ld py-5 border border-ld rounded-md !border-b-none">
                  {item.question}
                </Accordion.Title>
                <Accordion.Content className="!p-0 px-0 pt-0 rounded-none">
                  <p className="text-base text-darklink leading-7 border border-t-0 border-ld -mt-5 px-6 py-5 rounded-b-md">
                    {item.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
          <p className="mt-14 text-sm font-medium justify-center text-darklink flex flex-wrap items-center gap-1 border border-dashed w-fit mx-auto px-3 py-1.5 rounded-md">
            {t("home.faq.stillHaveQuestion")}{" "}
            <Link
              href="https://discord.com/invite/eMzE8F6Wqs"
              className="underline hover:text-primary"
              target="_blank"
            >
              {t("home.faq.askOnDiscord")}
            </Link>{" "}
            <span>{t("home.faq.or")}</span>
            <Link
              href="/contact"
              className="underline hover:text-primary"
            >
              {t("home.faq.submitTicket")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
