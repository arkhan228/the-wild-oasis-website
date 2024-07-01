import Header from '@/app/_components/Header';

import '@/app/_styles/globals.css';

import { Josefin_Sans } from 'next/font/google';
import { ReservationProvider } from './_components/ReservationContext';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome | The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Indian Western Ghats, surrounded by the beautiful mountains and the wild forests.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} antialiased bg-primary-950 min-h-screen text-primary-100 flex flex-col relative`}
      >
        <Header />

        <div className='grid flex-1 px-8 py-12'>
          <main className='w-full mx-auto max-w-7xl '>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
