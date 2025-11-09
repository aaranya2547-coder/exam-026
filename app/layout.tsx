import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExamHotel - จองที่พักออนไลน์",
  description: "ExamHotel - จองที่พักสไตล์มินิมอล ทั่วประเทศไทย 77 จังหวัด รีสอร์ท โรงแรม โฮมสเตย์ ราคาดี บริการเป็นเลิศ",
  keywords: "จองโรงแรม, จองที่พัก, รีสอร์ท, โรงแรม, ExamHotel, ที่พักไทย, จองออนไลน์",
  authors: [{ name: "ExamHotel Team" }],
  openGraph: {
    title: "ExamHotel - จองที่พักออนไลน์",
    description: "จองที่พักสไตล์มินิมอล ทั่วประเทศไทย 77 จังหวัด",
    url: "http://examhotel",
    siteName: "ExamHotel",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
