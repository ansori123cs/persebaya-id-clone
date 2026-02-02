import React from "react";
import { TrendingUp, Users, BarChart3, Activity } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import Image from "next/image";

interface NewsProperty {
  name: string;
  src: string;
  alt: string;
}

interface MatchProperty {
  team: TeamProperty[];
  date: string;
  time?: string; // optional
  venue?: string; // optional
}

interface TeamProperty {
  teamName: string;
  src: string;
}

const todaysMatch: MatchProperty[] = [
  {
    date: "2 February 2026",
    team: [
      {
        teamName: "Persebaya Surabaya",
        src: "/persebaya.png", // Ganti dengan path lokal jika ada
      },
      {
        teamName: "Persib Bandung",
        src: "/persib.png",
      },
    ],
    time: "19:30 WIB",
    venue: "Gelora Bung Tomo Stadium",
  },
  {
    date: "20 February 2026",
    team: [
      {
        teamName: "Persib Bandung",
        src: "/persib.png",
      },
      {
        teamName: "Persebaya Surabaya",
        src: "/persebaya.png",
      },
    ],
    time: "20:00 WIB",
    venue: "Siliwangi Stadium",
  },
];

const news: NewsProperty[] = [
  { name: "Stadion", alt: "Stadion Persebaya", src: "/img1.png" },
  { name: "Pemain", alt: "Pemain Persebaya", src: "/img2.png" },
  { name: "Pemain Terbaik", alt: "Pemain Terbaik Persebaya", src: "/img3.png" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Main Content Grid dengan Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gambar Utama (index 0) */}
        {news.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {news[0].name}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="relative h-52 md:h-72 lg:h-80 rounded-lg overflow-hidden">
                <Image
                  src={news[0].src}
                  fill
                  alt={news[0].alt}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-3 text-sm text-gray-600">{news[0].alt}</p>
            </CardContent>
          </Card>
        )}

        {/* Gambar-gambar Lainnya */}
        <div className="space-y-6">
          {news.slice(1).map((item, index) => (
            <Card key={`${item.name}-${index}`}>
              <CardContent className="p-4">
                <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={item.src}
                    fill
                    alt={item.alt}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">{item.alt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/*Match Card*/}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Matches</h2>

        {todaysMatch.map((match, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-persebaya-accent transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                {match.date}
              </span>
              <span className="bg-persebaya-bg text-persebaya-accent text-xs font-bold px-3 py-1 rounded-full">
                Liga 1
              </span>
            </div>

            <div className="flex items-center justify-between">
              {/* Home Team */}
              <div className="flex items-center gap-3 w-2/5">
                <div className="w-10 h-10 relative">
                  <Image
                    src={match.team[0].src}
                    alt={match.team[0].teamName}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-gray-900 text-sm truncate">
                  {match.team[0].teamName}
                </span>
              </div>

              {/* VS */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">VS</div>
                {match.time && (
                  <div className="text-xs text-gray-500 mt-1">{match.time}</div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-3 w-2/5 justify-end">
                <span className="font-medium text-gray-900 text-sm truncate text-right">
                  {match.team[1].teamName}
                </span>
                <div className="w-10 h-10 relative">
                  <Image
                    src={match.team[1].src}
                    alt={match.team[1].teamName}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {match.venue && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 truncate">
                  🏟️ {match.venue}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
