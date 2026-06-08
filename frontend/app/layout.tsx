import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";
import Head from 'next/head';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-zinc-950 text-white font-sans relative sm:overflow-hidden">
          <Providers>
            <Navbar />
            <main>
              {children}
            </main>
            <ToastContainer
              limit={3}
              position="top-right"
              className="toastContainer"
              theme="dark"
            />
          </Providers>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;