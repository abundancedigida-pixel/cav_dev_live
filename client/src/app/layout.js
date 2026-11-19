import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/utils/ScrollToTop";
import FloatingChat from "@/components/FloatingChat";
import { SmoothScroll } from "@/components/ui/Animations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Fitness Equipment Store in North Chennai | Zion Fitness Equipment",
  description:
    "Explore premium fitness equipment at Zion Fitness, North Chennai. Shop treadmills, strength machines, cardio equipment, home gym solutions and accessories.",
  keywords: [
    // Primary SEO Keywords
    "fitness equipment store in North Chennai",
    "fitness equipment showroom in North Chennai",
    "gym equipment in North Chennai",
    "gym equipment showroom Chennai",
    "fitness equipment Chennai",
    "gym equipment Chennai",
    "commercial gym equipment Chennai",
    "home gym equipment Chennai",
    "fitness equipment shop Chennai",
    "gym machines Chennai",
    "cardio equipment Chennai",
    "strength equipment Chennai",
    "treadmill showroom Chennai",
    "treadmill in North Chennai",
    "commercial treadmill Chennai",
    "home treadmill Chennai",
    "elliptical machine Chennai",
    "exercise bike Chennai",
    "spin bike Chennai",
    "home gym setup Chennai",
    "commercial gym setup Chennai",
    "gym accessories Chennai",
    "fitness accessories Chennai",
    "imported gym equipment Chennai",
    "premium fitness equipment Chennai",
    "gym equipment dealer Chennai",
    "fitness equipment dealer Chennai",
    "gym equipment supplier Chennai",
    "fitness equipment supplier Chennai",
    "gym equipment store near me",
    "fitness equipment near me",
    "Zion Fitness North Chennai",
    "Zion Fitness Chennai",

    // Long-Tail Keywords
    "best fitness equipment showroom in North Chennai",
    "best gym equipment store in North Chennai",
    "fitness equipment for home gym in Chennai",
    "commercial gym equipment supplier in Chennai",
    "premium gym equipment showroom in Chennai",
    "imported fitness equipment in Chennai",
    "treadmill and gym equipment showroom Chennai",
    "complete home gym equipment in Chennai",
    "gym equipment for commercial gym setup Chennai",
    "fitness equipment showroom near North Chennai",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="flex flex-col">
        <SmoothScroll>
          <ScrollToTop />
          <FloatingChat />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
