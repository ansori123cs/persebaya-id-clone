"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
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
        Code: btoa("persebaya" + item.namaLengkap),
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
          <div className="mb-2">
            <h1 className="font-bold text-lg bg-persebaya-accent text-left p-1 inline-block">
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

              <p className="font-semibold">Code Ticket : {data?.Code}</p>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 col-span-2">
              <div className="grid grid-cols-2 gap-x-2">
                <p className="font-semibold mb-3 cols-span-2">Data Booked:</p>
                <p className="font-semibold"> </p>
                <p className="font-semibold">{t("purchased.form.email")}</p>
                <p className="font-semibold">{data?.DataDiri.email}</p>
                <p className="font-semibold">{t("purchased.form.name")}</p>
                <p className="font-semibold">{data?.DataDiri.namaLengkap}</p>
                <p className="font-semibold">{t("purchased.form.nik")}</p>
                <p className="font-semibold">{data?.DataDiri.nomorNik}</p>
                <p className="font-semibold">{t("purchased.form.phone")}</p>
                <p className="font-semibold">{data?.DataDiri.noTelp}</p>
                <p className="font-semibold">{t("purchased.form.birthDate")}</p>
                <p className="font-semibold">{data?.DataDiri.tanggalLahir}</p>
                <p className="font-semibold">{t("purchased.form.gender")}</p>
                <p className="font-semibold">{data?.DataDiri.jenisKelamin}</p>
                <p className="font-semibold">
                  {t("purchased.form.bookingDate")}
                </p>
                <p className="font-semibold">
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
              {data?.DataDiri.anggotaKomunitas.length === 0 ? (
                <></>
              ) : (
                <>
                  <p className="font-semibold">Tidak Ada Anggota Komunitas</p>

                  <div className="grid grid-cols-2 gap-x-2">
                    <p className="font-semibold mt-3 col-span-2">
                      Anggota Komunitas :
                    </p>
                    {data?.DataDiri.anggotaKomunitas.length === 0 ? (
                      <p className="font-semibold">
                        Tidak Ada Anggota Komunitas
                      </p>
                    ) : (
                      <div>
                        {data?.DataDiri.anggotaKomunitas.map((item, index) => (
                          <div className="grid grid-cols-2 gap-x-2" key={index}>
                            <p className="font-semibold">{item.namaLengkap}</p>
                            <p className="font-semibold">{item.nomorNik}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex items-end justify-end">
            <button
              className="p-2 rounded-xl text-white border border-persebaya-accent bg-persebaya-primary hover:bg-persebaya-primary/50 cursor-pointer"
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
