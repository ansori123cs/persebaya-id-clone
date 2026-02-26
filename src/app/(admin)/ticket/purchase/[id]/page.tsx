"use client";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

const PlayMatch = {
  stadion: "Gelora Bung Tomo",
  tanggal: "Senin 10 Maret 2026",
  tim: [
    { logo: "play1.png", label: "Persebaya Surabaya" },
    { logo: "play2.png", label: "Manchaster United" },
  ],
  ticketDipilih: "Ticket Gate VIP (West)",
};

const PurchaseTicketDetailPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const prefix = id?.split("-")[0];

  const componentMap: Record<string, ReactNode> = {
    T: <FansForm />,
    TR: <TouristForm />,
    K: <KomunitasForm />,
  };

  const RenderedComponent = (prefix && componentMap[prefix]) ?? (
    <div>Ticket tidak ditemukan</div>
  );

  return (
    <div className="p-2">
      <Card>
        <CardContent className="space-y-2 flex flex-col md:flex-row">
          <div className="w-full space-y-3  ">
            <h1 className="text-2xl text-center font-bold">
              {PlayMatch.stadion}
            </h1>
            <h1 className="text-lg text-center font-bold">
              {PlayMatch.tanggal}
            </h1>
            <button className="w-full border-4 rounded-lg border-persebaya-primary text-white bg-persebaya-accent text-xl font-bold hover:bg-persebaya-accent/50 cursor-pointer py-2">
              {PlayMatch.ticketDipilih}
            </button>
          </div>
          <div className="w-full">
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
          </div>
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent>{RenderedComponent}</CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent>Penukaran lokasi Tiket</CardContent>
      </Card>
    </div>
  );
};

export default PurchaseTicketDetailPage;

const FansForm = () => {
  return (
    <div>
      <div>Halaman Fans Form</div>
    </div>
  );
};

const TouristForm = () => {
  return (
    <div>
      <div>Halaman Turis Form</div>
    </div>
  );
};
const KomunitasForm = () => {
  return (
    <div>
      <div>Halaman Komunitas Form</div>
    </div>
  );
};
