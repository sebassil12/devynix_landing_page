"use client";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/i18n/provider";

// Icon + colour per marquee row; labels come from the dictionary arrays.
const rowVisuals = {
  row1: [
    { icon: "tabler:wand", bg: "bg-lightprimary", text: "text-primary" },
    { icon: "tabler:shield-lock", bg: "bg-lightsecondary", text: "text-secondary" },
    { icon: "tabler:brand-firebase", bg: "bg-lighterror", text: "text-error" },
    { icon: "tabler:archive", bg: "bg-lightsuccess", text: "text-success" },
    { icon: "tabler:adjustments", bg: "bg-lightinfo", text: "text-info" },
    { icon: "tabler:brand-tailwind", bg: "bg-lightprimary", text: "text-primary" },
    { icon: "tabler:diamond", bg: "bg-lightwarning", text: "text-warning" },
  ],
  row2: [
    { icon: "tabler:database", bg: "bg-lightprimary", text: "text-primary" },
    { icon: "tabler:tags", bg: "bg-lighterror", text: "text-error" },
    { icon: "tabler:hexagons", bg: "bg-lightinfo", text: "text-info" },
    { icon: "tabler:arrows-shuffle", bg: "bg-lightsuccess", text: "text-success" },
  ],
  row3: [
    { icon: "tabler:chart-pie", bg: "bg-lightsecondary", text: "text-secondary" },
    { icon: "tabler:layers-intersect", bg: "bg-lightwarning", text: "text-warning" },
    { icon: "tabler:refresh", bg: "bg-lightsuccess", text: "text-success" },
    { icon: "tabler:book", bg: "bg-lightwarning", text: "text-warning" },
    { icon: "tabler:calendar", bg: "bg-lightinfo", text: "text-info" },
    { icon: "tabler:user-screen", bg: "bg-lightprimary", text: "text-primary" },
  ],
} as const;

export const Highlights = () => {
  const { tList } = useTranslation();

  const rows = [
    { key: "row1", repeat: 4, labels: tList<string>("home.highlights.row1") },
    { key: "row2", repeat: 6, labels: tList<string>("home.highlights.row2") },
    { key: "row3", repeat: 4, labels: tList<string>("home.highlights.row3") },
  ] as const;

  return (
    <>
      <div className="dark:bg-dark">
        <div className="container-1218 mx-auto ">
          <div className=" lg:pt-24 pt-12 rounded-md overflow-hidden">
            {rows.map((row) => {
              const visuals = rowVisuals[row.key as keyof typeof rowVisuals];
              const marquee =
                row.key === "row2" ? "marquee2-group" : "marquee1-group";
              return (
                <div key={row.key} className={`${marquee} flex gap-6`}>
                  {Array.from({ length: row.repeat }).map((_, cycle) => (
                    <div key={cycle} className="flex gap-6 mb-6">
                      {row.labels.map((label, index) => {
                        const visual = visuals[index] ?? visuals[0];
                        return (
                          <div
                            key={label}
                            className={`py-5 px-8 rounded-[16px] flex gap-3 items-center ${visual.bg}`}
                          >
                            <Icon
                              icon={visual.icon}
                              className={`text-2xl shrink-0 ${visual.text}`}
                            />
                            <p
                              className={`text-15 font-semibold whitespace-nowrap ${visual.text}`}
                            >
                              {label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
