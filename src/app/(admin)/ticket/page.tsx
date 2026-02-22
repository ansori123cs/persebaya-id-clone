'use client';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PlayMatch = {
  stadion: 'Gelora Bung Tomo',
  tanggal: 'Senin 10 Maret 2026',
  tim: [
    { logo: 'play1.png', label: 'Persebaya Surabaya' },
    { logo: 'play2.png', label: 'Manchaster United' },
  ],
};

const menu = [
  {
    label: 'Persyaratan',
    url: '#',
  },
  {
    label: 'Peraturan',
    url: '#',
  },
  {
    label: 'Ketentuan',
    url: '#',
  },
  {
    label: 'Informasi',
    url: '#',
  },
];
const TicketPage = () => {
  const router = useRouter();

  const handleTutorial = () => {
    router.push('/tutorial');
  };

  return (
    <div className='space-y-3'>
      <Card>
        <CardContent>
          <div>
            <h1 className='text-3xl font-bold text-center'>{PlayMatch.stadion}</h1>
            <h1 className='text-lg font-bold text-center'>{PlayMatch.tanggal}</h1>
          </div>
          <div className='flex justify-center items-center gap-x-72'>
            <div className='space-y-3  items-center justify-center flex flex-col'>
              <div>
                <Image alt={PlayMatch.tim[0].label} src={`/playmatch/${PlayMatch.tim[0].logo}`} width={100} className='w-32 h-32' height={100} />
              </div>
              <h1 className='text-xl font-bold text-center'> {PlayMatch.tim[0].label}</h1>
            </div>
            <div>
              <h1 className='text-3xl font-bold text-center'>VS</h1>
            </div>
            <div className='space-y-3 items-center justify-center flex flex-col'>
              <div>
                <Image alt={PlayMatch.tim[1].label} src={`/playmatch/${PlayMatch.tim[1].logo}`} width={100} className='w-32 h-32' height={100} />
              </div>
              <h1 className='text-xl font-bold text-center'> {PlayMatch.tim[1].label}</h1>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className='flex space-x-2'>
            {menu.map((item) => (
              <div key={item.label} className='text-lg font-bold'>
                <Link href={item.url}>{item.label}</Link>
              </div>
            ))}
          </div>
          <div className='flex w-full justify-between mb-24'>
            <div>
              <h1 className='text-3xl font-bold'>Pemesanan Tiket</h1>
              <h1 className='text-xl'>Pertandingan {PlayMatch.tanggal}</h1>
            </div>
            <button onClick={() => handleTutorial()} className='text-xl border-2 border-persebaya-accent rounded-2xl bg-persebaya-primary-hover text-white p-3 cursor-pointer hover:bg-persebaya-primary'>
              Cara Pemesanan & Pembayaran
            </button>
          </div>
          <div className='space-y-4 mt-3'>
            <button className='flex justify-between w-full border-2 p text-white text-xl bg-persebaya-primary border-persebaya-accent p-5 rounded-2xl shadow-2xl hover:bg-persebaya-primary-hover cursor-pointer'>
              <div>Buy Ticket</div>
              <ChevronDown className='w-5 h-5 -rotate-90' />
            </button>
            <button className='flex justify-between w-full border-2 p text-white text-xl bg-persebaya-primary border-persebaya-accent p-5 rounded-2xl shadow-2xl hover:bg-persebaya-primary-hover cursor-pointer'>
              <div>Ticket Purchased</div> <ChevronDown className='w-5 h-5 -rotate-90' />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TicketPage;
