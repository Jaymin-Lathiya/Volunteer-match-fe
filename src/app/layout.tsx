import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../../assets/scss/main.scss'
import '../../assets/scss/main.scss';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/fontawesome.css';
import '../../assets/css/animate.css';
import '../../assets/css/swiper.min.css';
import '../../assets/css/odometer.css';
import '../../assets/css/nice-select.css';
// import '../../assets/css/jquery-ui.min.css';
import '../../assets/css/magnific-popup.css';
import '../../assets/css/main.css';
import '../../styles/main.scss'
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster
          richColors={true}
          closeButton={true}
          duration={1000}
          position="top-right"
          className="toast-message-container"
        />
      </body>
    </html>
  );
}
