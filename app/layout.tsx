import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/ui/Providers";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s — OpenPath DS",
    default: "OpenPath Design System",
  },
  description:
    "명료함, 확장성, 자립성 위에 설계된 오픈패스 교육 브랜드 디자인 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <div className="flex pt-14 min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-[220px] min-w-0">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
