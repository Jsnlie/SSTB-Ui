import type { Metadata } from "next";
import "../styles/index.css";
import "../styles/fonts.css";
import "../styles/tailwind.css";
import "../styles/theme.css";
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "STT Seminari Theologia",
  description: "Institusi pendidikan teologi yang berkomitmen untuk membentuk pemimpin rohani yang berkualitas",
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
