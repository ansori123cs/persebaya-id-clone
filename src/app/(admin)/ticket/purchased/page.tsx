"use client";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Radio from "@/components/ui/Radio";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PlayMatch = {
  stadion: "Gelora Bung Tomo",
  tanggal: "Senin 10 Maret 2026",
  tim: [
    { logo: "play1.png", label: "Persebaya Surabaya" },
    { logo: "play2.png", label: "Manchaster United" },
  ],
};
const TicketPurchased = {
  qrCode: "/qrExample.png",
  nameTicked: "Ticked Gate VIP (West)",
  category: "FANS",
  code: "0011223344",
  dataDiri: {
    namaLengkap: "Maulana Faisal",
    email: "maulanafaisal123@gmail.com",
    nomorNik: "3524062804020001",
    noTelp: "085647852783",
    TanggalLahir: "28 maret 2002",
    JenisKelamin: "Laki - Laki",
    TanggalBooking: new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
};
const PurchasedTicketPage = () => {
  const [pembayaran, setPembayaran] = useState("");

  const router = useRouter();

  const handleTutorial = () => {
    router.push("/tutorial");
  };

  const handleBuy = () => {
    router.push("/ticket/purchase");
  };

  return (
    <div className="space-y-3">
      <Card>
        <CardContent>
          <div>
            <h1 className="text-2xl font-bold text-start">
              {TicketPurchased.nameTicked}
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
              {TicketPurchased.nameTicked} Kategori {TicketPurchased.category}
            </h1>
          </div>
          <div className="flex">
            <div className="w-3/4 flex justify-center items-center">
              <div className="w-1/4">
                <Image
                  alt="qrCode"
                  src={TicketPurchased.qrCode}
                  width={200}
                  height={200}
                />
                <p className="font-semibold">
                  Code Ticket : {TicketPurchased.code}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-3">Data Booked</p>
                <div className="grid grid-cols-2 gap-x-2">
                  <p className="font-semibold">Email </p>
                  <p className="font-semibold">
                    {TicketPurchased.dataDiri.email}
                  </p>
                  <p className="font-semibold">Nama Lengkap </p>
                  <p className="font-semibold">
                    {TicketPurchased.dataDiri.namaLengkap}
                  </p>
                  <p className="font-semibold">Nomor KTP/NIK </p>
                  <p className="font-semibold">
                    {TicketPurchased.dataDiri.nomorNik}
                  </p>
                  <p className="font-semibold">No Telp / WA </p>
                  <p className="font-semibold">
                    {TicketPurchased.dataDiri.noTelp}
                  </p>
                  <p className="font-semibold">Tanggal Lahir </p>
                  <p className="font-semibold">
                    {TicketPurchased.dataDiri.TanggalLahir}
                  </p>
                  <p className="font-semibold">Jenis kelamin </p>
                  <p className="font-semibold">
                    {TicketPurchased.dataDiri.JenisKelamin}
                  </p>
                  <p className="font-semibold">Tanggal Booking </p>
                  <p className="font-semibold">
                    {TicketPurchased.dataDiri.TanggalBooking}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/4 flex items-end justify-end">
              <button className="p-2 rounded-xl text-white border border-persebaya-accent bg-persebaya-primary hover:bg-persebaya-primary/50 cursor-pointer">
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
