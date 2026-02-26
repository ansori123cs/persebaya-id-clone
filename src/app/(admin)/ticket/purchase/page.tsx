"use client";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        namaTiket: "Ticket Gate VIP (West)",
        harga: 200000,
        statusTersedia: true,
      },
      {
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Keluarga (West)",
        harga: 100000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
      },
    ],
  },
  {
    kategori: "tourist",
    listTicket: [
      {
        namaTiket: "Ticket Gate VIP (West)",
        harga: 200000,
        statusTersedia: true,
      },
      {
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Keluarga (West)",
        harga: 100000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
      },
    ],
  },
  {
    kategori: "komunitas",
    listTicket: [
      {
        namaTiket: "Ticket Gate Utara (North)",
        harga: 100000,
        statusTersedia: true,
      },
      {
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
      },
      {
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
      },
    ],
  },
];

const PurchaseTicketPage = () => {
  const router = useRouter();

  // const getGateBg = (namaTiket) => {
  //   if (namaTiket.toLowerCase().includes("west"))
  //     return "bg-yellow-400 hover:bg-yellow-500";

  //   if (namaTiket.toLowerCase().includes("north"))
  //     return "bg-gray-800 text-white hover:bg-gray-900";

  //   if (namaTiket.toLowerCase().includes("east"))
  //     return "bg-green-700 text-white hover:bg-green-800";

  //   if (namaTiket.toLowerCase().includes("south"))
  //     return "bg-red-700 text-white hover:bg-red-800";

  //   return "bg-white";
  // };

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
          width={200}
          height={200}
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
                  <h1 className="text-3xl font-bold text-center">VS</h1>
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
        <div className="space-y-2">
          {ticket.map((item, index) => (
            <Card key={index}>
              <CardContent>
                <h1 className="font-bold text-base uppercase text-center mb-2">
                  Category Ticket for {item.kategori}
                </h1>
                <div className="grid  md:grid-cols-2 grid-cols-1 gap-2">
                  {item.listTicket.map((ticket, index) => (
                    <button
                      className={`cursor-pointer p-2 flex justify-between items-center border-2 border-persebaya-primary rounded-2xl
  ${
    ticket.namaTiket.toLowerCase().includes("west")
      ? "bg-yellow-400 hover:bg-yellow-500"
      : ticket.namaTiket.toLowerCase().includes("north")
        ? "bg-gray-800 text-white hover:bg-gray-900"
        : ticket.namaTiket.toLowerCase().includes("east")
          ? "bg-green-700 text-white hover:bg-green-800"
          : ticket.namaTiket.toLowerCase().includes("south")
            ? "bg-red-700 text-white hover:bg-red-800"
            : "bg-white"
  }`}
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
