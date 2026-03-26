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
          <Card className="h-3/4">
            <CardContent>
              <h1 className="text-xl font-bold text-center">
                {PlayMatch.stadion}
              </h1>
              <h1 className="text-sm font-bold text-center">
                {PlayMatch.tanggal}
              </h1>
              <div className="flex justify-center items-center gap-x-2">
                <div className="space-y-3  items-center justify-center flex flex-col">
                  <div>
                    <Image
                      alt={PlayMatch.tim[0].label}
                      src={`/playmatch/${PlayMatch.tim[0].logo}`}
                      width={200}
                      className="w-32 h-32 shadow-sm rounded-2xl"
                      height={200}
                    />
                  </div>
                  <h1 className="text-xl font-bold text-center">
                    {PlayMatch.tim[0].label}
                  </h1>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-center">VS</h1>
                </div>
                <div className="space-y-3 items-center justify-center flex flex-col">
                  <div>
                    <Image
                      alt={PlayMatch.tim[1].label}
                      src={`/playmatch/${PlayMatch.tim[1].logo}`}
                      width={200}
                      className="w-32 h-32 shadow-sm rounded-2xl"
                      height={200}
                    />
                  </div>
                  <h1 className="text-xl font-bold text-center">
                    {PlayMatch.tim[1].label}
                  </h1>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between px-2">
            {menu.map((item) => (
              <div key={item.label} className="text-lg font-bold">
                <Link href={item.url}>{item.label}</Link>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleTutorial()}
            className="w-full text-xl border-2 border-persebaya-accent rounded-2xl bg-persebaya-primary-hover text-white p-3 cursor-pointer hover:bg-persebaya-primary"
          >
            Cara Pemesanan & Pembayaran
          </button>
        </div>
      </div>

      {/* buy ticket */}
      <div className="mt-2">
        <h1 className="text-xl font-bold text-left mb-2">
          Buy Ticket{" "}
          <span className="text-base font-normal">
            {PlayMatch.tanggal} - {PlayMatch.tim[0].label} VS{" "}
            {PlayMatch.tim[1].label}
          </span>
        </h1>
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
