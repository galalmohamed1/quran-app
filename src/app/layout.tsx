import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Providers } from "@/components/Provider";
import Alert from "@/components/UI/Alert";
import { Amiri_Quran } from "next/font/google";

const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-amiri-quran",
});

export const metadata = {
  title: "Quran App",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (
                  localStorage.theme === 'dark' ||
                  (!('theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
                ) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>

      <body className={amiriQuran.variable}>
        <section className="bg-white dark:bg-slate-900 transition-colors duration-200">
          <Navbar />
        </section>

        <main className="h-[calc(100%-70px)]">
          <section className="h-full block lg:flex">
            <Providers>
              <Sidebar />

              <div className="w-[calc(100%-32px)] mx-auto">
                {children}
              </div>

              
            </Providers>
          </section>
        </main>
      </body>
    </html>
  );
}