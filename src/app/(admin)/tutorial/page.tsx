'use client';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function TutorialPembelianTicket() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className='min-h-screen '>
      <div className='max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8'>
        <Button className='cursor-pointer' onClick={handleBack}>
          Kembali
        </Button>
        <h1 className='text-3xl font-bold mb-6 text-center'>Tutorial Pembelian Ticket</h1>

        <div className='space-y-8'>
          {/* Step 1 */}
          <div>
            <h2 className='text-xl font-semibold mb-2'>1. Login / Registrasi</h2>
            <p className='text-gray-600'>Login terlebih dahulu menggunakan akun yang sudah terdaftar. Jika belum memiliki akun, silakan lakukan registrasi terlebih dahulu melalui halaman pendaftaran.</p>
          </div>

          {/* Step 2 */}
          <div>
            <h2 className='text-xl font-semibold mb-2'>2. Klik Menu Ticket</h2>
            <p className='text-gray-600'>
              Setelah berhasil login, klik menu <strong>Ticket</strong> pada navigasi utama.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h2 className='text-xl font-semibold mb-2'>3. Klik Tombol Buy Ticket</h2>
            <p className='text-gray-600'>
              Pada halaman Ticket, klik tombol <strong>Buy Ticket</strong>
              untuk memulai proses pembelian.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <h2 className='text-xl font-semibold mb-2'>4. Pilih Kategori Ticket</h2>
            <p className='text-gray-600 mb-2'>Pilih salah satu dari 3 kategori ticket berikut:</p>
            <ul className='list-disc list-inside text-gray-600 space-y-1'>
              <li>
                <strong>Ticket Fans</strong>
              </li>
              <li>
                <strong>Ticket Turis</strong>
              </li>
              <li>
                <strong>Ticket Komunitas</strong>
              </li>
            </ul>
          </div>

          {/* Step 5 */}
          <div>
            <h2 className='text-xl font-semibold mb-2'>5. Isi Data Pemesan</h2>
            <p className='text-gray-600'>Setelah memilih kategori ticket:</p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>Isi data diri pemesan.</li>
              <li>Pilih lokasi penukaran tiket.</li>
              <li>
                Jika memilih <strong>Ticket Komunitas</strong>, isi data diri penanggung jawab serta data anggota komunitas.
              </li>
            </ul>
          </div>

          {/* Step 6 */}
          <div>
            <h2 className='text-xl font-semibold mb-2'>6. Pilih Metode Pembayaran</h2>
            <p className='text-gray-600'>Pilih metode pembayaran yang tersedia, kemudian lanjutkan proses pembayaran sesuai instruksi yang diberikan.</p>
          </div>

          {/* Step 7 */}
          <div>
            <h2 className='text-xl font-semibold mb-2'>7. Ticket Berhasil Dibeli</h2>
            <p className='text-gray-600'>Setelah pembayaran berhasil:</p>
            <ul className='list-disc list-inside text-gray-600 mt-2 space-y-1'>
              <li>
                Ticket dapat dilihat pada menu <strong>Ticket Purchased</strong>.
              </li>
              <li>Jika ingin menukar ticket fisik, datang ke lokasi penukaran yang telah dipilih sebelumnya.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
