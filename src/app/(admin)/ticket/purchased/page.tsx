"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PlayMatch = {
  stadion: "Gelora Bung Tomo",
  tanggal: new Date(),
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
  const { lang, t } = useLanguage();
  const [data, setData] = useState<TicketPurchased>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const item = JSON.parse(localStorage.getItem("formTicket")!) as FormData;
      setLoading(true);
      setData({
        QrCode: "/qrExample.png",
        Code: btoa("persebaya" + item.nomorNik),
        CategoryTicket: item.ticket.name,
        NameTicket: item.ticket.name,
        DataDiri: item,
        Keterangan: {
          BoodkedDate: PlayMatch.tanggal
            .toLocaleDateString(lang, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            .toString(),
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
    <div className="flex flex-col  gap-6">
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

      {/* payment method */}
      <Card>
        <CardHeader>
          <h1 className="font-bold text-xl">{t("purchased.title")}</h1>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-persebaya-accent w-5 h-5"></div>
            <h1 className="font-bold text-lg  text-left p-1 inline-block">
              {data?.NameTicket} Kategori{" "}
              {data?.DataDiri.anggotaKomunitas.length === 0
                ? "Fans"
                : "Komunitas"}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
            <div className="flex flex-col justify-center  items-center w-full col-span-2">
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

              <p className="font-semibold min-w-0 w-full break-all ">
                Code Ticket : {data?.Code}ahvhavhjavjhavhavhjavjav
              </p>
            </div>
            <div className="grid  grid-cols-1 gap-4 col-span-2 gap-y-4 md:gap-y-0">
              <div className="">
                <p className="font-semibold col-span-3 mb-3">Data Booked:</p>

                <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3 mt-5 md:mt-0">
                  <p className="font-medium min-w-35">
                    NIK
                    <span className="hidden md:inline"> :</span>
                  </p>

                  <p className="text start font-medium  w-full break-all">
                    {data?.DataDiri.nomorNik}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3 mt-5 md:mt-0">
                  <p className="font-medium min-w-35">
                    Email
                    <span className="hidden md:inline"> :</span>
                  </p>
                  <p className="text start font-medium  w-full break-all">
                    {data?.DataDiri.email}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3 mt-5 md:mt-0">
                  <p className="font-medium min-w-35">
                    Name
                    <span className="hidden md:inline"> :</span>
                  </p>
                  <p className="text start font-medium  w-full break-all">
                    {data?.DataDiri.namaLengkap}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3 mt-5 md:mt-0">
                  <p className="font-medium min-w-35">
                    Phone
                    <span className="hidden md:inline"> :</span>
                  </p>
                  <p className="text start font-medium  w-full break-all">
                    {data?.DataDiri.noTelp}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3 mt-5 md:mt-0">
                  <p className="font-medium min-w-35">
                    Birth Date
                    <span className="hidden md:inline"> :</span>
                  </p>
                  <p className="text start font-medium  w-full break-all">
                    {data?.DataDiri.tanggalLahir}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3 mt-5 md:mt-0">
                  <p className="font-medium min-w-35">
                    Gender
                    <span className="hidden md:inline"> :</span>
                  </p>
                  <p className="text start font-medium  w-full break-all">
                    {data?.DataDiri.jenisKelamin}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3 mt-5 md:mt-0">
                  <p className="font-medium min-w-35">
                    Booking Date
                    <span className="hidden md:inline"> :</span>
                  </p>
                  <p className="text start font-medium  w-full break-all">
                    {PlayMatch.tanggal.toLocaleDateString(lang, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {data?.DataDiri.anggotaKomunitas.length === 0 ? (
                <div></div>
              ) : (
                <div className="grid md:grid-cols-[150px_10px_1fr] gap-y-2 mt-5">
                  <p className="font-medium">Anggota Komunitas</p>
                  <p className="text-center hidden md:block">:</p>
                  <div className="flex flex-col gap-2">
                    {data?.DataDiri.anggotaKomunitas.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-2 wordbreak-words"
                      >
                        <p className="font-medium">{item.namaLengkap}</p>
                        <p className="font-medium">{item.nomorNik}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`w-full flex items-end justify-end mt-5 md:mt-3${data?.DataDiri.anggotaKomunitas.length === 0 ? " md:mt-3" : ""}`}
          >
            <button
              className="p-2 rounded-xl text-white border   bg-persebaya-primary hover:bg-persebaya-primary/50 cursor-pointer"
              onClick={handleSendEmail}
            >
              {t("purchased.buttonSendToEmail")}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default PurchasedTicketPage;
