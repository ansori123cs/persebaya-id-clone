"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  SquareUser,
  Dock,
  HouseHeart,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { Member } from "@/lib/type";
import { useLanguage } from "@/context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isCommunityLeader, setIsCommunityLeader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    no: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    address: "",
    agreeTerms: false,
  });

  const [community, setCommunity] = useState("");

  const { t, toggleLang, lang } = useLanguage();

  const [members, setMembers] = useState<Member[]>([{ name: "", nik: "" }]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (
      !formData.fullName ||
      !formData.no ||
      !formData.phone ||
      !formData.username ||
      !formData.password ||
      !formData.address
    ) {
      setError("Semua field harus diisi");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Anda harus setuju dengan syarat dan ketentuan");
      return;
    }

    const formDataFinal = new FormData();

    formDataFinal.append("fullName", formData.fullName);

    if (community) {
      const communityWithMembers = {
        nameCommunity: community,
        membersCommunity: members,
      };
    }

    setIsLoading(true);

    // Simulasi register - dalam production, ini akan ke API
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(formData));
      community !== ""
        ? localStorage.setItem(
            "community",
            JSON.stringify({ community, members }),
          )
        : "";
      router.push("/berita");
    }, 800);
  };

  const toggleCommunityMemberForm = () => {
    setIsCommunityLeader((prev) => !prev);
  };

  const handleMember = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    const updated = [...members];
    updated[index] = {
      ...updated[index],
      [name]: value,
    };

    setMembers(updated);
  };

  const handleAdd = () => {
    members.length >= 20
      ? setError("Maksimal anggota komunitas adalah 20")
      : setMembers((prev) => [...prev, { name: "", nik: "" }]);
  };

  const handleDelete = (index: number) => {
    if (members.length <= 3) {
      setError("Minimal 3 anggota komunitas harus ada");
      return; // proteksi minimal 1
    }

    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const CommunityMemberForm = ({
    index,
    data,
    onChange,
    onDelete,
  }: {
    index: number;
    data: { name: string; nik: string };
    onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (index: number) => void;
  }) => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Full Name Field */}
          <div className="my-3">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <div className="relative">
              <SquareUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id={`name`}
                name={`name`}
                type="text"
                placeholder="Maulana Faisal Fardani"
                value={data.name}
                onChange={(e) => onChange(index, e)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* no Field */}
          <div className="my-3">
            <label
              htmlFor="no"
              className="block text-sm font-medium text-gray-700"
            >
              NIK
            </label>
            <div className="relative">
              <Dock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id={`nik`}
                name={`nik`}
                type="text"
                placeholder="3572456653766352"
                value={data.nik}
                onChange={(e) => onChange(index, e)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end mt-2">
          <Button
            onClick={() => onDelete(index)}
            variant="danger"
            type="button"
          >
            Hapus
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F7] px-4">
      <Card
        className={`mb-6 w-full bg-white rounded-2xl p-1 mt-2 ${isCommunityLeader && lang === "id" ? "max-w-8xl" : "max-w-3xl"}`}
      >
        <CardContent className="pt-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-2xl my-4 ">
              <Image
                src="/logo-small.png"
                width={800}
                height={800}
                alt="logo-persebaya"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("register.title")}
            </h1>
          </div>

          {/* Register Card */}
          <div className="mb-6 ">
            <div className="pt-6">
              <form onSubmit={handleSubmit} className="">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <div
                  className={
                    isCommunityLeader && lang === "id"
                      ? "md:grid grid-cols-2 gap-3"
                      : ""
                  }
                >
                  <div>
                    <div>
                      <div className="mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          {t("login.language")}
                        </label>
                        <Select onValueChange={(value) => toggleLang(value)}>
                          <SelectTrigger className="w-52">
                            <SelectValue placeholder="Language / Bahasa">
                              {lang === "en" ? "English" : "Indonesia"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="id">Indonesia</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Baris 1: Full Name & no */}
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
                        {/* Full Name Field */}
                        <div className="my-3">
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {t("register.fullName-label")}
                          </label>
                          <div className="relative">
                            <SquareUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              id="fullName"
                              name="fullName"
                              type="text"
                              placeholder={t("register.fullName-placeholder")}
                              value={formData.fullName}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* no Field */}
                        <div className="my-3">
                          <label
                            htmlFor="no"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {t("register.no-label")}
                          </label>
                          <div className="relative">
                            <Dock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              id="no"
                              name="no"
                              type="text"
                              placeholder={t("register.no-placeholder")}
                              value={formData.no}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Baris 2: Username & Password */}
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
                        {/* Username Field */}
                        <div className="my-3">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              id="username"
                              name="username"
                              type="text"
                              placeholder="faisal123cs"
                              value={formData.username}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* Password Field */}
                        <div className="my-3">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={handleChange}
                              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="grid grid-cols-1 ">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="my-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("register.phoneNumber-label")}
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder={t("register.phoneNumber-placeholder")}
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Address Field */}
                      <div className="my-3">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("register.address-label")}
                        </label>
                        <div className="relative">
                          <HouseHeart className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea
                            id="address"
                            name="address"
                            placeholder={t("register.address-placeholder")}
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                            rows={4}
                          />
                        </div>
                      </div>
                      {/* Is Leader Community*/}
                      {lang === "id" ? (
                        <div className="flex items-start gap-2">
                          <input
                            id="agreeTerms"
                            name="agreeTerms"
                            type="checkbox"
                            checked={isCommunityLeader}
                            onChange={toggleCommunityMemberForm}
                            className="mt-1 rounded border-gray-300"
                          />
                          <label
                            htmlFor="agreeTerms"
                            className="text-sm text-gray-600"
                          >
                            Daftas Sebagai Ketua Komunitas
                          </label>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {isCommunityLeader && lang === "id" && (
                    <div className="mb-6 w-full space-y-2 bg-white rounded-2xl p-3">
                      <h1>Form Komunitas ( Min 3 anggota, Max 20 anggota )</h1>

                      {/* Community NameField  */}
                      <div className="my-3">
                        <label
                          htmlFor="community"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama Komunitas
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="community"
                            name="community"
                            type="text"
                            placeholder="Komunitas Bonek ....."
                            value={community}
                            onChange={(e) => setCommunity(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="p-2 space-y-2">
                        {members.map((member, index) => (
                          <CommunityMemberForm
                            key={index}
                            index={index}
                            data={member}
                            onChange={handleMember}
                            onDelete={handleDelete}
                          />
                        ))}
                      </div>

                      <Button onClick={handleAdd} type="button">
                        Tambah Anggota Komunitas
                      </Button>
                    </div>
                  )}
                </div>
                {/* Terms Agreement */}
                <div className="flex items-start gap-2">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 rounded border-gray-300"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                    {t("register.agree")}{" "}
                    <Link
                      href="#"
                      className="text-persebaya-link underline hover:text-blue-700 font-medium"
                    >
                      {t("register.term")}
                    </Link>{" "}
                    {t("register.and")}{" "}
                    <Link
                      href="#"
                      className="text-persebaya-link underline hover:text-blue-700 font-medium"
                    >
                      {t("register.policy")}
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  className="w-full mt-6"
                >
                  {t("register.button")}
                </Button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-start">
            <p className="text-gray-600 text-sm">
              {t("register.have-account")}{" "}
              <Link
                href="/login"
                className="text-persebaya-link underline hover:text-blue-700 font-semibold"
              >
                {t("register.here")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
