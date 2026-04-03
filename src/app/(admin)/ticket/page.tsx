"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PlayMatch = {
  stadion: "Gelora Bung Tomo",
  tanggal: new Date(),
  tim: [
    { logo: "play1.png", label: "Persebaya Surabaya" },
    { logo: "play2.png", label: "Manchaster United" },
  ],
};

const TicketPage = () => {
  const { lang, t } = useLanguage();

  const menu = [
    {
      label: t("ticket.menu.condition"),
      url: "#",
    },
    {
      label: t("ticket.menu.regulation"),
      url: "#",
    },
    {
      label: t("ticket.menu.provision"),
      url: "#",
    },
    {
      label: t("ticket.menu.information"),
      url: "#",
    },
  ];

  const router = useRouter();

  const handleTutorial = () => {
    router.push("/tutorial");
  };

  const handleBuy = () => {
    router.push("/ticket/buy");
  };

  const handlePurchased = () => {
    router.push("/ticket/purchased");
  };

  return (
    <div className="flex flex-col  gap-6">
      {/* LEFT - MATCH */}
      <Card className="w-full ">
        <CardContent>
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-lg md:text-2xl font-bold">
              {PlayMatch.stadion}
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              {PlayMatch.tanggal
                .toLocaleDateString(lang, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                .toString()}
            </p>
          </div>

          {/* Teams */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
            {/* Team 1 */}
            <div className="flex flex-col items-center">
              <Image
                alt={PlayMatch.tim[0].label}
                src={`/playmatch/${PlayMatch.tim[0].logo}`}
                width={100}
                height={100}
                className="w-16 h-16 md:w-32 md:h-32 rounded-2xl"
              />
              <p className="text-sm md:text-lg font-bold mt-2 text-center">
                {PlayMatch.tim[0].label}
              </p>
            </div>

            {/* VS */}
            <span className="text-lg md:text-2xl font-bold text-gray-500">
              VS
            </span>

            {/* Team 2 */}
            <div className="flex flex-col items-center">
              <Image
                alt={PlayMatch.tim[1].label}
                src={`/playmatch/${PlayMatch.tim[1].logo}`}
                width={100}
                height={100}
                className="w-16 h-16 md:w-32 md:h-32 rounded-2xl"
              />
              <p className="text-sm md:text-lg font-bold mt-2 text-center">
                {PlayMatch.tim[1].label}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT - TICKET */}
      <Card className="w-full ">
        <CardContent>
          {/* MENU */}
          <div className="flex flex-wrap gap-3 mb-4">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="text-sm md:text-base font-semibold hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-lg md:text-2xl font-bold">
                {t("ticket.title")}
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                {t("ticket.match")}:{" "}
                {PlayMatch.tanggal
                  .toLocaleDateString(lang, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .toString()}
              </p>
            </div>

            <button
              onClick={handleTutorial}
              className="flex justify-between items-center text-sm md:text-base border-2 border-persebaya-accent rounded-xl bg-persebaya-primary-hover text-white px-4 py-2 hover:bg-persebaya-primary"
            >
              <span> {t("ticket.buttonTutorial")}</span>
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>
          </div>

          {/* BUTTON LIST */}
          <div className="space-y-3">
            <button
              className="flex justify-between items-center w-full text-white text-sm md:text-lg bg-persebaya-primary border-2 border-persebaya-accent px-4 py-3 md:px-5 md:py-4 rounded-xl hover:bg-persebaya-primary-hover"
              onClick={handleBuy}
            >
              <span>{t("ticket.buttonBuy")}</span>
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>

            <button
              className="flex justify-between items-center w-full text-white text-sm md:text-lg bg-persebaya-primary border-2 border-persebaya-accent px-4 py-3 md:px-5 md:py-4 rounded-xl hover:bg-persebaya-primary-hover"
              onClick={handlePurchased}
            >
              <span>{t("ticket.buttonPurchased")}</span>
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TicketPage;
