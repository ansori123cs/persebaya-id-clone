"use client";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

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

const menuVA = [
  { label: "mandiri", src: "/payment/va-mandiri.png" },
  { label: "bca", src: "/payment/va-bca.png" },
  { label: "bni", src: "/payment/va-bni.png" },
  { label: "visa", src: "/payment/va-visa.jpg" },
];

const menuEwallet = [
  { label: "shopeepay", src: "/payment/ewallet-shopeepay.png" },
  { label: "dana", src: "/payment/ewallet-dana.png" },
  { label: "gopay", src: "/payment/ewallet-gopay.png" },
];

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
type ticketDetail = {
  name: string;
  price: number;
  fee: number;
  total: number;
};

const PaymentPage = () => {
  const [pembayaran, setPembayaran] = useState("");
  const [formDataBuyer, setFormDataBuyer] = useState<FormData>();
  const [ticketPrice, setTicketPrice] = useState<ticketDetail>({
    name: "",
    fee: 5000,
    price: 0,
    total: 0,
  });

  useEffect(() => {
    const load = async () => {
      const localItem = localStorage.getItem("user");
      const deserialize = JSON.parse(localItem!) as FormData;
      setTicketPrice({
        fee: 5000,
        price: deserialize.ticket.harga,
        total:
          (deserialize.anggotaKomunitas.length + 1) *
          (deserialize.ticket.harga + 5000),
        name: deserialize.ticket.name,
      });
      setFormDataBuyer(deserialize);
    };
    load();
  }, []);

  const router = useRouter();

  const handleBuy = () => {
    if (!pembayaran?.trim()) {
      alert("Silahkan pilih Metode Pembayaran / Please Select Payment Method");
      return;
    }

    alert("Pembayaran Berhasil");

    setTimeout(() => {
      router.push("/ticket");
    }, 1000);
  };

  return (
    <div className="flex flex-col  gap-6">
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

      {/* Price */}
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold text-star mb-3">
            Detil Harga / Price Detail
          </h1>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <h1 className="text-lg font-bold text-start">
                {ticketPrice.name}
              </h1>
              <h1 className="text-lg font-bold text-start">
                Rp :{ticketPrice.price.toLocaleString("id-ID")} X{" "}
                {formDataBuyer?.anggotaKomunitas.length! + 1} orang
              </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <h1 className="text-lg font-bold text-start mb-5">Service fee</h1>
              <h1 className="text-lg font-bold text-start mb-5">
                Rp :{ticketPrice.fee.toLocaleString("id-ID")}
              </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <h1 className="text-lg font-bold text-start">Total Harga</h1>
              <h1 className="text-lg font-bold text-start">
                Rp :{ticketPrice.total.toLocaleString("id-ID")}
              </h1>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* payment method */}
      <Card>
        <CardContent className="flex md:flex-row gap-6 flex-col">
          <div className="w-full">
            <h1 className="text-lg font-bold text-start">Virtual Account</h1>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {menuVA.map((item, index) => (
                <div
                  className="flex items-center justify-center space-x-2"
                  key={index}
                >
                  <input
                    type="radio"
                    checked={pembayaran === item.label}
                    onChange={() => setPembayaran(item.label)}
                  />
                  <Image
                    alt={item.label}
                    src={item.src}
                    height={100}
                    width={100}
                  />
                </div>
              ))}
            </div>
            <h1 className="text-lg font-bold text-start">E - Wallet</h1>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {menuEwallet.map((item, index) => (
                <div
                  className="flex items-center justify-center space-x-2"
                  key={index}
                >
                  <input
                    type="radio"
                    checked={pembayaran === item.label}
                    onChange={() => setPembayaran(item.label)}
                  />
                  <Image
                    alt={item.label}
                    src={item.src}
                    height={100}
                    width={100}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex items-end justify-end">
            <button
              className="p-2 rounded-xl text-white border border-persebaya-accent bg-persebaya-primary hover:bg-persebaya-primary/50 cursor-pointer"
              onClick={handleBuy}
            >
              Proceed To Payment
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default PaymentPage;
