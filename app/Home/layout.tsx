import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';
import Link from 'next/link';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FleetRewards",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="/Home" className="flex title-font font-medium items-center mb-4 md:mb-0" style={{color: "#4CAF50"}}>
              <span className="ml-3 text-xl">FleetRewards</span>
            </a>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
              <Link href="/Home/FeedbackForm" className="mr-5">Feedback Form</Link>
              <Link href="/Home/Survey" className="mr-5">FleetOptics Survey</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
