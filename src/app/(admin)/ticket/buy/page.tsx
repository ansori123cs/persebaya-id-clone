"use client";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlayMatch = {
  stadion: "Gelora Bung Tomo",
  tanggal: "Senin 10 Maret 2026",
  tim: [
    { logo: "play1.png", label: "Persebaya Surabaya" },
    { logo: "play2.png", label: "Manchaster United" },
  ],
};

const menu = [
  {
    label: "Persyaratan",
    url: "#",
  },
  {
    label: "Peraturan",
    url: "#",
  },
  {
    label: "Ketentuan",
    url: "#",
  },
  {
    label: "Informasi",
    url: "#",
  },
];

const ticket = [
  {
    kategori: "fans",
    listTicket: [
      {
        kode: "T-001",
        namaTiket: "Ticket Gate VIP (West)",
        harga: 200000,
        statusTersedia: true,
        variant: "bg-persebaya-accent border-persebaya-primary",
      },
      {
        kode: "T-002",
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#1a1a1a] text-white border-persebaya-accent",
      },
      {
        kode: "T-003",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white border-persebaya-accent",
      },
      {
        kode: "T-004",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white border-persebaya-accent",
      },
      {
        kode: "T-005",
        namaTiket: "Ticket Gate Keluarga (West)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#BDBDBD] border-persebaya-primary",
      },
      {
        kode: "T-006",
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#810103] text-white border-persebaya-accent",
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
        variant: "bg-persebaya-accent border-persebaya-primary",
      },
      {
        kode: "TR-008",
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#1a1a1a] text-white border-persebaya-accent",
      },
      {
        kode: "TR-009",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white border-persebaya-accent",
      },
      {
        kode: "TR-010",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white border-persebaya-accent",
      },
      {
        kode: "TR-011",
        namaTiket: "Ticket Gate Keluarga (West)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#BDBDBD] border-persebaya-primary",
      },
      {
        kode: "TR-012",
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#810103] text-white border-persebaya-accent",
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
        variant: "bg-[#1a1a1a] text-white border-persebaya-accent",
      },
      {
        kode: "K-014",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white border-persebaya-accent",
      },
      {
        kode: "K-015",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white border-persebaya-accent",
      },
      {
        kode: "K-016",
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: true,
        variant: "bg-[#810103] text-white border-persebaya-accent",
      },
    ],
  },
];

const PurchaseTicketPage = () => {
  const router = useRouter();

  const [category, setCategory] = useState("fans");

  const handlePurcheTicketDetail = (ticket: string) => {
    router.push(`/ticket/buy/${ticket}`);
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);

  useEffect(() => {
    if (!user || !user.id) {
      router.push("/login");
    } else if (user.categoryUserId === 1) {
      setCategory("fans");
    } else if (user.categoryUserId === 2) {
      setCategory("tourist");
    } else if (user.categoryUserId === 3) {
      setCategory("komunitas");
    }
  }, [router, user]);

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
                  {PlayMatch.tanggal}
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
                {menu.map((item) => (
                  <Link
                    key={item.label}
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
                    Pemesanan Tiket
                  </h1>
                  <p className="text-sm md:text-base text-gray-600">
                    Pertandingan {PlayMatch.tanggal}
                  </p>
                </div>

                <button
                  onClick={handleTutorial}
                  className="text-sm md:text-base border-2 border-persebaya-accent rounded-xl bg-persebaya-primary-hover text-white px-4 py-2 hover:bg-persebaya-primary"
                >
                  Cara Pemesanan
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
                        className={`cursor-pointer p-2 flex justify-between items-center border-3 rounded-2xl
 ${ticket.variant} `}
                        onClick={() => handlePurcheTicketDetail(ticket.kode)}
                        key={index}
                        disabled={!ticket.statusTersedia}
                      >
                        <p className="font-bold">
                          {ticket.namaTiket} - RP.
                          {ticket.harga.toLocaleString("id-ID")}
                        </p>
                        <div
                          className={`m-1 px-2 border border-persebaya-accent text-white font-bold  rounded-xl ${ticket.statusTersedia ? "bg-green-500" : "bg-red-500"}`}
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
