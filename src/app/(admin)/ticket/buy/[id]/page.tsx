"use client";
import { Card, CardContent } from "@/components/ui/Card";
import Radio from "@/components/ui/Radio";
import { useLanguage } from "@/context/LanguageContext";
import { mockCommunity, mockCommunityMembers } from "@/lib/mockData";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

// --- shared form types -------------------------------------------------

interface FansFormData {
  namaLengkap: string;
  email: string;
  nomorNik: string;
  noTelp: string;
  tanggalLahir: string;
  jenisKelamin: "pria" | "wanita";
}

interface AnggotaKomunitas {
  key: string;
  namaLengkap: string;
  nomorNik: string;
}

interface KomunitasFormData extends FansFormData {
  anggotaKomunitas: AnggotaKomunitas[];
}

export type AnyFormData = FansFormData | KomunitasFormData;

interface FormProps<T> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

// we can reuse FormProps<FansFormData> etc when typing individual components

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
        variant: "bg-[#1a1a1a] text-white  ",
      },
      {
        kode: "T-003",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white  ",
      },
      {
        kode: "T-004",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white  ",
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
        variant: "bg-[#810103] text-white  ",
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
        variant: "bg-[#1a1a1a] text-white  ",
      },
      {
        kode: "TR-009",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white  ",
      },
      {
        kode: "TR-010",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white  ",
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
        variant: "bg-[#810103] text-white  ",
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
        variant: "bg-[#1a1a1a] text-white  ",
      },
      {
        kode: "K-014",
        namaTiket: "Ticket Gate Timur (East)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#005a2c] text-white  ",
      },
      {
        kode: "K-015",
        namaTiket: "Ticket Gate Jhoner (West)",
        harga: 150000,
        statusTersedia: false,
        variant: "bg-[#0000FF] text-white  ",
      },
      {
        kode: "K-016",
        namaTiket: "Ticket Gate Selatan (South)",
        harga: 100000,
        statusTersedia: false,
        variant: "bg-[#810103] text-white  ",
      },
    ],
  },
];

const tempatPenukaran = [
  {
    label: "Persebaya Store Komplek-Jl.Slamet No.11.Surabaya",
    key: "selamet",
    checked: false,
  },
  {
    label:
      "Persebaya Store (AZAWEAR Store) Sutos-Jl.Hayam Wuruk No.6. Surabaya",
    key: "azawear",
    checked: false,
  },
  {
    label:
      "Persebaya Store Semolo-Ruko Manyar Garden Regency. Jl.Nginden Semolo. Surabaya",
    key: "manyar",
    checked: false,
  },
  {
    label: "Persebaya Store Sidoarjo-Jl.Jenggolo No. 76. Sidoarjo",
    key: "sda",
    checked: false,
  },
];

type TicketDipilih = {
  name: string;
  variant: string;
  harga: number;
};

const PurchaseTicketDetailPage = () => {
  const { lang, t } = useLanguage();
  const [penukaran, setPenukaran] = useState("");
  const [ticketDipilih, setTicketDipilih] = useState<TicketDipilih>({
    name: "",
    variant: "",
    harga: 0,
  });

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    const set = () => {
      if (!id) return;

      let kategoriIndex = -1;
      const kode = id.toString();

      if (kode.startsWith("TR")) {
        kategoriIndex = 1; // tourist
      } else if (kode.startsWith("T")) {
        kategoriIndex = 0; // fans
      } else if (kode.startsWith("K")) {
        kategoriIndex = 2; // komunitas
      }

      if (kategoriIndex === -1) return;

      const selectedTicket = ticket[kategoriIndex]?.listTicket.find(
        (item) => item.kode === kode,
      );

      if (selectedTicket) {
        setTicketDipilih({
          name: selectedTicket.namaTiket,
          variant: selectedTicket.variant,
          harga: selectedTicket.harga,
        });
      }
    };
    set();
  }, []);

  const prefix = id?.split("-")[0];

  const [formData, setFormData] = useState<AnyFormData>({
    namaLengkap: "",
    email: "",
    nomorNik: "",
    noTelp: "",
    tanggalLahir: "",
    jenisKelamin: "pria",
    anggotaKomunitas: [],
  } as AnyFormData);

  const componentMap: Record<string, ReactNode> = {
    T: (
      <FansForm
        formData={formData as FansFormData}
        setFormData={
          setFormData as React.Dispatch<React.SetStateAction<FansFormData>>
        }
      />
    ),
    TR: (
      <TouristForm
        formData={formData as FansFormData}
        setFormData={
          setFormData as React.Dispatch<React.SetStateAction<FansFormData>>
        }
      />
    ),
    K: (
      <KomunitasForm
        formData={formData as KomunitasFormData}
        setFormData={
          setFormData as React.Dispatch<React.SetStateAction<KomunitasFormData>>
        }
      />
    ),
  };

  const RenderedComponent = (prefix && componentMap[prefix]) ?? (
    <div>Ticket tidak ditemukan</div>
  );

  const handlePayment = (e: TicketDipilih) => {
    const newData = {
      ...formData,
      ticket: e,
    };

    setFormData(newData);

    localStorage.removeItem("formTicket");
    localStorage.setItem("formTicket", JSON.stringify(newData));
    router.push(`/ticket/buy/${id}/payment`);
  };

  return (
    <div className="p-2">
      <Card>
        <CardContent className="space-y-2 flex flex-col md:flex-row">
          <div className="flex flex-col w-full  space-y-3  ">
            <h1 className="text-2xl text-center font-bold">
              {PlayMatch.stadion}
            </h1>
            <h1 className="text-lg text-center font-bold">
              {PlayMatch.tanggal
                .toLocaleDateString(lang, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                .toString()}
            </h1>
            <div
              className={` w-full flex justify-center items-center  text-xl font-bold`}
            >
              <div className={`${ticketDipilih.variant} w-5 h-5 mx-1`}></div>
              <p>{ticketDipilih.name}</p>
            </div>
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
          </div>
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent>{RenderedComponent}</CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent>
          <h1 className="text-xl font-bold">
            Ticket Location Exchange / Lokasi Penukaran Tiket
          </h1>
          <div className="space-y-1 mt-2">
            {tempatPenukaran.map((item, index) => (
              <Radio
                checked={penukaran === item.key}
                label={item.label}
                onChange={() => {
                  setPenukaran(item.key);
                }}
                key={item.key}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              className="text-white  rounded-xl border   bg-persebaya-primary hover:bg-persebaya-primary/50 cursor-pointer px-4 py-2"
              type="button"
              onClick={() => handlePayment(ticketDipilih)}
            >
              Continue
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseTicketDetailPage;

// Fans form no longer manages its own state; the parent page holds the data.
const FansForm = ({ formData, setFormData }: FormProps<FansFormData>) => {
  // sanitize helpers can be shared, but we redefine them locally for clarity
  const sanitizeString = (value: string): string => {
    return value
      .replace(/</g, "")
      .replace(/>/g, "")
      .replace(/script/gi, "")
      .replace(/on\w+=/gi, "")
      .trim();
  };

  const sanitizeByField = (name: string, value: string): string => {
    const sanitized = sanitizeString(value);

    switch (name) {
      case "namaLengkap":
        return sanitized.replace(/[^a-zA-Z\s]/g, "");

      case "email":
        return sanitized.toLowerCase();

      case "nomorNik":
        return sanitized.replace(/\D/g, "");

      case "noTelp":
        return sanitized.replace(/\D/g, "");

      case "jenisKelamin":
        return sanitized as "pria" | "wanita";

      default:
        return sanitized;
    }
  };
  const _unusedSanitizeByField = (name: string, value: string) => {
    const sanitized = sanitizeString(value);

    switch (name) {
      case "namaLengkap":
        return sanitized.replace(/[^a-zA-Z\s]/g, "");

      case "email":
        return sanitized
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );

      case "nomorNik":
        return sanitized.replace(/\D/g, "");

      case "noTelp":
        return sanitized.replace(/\D/g, "");

      case "jenisKelamin":
        return sanitized as "pria" | "wanita";

      default:
        return sanitized;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const sanitizedValue = sanitizeByField(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleKelamin = (value: "pria" | "wanita") => {
    setFormData((prev) => ({
      ...prev,
      jenisKelamin: value,
    }));
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Data Pemesan Kategori Fans</h1>

      <form className="space-y-3 mt-3">
        {/* Nomor KTP */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="nomorNik" className="md:w-1/4 w-full font-medium">
            Nomor KTP
          </label>
          <input
            id="nomorNik"
            name="nomorNik"
            type="text"
            maxLength={16}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>
        {/* Nama Lengkap */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="namaLengkap" className="md:w-1/4 w-full font-medium">
            Nama Lengkap
          </label>
          <input
            id="namaLengkap"
            name="namaLengkap"
            type="text"
            maxLength={100}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="email" className="md:w-1/4 w-full font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={100}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Nomor Telp */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="noTelp" className="md:w-1/4 w-full font-medium">
            Nomor Telephone / WhatsApp
          </label>
          <input
            id="noTelp"
            name="noTelp"
            type="tel"
            maxLength={15}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Tanggal Lahir */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="tanggalLahir" className="md:w-1/4 w-full font-medium">
            Tanggal Lahir
          </label>
          <input
            id="tanggalLahir"
            name="tanggalLahir"
            type="date"
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Jenis Kelamin */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <span className="md:w-1/4 w-full font-medium">Jenis Kelamin</span>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="pria"
              checked={formData.jenisKelamin === "pria"}
              onChange={() => handleKelamin("pria")}
            />
            <label htmlFor="pria">Pria</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="wanita"
              checked={formData.jenisKelamin === "wanita"}
              onChange={() => handleKelamin("wanita")}
            />
            <label htmlFor="wanita">Wanita</label>
          </div>
        </div>
      </form>
    </div>
  );
};

const TouristForm = ({ formData, setFormData }: FormProps<FansFormData>) => {
  // no local state; values are controlled by parent

  const sanitizeString = (value: string): string => {
    return value
      .replace(/</g, "")
      .replace(/>/g, "")
      .replace(/script/gi, "")
      .replace(/on\w+=/gi, "")
      .trim();
  };

  const sanitizeByField = (name: string, value: string): string => {
    const sanitized = sanitizeString(value);

    switch (name) {
      case "namaLengkap":
        return sanitized.replace(/[^a-zA-Z\s]/g, "");

      case "email":
        return sanitized.toLowerCase();

      case "nomorNik":
        return sanitized.replace(/\D/g, "");

      case "noTelp":
        return sanitized.replace(/\D/g, "");

      case "jenisKelamin":
        return sanitized as "pria" | "wanita";

      default:
        return sanitized;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const sanitizedValue = sanitizeByField(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleKelamin = (value: "pria" | "wanita") => {
    setFormData((prev) => ({
      ...prev,
      jenisKelamin: value,
    }));
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Tourist Category Order Data</h1>

      <form className="space-y-3 mt-3">
        {/* ID Number */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="nomorNik" className="md:w-1/4 w-full font-medium">
            National ID Number
          </label>
          <input
            id="nomorNik"
            name="nomorNik"
            type="text"
            placeholder="3575673587990004"
            maxLength={16}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>
        {/* Full Name */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="namaLengkap" className="md:w-1/4 w-full font-medium">
            Full Name
          </label>
          <input
            id="namaLengkap"
            name="namaLengkap"
            type="text"
            placeholder="Maulana Faisal Fardani"
            maxLength={100}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="email" className="md:w-1/4 w-full font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            maxLength={100}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="noTelp" className="md:w-1/4 w-full font-medium">
            Phone Number / WhatsApp
          </label>
          <input
            id="noTelp"
            name="noTelp"
            type="tel"
            placeholder="081234567890"
            maxLength={15}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="tanggalLahir" className="md:w-1/4 w-full font-medium">
            Date of Birth
          </label>
          <input
            id="tanggalLahir"
            name="tanggalLahir"
            type="date"
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <span className="md:w-1/4 w-full font-medium">Gender</span>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="male"
              checked={formData.jenisKelamin === "pria"}
              onChange={() => handleKelamin("pria")}
            />
            <label htmlFor="male">Male</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="female"
              checked={formData.jenisKelamin === "wanita"}
              onChange={() => handleKelamin("wanita")}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </form>
    </div>
  );
};

// KomunitasForm uses props; shared types defined at top
const KomunitasForm = ({
  formData,
  setFormData,
}: FormProps<KomunitasFormData>) => {
  // helpers as before, sanitization identical to other forms

  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const community = mockCommunity.find((e) => e.leaderUserId === localUser.id);

  const members =
    mockCommunityMembers.filter((m) => m.communityId === community?.id) || [];

  const handleAddAnggota = () => {
    const current = (formData as KomunitasFormData).anggotaKomunitas;
    if (current.length < members.length) {
      const newItem: AnggotaKomunitas = {
        key: crypto.randomUUID(),
        namaLengkap: "",
        nomorNik: "",
      };
      setFormData((prev) => ({
        ...(prev as KomunitasFormData),
        anggotaKomunitas: [...current, newItem],
      }));
    } else {
      alert("Maksimum Anggota Tercapai");
    }
  };

  const handleRemoveAnggota = (id: string) => {
    setFormData((prev) => ({
      ...(prev as KomunitasFormData),
      anggotaKomunitas: (prev as KomunitasFormData).anggotaKomunitas.filter(
        (f) => f.key !== id,
      ),
    }));
  };

  const sanitizeString = (value: string): string => {
    return value
      .replace(/</g, "")
      .replace(/>/g, "")
      .replace(/script/gi, "")
      .replace(/on\w+=/gi, "")
      .trim();
  };

  const sanitizeByField = (name: string, value: string): string => {
    const sanitized = sanitizeString(value);

    switch (name) {
      case "namaLengkap":
        return sanitized.replace(/[^a-zA-Z\s]/g, "");

      case "email":
        return sanitized.toLowerCase();

      case "nomorNik":
        return sanitized.replace(/\D/g, "");

      case "noTelp":
        return sanitized.replace(/\D/g, "");

      case "jenisKelamin":
        return sanitized as "pria" | "wanita";

      default:
        return sanitized;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const sanitizedValue = sanitizeByField(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleKelamin = (value: "pria" | "wanita") => {
    setFormData((prev) => ({
      ...prev,
      jenisKelamin: value,
    }));
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Data Pemesan Kategori Komunitas</h1>

      <form className="space-y-3 mt-3">
        {/* Nomor KTP */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="nomorNik" className="md:w-1/4 w-full font-medium">
            Nomor KTP
          </label>
          <input
            id="nomorNik"
            name="nomorNik"
            type="text"
            maxLength={16}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Nama Lengkap */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="namaLengkap" className="md:w-1/4 w-full font-medium">
            Nama Lengkap
          </label>
          <input
            id="namaLengkap"
            name="namaLengkap"
            type="text"
            maxLength={100}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="email" className="md:w-1/4 w-full font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={100}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Nomor Telp */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="noTelp" className="md:w-1/4 w-full font-medium">
            Nomor Telephone / WhatsApp
          </label>
          <input
            id="noTelp"
            name="noTelp"
            type="tel"
            maxLength={15}
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Tanggal Lahir */}
        <div className="flex flex-col md:flex-row items-center">
          <label htmlFor="tanggalLahir" className="md:w-1/4 w-full font-medium">
            Tanggal Lahir
          </label>
          <input
            id="tanggalLahir"
            name="tanggalLahir"
            type="date"
            onChange={handleChange}
            className="md:w-3/4 w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Jenis Kelamin */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <span className="md:w-1/4 w-full font-medium">Jenis Kelamin</span>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="pria"
              checked={formData.jenisKelamin === "pria"}
              onChange={() => handleKelamin("pria")}
            />
            <label htmlFor="pria">Pria</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="wanita"
              checked={formData.jenisKelamin === "wanita"}
              onChange={() => handleKelamin("wanita")}
            />
            <label htmlFor="wanita">Wanita</label>
          </div>
        </div>
        {/* Data Anggota */}
        <Card className="p-4 border shadow-2xl">
          <CardContent>
            <div className="space-y-3">
              {/* Rows */}
              {(formData as KomunitasFormData).anggotaKomunitas.map(
                (item, index) => (
                  <div
                    className="grid md:grid-cols-4 grid-cols-1 gap-4 items-center"
                    key={item.key}
                  >
                    {/* Kolom Nama */}
                    {members.length > 0 && (
                      <div className="block md:flex items-center justify-center gap-2 col-span-3">
                        <span className="w-5">{index + 1}.</span>
                        <label className="text-sm font-medium text-heading w-36">
                          Pilih Anggota
                        </label>
                        <select
                          id="members"
                          className=" w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                          onChange={(e) => {
                            const selectedNik = e.target.value;
                            const selectedMember = members.find(
                              (m) => m.nik === selectedNik,
                            );
                            if (selectedMember) {
                              setFormData((prev) => ({
                                ...(prev as KomunitasFormData),
                                anggotaKomunitas: (
                                  prev as KomunitasFormData
                                ).anggotaKomunitas.map((a) =>
                                  a.key === item.key
                                    ? {
                                        ...a,
                                        namaLengkap: selectedMember.name,
                                        nomorNik: selectedMember.nik,
                                      }
                                    : a,
                                ),
                              }));
                            }
                          }}
                        >
                          <option selected>Pilih Anggota</option>
                          {members.map((member) => (
                            <option key={member.id} value={member.nik}>
                              {member.name} - {member.nik}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemoveAnggota(item.key)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-500/70 text-white rounded-lg"
                        type="button"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>

          <button
            onClick={handleAddAnggota}
            className="mt-4 px-4 py-2 bg-persebaya-primary hover:bg-persebaya-primary/70 text-white rounded-lg"
            type="button"
          >
            Tambah Anggota
          </button>
        </Card>
      </form>
    </div>
  );
};
