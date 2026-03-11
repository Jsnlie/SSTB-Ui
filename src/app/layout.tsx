import type { Metadata } from "next";
import "../styles/index.css";
import "../styles/fonts.css";
import "../styles/tailwind.css";
import "../styles/theme.css";
import Layout from "../components/Layout";

export const metadata: Metadata = {
  title: "Sekolah TInggi Teologi Bandung",
  icons: "/Sekolah Tinggi Teologi Bandung.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
