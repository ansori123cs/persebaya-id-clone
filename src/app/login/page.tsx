"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import Image from "next/image";
import { userMockData } from "@/lib/mockData";

import id from "../register/id.json";
import en from "../register/en.json";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const translations = {
    id,
    en,
  };

  const [lang, setLang] = useState<"id" | "en">("en");
  const toggleLang = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[lang];

    keys.forEach((k) => {
      value = value?.[k];
    });

    return value || key;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (!username || !password) {
        setError("username dan password harus diisi");
        setIsLoading(false);
        return;
      }

      const userLogin = userMockData.find(
        (user) => user.username === username && user.password === password,
      );

      if (!userLogin) {
        setError("username atau password salah");
        setIsLoading(false);
        return;
      }

      // success login
      localStorage.setItem("user", JSON.stringify(userLogin));
      setIsLoading(false);
      router.push("/berita");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F7] px-4">
      <Card className="mb-6 w-full max-w-2xl bg-white rounded-2xl p-3">
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
              {t("login.title")}
            </h1>
          </div>

          {/* Login Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  {/* EN */}
                  <span
                    className={`text-sm ${
                      lang === "en"
                        ? "font-semibold text-black"
                        : "text-gray-400"
                    }`}
                  >
                    English
                  </span>

                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={toggleLang}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                      lang === "en" ? "bg-gray-300" : "bg-green-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        lang === "en" ? "translate-x-0" : "translate-x-6"
                      }`}
                    />
                  </button>

                  {/* ID */}
                  <span
                    className={`text-sm ${
                      lang === "id"
                        ? "font-semibold text-black"
                        : "text-gray-400"
                    }`}
                  >
                    Indonesia
                  </span>
                </div>
                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-base font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="username"
                      type="text"
                      placeholder="demo123cs"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persebaya-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-base font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-600">{t("login.remember")}</span>
                  </label>
                  <Link
                    href="#"
                    className="text-persebaya-link hover:text-blue-700 font-medium"
                  >
                    {t("login.forgot-password")}
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      {t("login.dont-have-account")}{" "}
                      <Link
                        href="/register"
                        className="text-persebaya-link hover:text-blue-700 font-semibold underline"
                      >
                        {t("login.here")}
                      </Link>
                    </p>
                  </div>
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={isLoading}
                    className="md:w-1/2 "
                  >
                    {t("login.button")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className=" p-2 bg-persebaya-bg rounded-lg border border-gray-300">
            <p className="text-xs font-semibold text-persebaya-text mb-1">
              Demo Account:
            </p>

            <div className="space-y-1">
              {userMockData.map((user) => (
                <div
                  key={user.id}
                  className="p-1 rounded border border-gray-200 "
                >
                  <p className="text-xs text-persebaya-text">
                    <span className="font-medium">Username:</span>{" "}
                    {user.username}
                  </p>
                  <p className="text-xs text-persebaya-text">
                    <span className="font-medium">Password:</span>{" "}
                    {user.password}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
