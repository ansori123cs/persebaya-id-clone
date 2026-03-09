"use client";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Radio from "@/components/ui/Radio";
import { ChevronDown } from "lucide-react";
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

type FormData = {
  namaLengkap: string;
  email: string;
  nomorNik: string;
  noTelp: string;
  tanggalLahir: string;
  jenisKelamin: string;
  anggotaKomunitas: AnggotaKomunitas[];
  ticket: { name: string; variant: string; harga: number };
};

interface AnggotaKomunitas {
  key: string;
  namaLengkap: string;
  nomorNik: string;
}

type TicketPurchased = {
  QrCode: string;
  NameTicket: string;
  CategoryTicket: string;
  Code: string;
  DataDiri: FormData;
  Keterangan: {
    BoodkedDate: string;
  };
};

const PurchasedTicketPage = () => {
  const [pembayaran, setPembayaran] = useState("");
  const [data, setData] = useState<TicketPurchased>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const item = JSON.parse(localStorage.getItem("user")!) as FormData;
      setLoading(true);
      setData({
        QrCode: "/qrExample.png",
        Code: btoa("persebaya" + item.namaLengkap),
        CategoryTicket: item.ticket.name,
        NameTicket: item.ticket.name,
        DataDiri: item,
        Keterangan: {
          BoodkedDate: new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      });
    };
    load();
    setLoading(false);
  }, []);

  const router = useRouter();

  const handleSendEmail = () => {
    alert("Bukti Sudah Dikirim Ke Email");
  };

  return (
    <div className="space-y-3">
      <Card>
        <CardContent>
          <div>
            <h1 className="text-2xl font-bold text-start">
              {data?.NameTicket}
            </h1>
            <h1 className="text-2xl font-bold text-center">
              {PlayMatch.stadion}
            </h1>
            <h1 className="text-lg font-bold text-center">
              {PlayMatch.tanggal}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-x-72">
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

      {/* payment method */}
      <Card>
        <CardHeader>
          <h1 className="font-bold text-lg">Ticket Purchased</h1>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <h1 className="font-bold text-lg bg-persebaya-accent text-left p-1 inline-block">
              {data?.NameTicket} Kategori {data?.CategoryTicket}
            </h1>
          </div>
          <div className="flex">
            <div className="w-3/4 flex justify-center items-center">
              <div className="w-1/4">
                {loading ? (
                  <h1 className="w-full h-full justify-center items-center text-9xl">
                    Loading...
                  </h1>
                ) : (
                  <Image
                    alt="qrCode"
                    src={data?.QrCode! ?? "/qrExample.png"}
                    width={200}
                    height={200}
                  />
                )}

                <p className="font-semibold">Code Ticket : {data?.Code}</p>
              </div>
              <div>
                <p className="font-semibold mb-3">Data Booked</p>
                <div className="grid grid-cols-2 gap-x-2">
                  <p className="font-semibold">Email </p>
                  <p className="font-semibold">{data?.DataDiri.email}</p>
                  <p className="font-semibold">Nama Lengkap </p>
                  <p className="font-semibold">{data?.DataDiri.namaLengkap}</p>
                  <p className="font-semibold">Nomor KTP/NIK </p>
                  <p className="font-semibold">{data?.DataDiri.nomorNik}</p>
                  <p className="font-semibold">No Telp / WA </p>
                  <p className="font-semibold">{data?.DataDiri.noTelp}</p>
                  <p className="font-semibold">Tanggal Lahir </p>
                  <p className="font-semibold">{data?.DataDiri.tanggalLahir}</p>
                  <p className="font-semibold">Jenis kelamin </p>
                  <p className="font-semibold">{data?.DataDiri.jenisKelamin}</p>
                  <p className="font-semibold">Tanggal Booking </p>
                  <p className="font-semibold">
                    {data?.Keterangan.BoodkedDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/4 flex items-end justify-end">
              <button
                className="p-2 rounded-xl text-white border border-persebaya-accent bg-persebaya-primary hover:bg-persebaya-primary/50 cursor-pointer"
                onClick={handleSendEmail}
              >
                Kirim Bukti Ke Email
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default PurchasedTicketPage;
