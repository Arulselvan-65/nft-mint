import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-zinc-950 text-white font-sans relative overflow-hidden">
          <Providers>
            <Navbar/>
            <main>
              {children}
            </main>
            <ToastContainer
              limit={3}
              position="top-right"
              className="toastContainer"
            />
          </Providers>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;