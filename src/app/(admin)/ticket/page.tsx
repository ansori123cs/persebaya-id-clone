'use client';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

const PlayMatch = {
  stadion: 'Gelora Bung Tomo',
  tanggal: 'Senin 12 Maret 2026',
  tim: [
    { logo: 'url', label: 'Persebaya Surabaya' },
    { logo: 'url', label: 'Manchaster United' },
  ],
};

const TicketPage = () => {
  const router = useRouter();

  const handleTutorial = () => {
    router.push('/tutorial');
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <>Ticket page</>
        </CardHeader>
        <CardContent>
          <div>
            <Button onClick={() => handleTutorial()}>Cara Pemesanan & Pembayaran </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TicketPage;
