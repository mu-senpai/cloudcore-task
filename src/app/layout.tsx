import { Poppins } from 'next/font/google';
import LayoutWrapper from '@/component/LayoutWrapper';
import Navbar from '@/component/common/Navbar';
import Footer from '@/component/common/Footer';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'], 
  display: 'swap',
});

export const metadata = {
  title: "CloudCore Store",
  description: "Your trusted store for premium jackets and hoodies. Designed for style, comfort, and durability.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-[1440px]:w-[90rem] mx-auto`}>
        <LayoutWrapper>
          <Navbar />
          {children}
          <Footer />
        </LayoutWrapper>
      </body>
    </html>
  );
}