"use client";
import { Button, HR, Label, Select, Textarea, TextInput } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { useTranslation } from "@/i18n/provider";

const ContactForm = () => {
  const { t } = useTranslation();
  const required = (label: string) => `${label} *`;

  return (
    <>
      <div className="container-1218 mx-auto mt-30">
        <div className="grid grid-cols-12 lg:gap-30 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <div className="overflow-hidden rounded-tw bg-primary relative p-30 after:absolute after:content-[''] after:bg-[url('/images/front-pages/background/contact-icon.png')] after:bg-no-repeat after:bg-right-top after:top-0 after:right-0   after:w-[325px] after:h-[325px]">
              <h5 className="text-lg font-bold text-white pb-4">
                {t("contact.reachOut.title")}
              </h5>
              <p className="text-base text-white leading-7">
                {t("contact.reachOut.description")}
              </p>
              <HR className="border-t border-white/10 !bg-transparent" />
              <h5 className="text-lg font-bold text-white pb-4">
                {t("contact.location.title")}
              </h5>
              <p className="text-base text-white leading-7">
                {t("contact.location.description")}
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <CardBox>
              <div className="grid grid-cols-12 lg:gap-30 gap-6">
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="nm"
                      value={required(t("contact.form.firstName"))}
                    />
                  </div>
                  <TextInput
                    id="nm"
                    type="text"
                    placeholder={t("contact.form.firstNamePlaceholder")}
                    required
                    className="form-control"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="lnm"
                      value={required(t("contact.form.lastName"))}
                    />
                  </div>
                  <TextInput
                    id="lnm"
                    type="text"
                    placeholder={t("contact.form.lastNamePlaceholder")}
                    required
                    className="form-control"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="ph"
                      value={required(t("contact.form.phone"))}
                    />
                  </div>
                  <TextInput
                    id="ph"
                    type="tel"
                    placeholder={t("contact.form.phonePlaceholder")}
                    required
                    className="form-control"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="em"
                      value={required(t("contact.form.email"))}
                    />
                  </div>
                  <TextInput
                    id="em"
                    type="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    required
                    className="form-control"
                  />
                </div>
                <div className="col-span-12">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="inq"
                      value={required(t("contact.form.enquiryType"))}
                    />
                  </div>
                  <Select id="inq" required className="select-md">
                    <option>{t("contact.enquiryTypes.general")}</option>
                    <option>{t("contact.enquiryTypes.other")}</option>
                  </Select>
                </div>
                <div className="col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="msg" value={t("contact.form.message")} />
                  </div>
                  <Textarea
                    id="msg"
                    placeholder={t("contact.form.messagePlaceholder")}
                    required
                    className="form-control-textarera rounded-md"
                    rows={4}
                  />
                </div>
                <div className="col-span-12">
                  <div className="block ">
                    <Button
                      color={"primary"}
                      className="sm:w-auto w-full ms-auto"
                    >
                      {t("contact.form.submit")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
