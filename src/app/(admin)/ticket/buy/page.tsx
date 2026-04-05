"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";
import { User } from "@/lib/type";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlayMatch = {
  stadion: "Gelora Bung Tomo",
  tanggal: new Date(),
  tim: [
    { logo: "play1.png", label: "Persebaya Surabaya" },
    { logo: "play2.png", label: "Manchaster United" },
  ],
};

const ticket = [
  {
    kategori: "fans",
    listTicket: [
      {
        kode: "T-001",
        namaTiket: "Ticket Gate VIP (West)",
        harga: 200000,
        statusTersedia: true,
        variant: "bg-persebaya-accent ",
      },
      {
        kode: "T-002",
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#1a1a1a] text-white ",
      },
      {
        kode: "T-003",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white ",
      },
      {
        kode: "T-004",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white ",
      },
      {
        kode: "T-005",
        namaTiket: "Ticket Gate Keluarga (West)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#BDBDBD] ",
      },
      {
        kode: "T-006",
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#810103] text-white ",
      },
    ],
  },
  {
    kategori: "tourist",
    listTicket: [
      {
        kode: "TR-007",
        namaTiket: "Ticket Gate VIP (West)",
        harga: 200000,
        statusTersedia: true,
        variant: "bg-persebaya-accent ",
      },
      {
        kode: "TR-008",
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#1a1a1a] text-white ",
      },
      {
        kode: "TR-009",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white ",
      },
      {
        kode: "TR-010",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white ",
      },
      {
        kode: "TR-011",
        namaTiket: "Ticket Gate Keluarga (West)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#BDBDBD] ",
      },
      {
        kode: "TR-012",
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#810103] text-white ",
      },
    ],
  },
  {
    kategori: "komunitas",
    listTicket: [
      {
        kode: "K-013",
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: true,
        variant: "bg-[#1a1a1a] text-white ",
      },
      {
        kode: "K-014",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white ",
      },
      {
        kode: "K-015",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white ",
      },
      {
        kode: "K-016",
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: true,
        variant: "bg-[#810103] text-white ",
      },
    ],
  },
];

const PurchaseTicketPage = () => {
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

  const [category, setCategory] = useState("fans");

  const handlePurcheTicketDetail = (ticket: string) => {
    router.push(`/ticket/buy/${ticket}`);
  };

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");

    if (!u || !u.id) {
      router.push("/login");
    } else if (u.categoryUserId === 1) {
      setCategory("fans");
    } else if (u.categoryUserId === 2) {
      setCategory("tourist");
    } else if (u.categoryUserId === 3) {
      setCategory("komunitas");
    }
  }, [router]);

  const handleTutorial = () => {
    router.push("/tutorial");
  };
  return (
    <div>
      {/* header */}
      <div className="flex md:flex-row  flex-col items-center justify-center">
        <Image
          alt="stadion"
          src="/stadionPurchase.png"
          width={500}
          height={500}
          className="w-full"
        />

        <div className=" w-full p-2 space-y-2">
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
                  className="flex justify-between items-center text-sm md:text-base border-2  rounded-xl bg-persebaya-primary text-white px-4 py-2 hover:bg-persebaya-primary-hover"
                >
                  <span> {t("ticket.buttonTutorial")}</span>
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
              </div>

              {/* BUTTON LIST */}
              <div className="space-y-3"></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* buy ticket */}
      <div className="mt-2">
        <div className="space-y-8">
          {ticket
            .filter((item) => item.kategori === category)
            .map((item, index) => (
              <Card key={index} className="shadow-2xl">
                <CardContent>
                  <h1 className="font-bold text-base uppercase text-center mb-2">
                    Category Ticket for {item.kategori}
                  </h1>
                  <div className="grid  md:grid-cols-2 grid-cols-1 gap-2">
                    {item.listTicket.map((ticket, index) => (
                      <button
                        className={`cursor-pointer p-2 flex justify-between items-center border-3 rounded-2xl bg-white hover:bg-black/20
 `}
                        onClick={() => handlePurcheTicketDetail(ticket.kode)}
                        key={index}
                        disabled={!ticket.statusTersedia}
                      >
                        <div className="w-3/4 font-bold flex items-center gap-2 text-sm md:text-base">
                          <div
                            className={`${ticket.variant} w-5 h-5 col-span-1 rounded-sm`}
                          />
                          <p className="col-span-6 text-start">
                            {ticket.namaTiket} - Rp
                            {ticket.harga.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div
                          className={`w-1/4 text-sm md:text-base m-1 px-2 border  text-white font-bold  rounded-xl ${ticket.statusTersedia ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {ticket.statusTersedia ? "Available" : "Sold Out"}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketPage;
