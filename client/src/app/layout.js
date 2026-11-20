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
  title: "About ARCA | Premium Real Estate & Architectural Development",

  description:
    "Discover ARCA, a design-led real estate development practice creating premium residential villas, masterplanned apartments, commercial spaces and turnkey developments through architectural excellence and construction precision.",

  keywords: [
    // Primary SEO Keywords
    "ARCA real estate developers",
    "premium real estate developers in India",
    "architectural development company",
    "real estate development company India",
    "luxury residential developers",
    "premium property developers",
    "residential and commercial development",
    "architectural design and development",
    "luxury villa developers in India",
    "commercial property developers India",
    "masterplanned residential apartments",
    "luxury residential projects",
    "high-end residential developments",
    "commercial real estate development",
    "IT parks and commercial campuses",
    "Grade A commercial developments",
    "turnkey construction services",
    "design and build company India",
    "luxury home construction",
    "custom villa construction",
    "premium architectural firm India",

    // Architecture & Construction Keywords
    "climate responsive architecture",
    "sustainable architectural development",
    "modern Indian architecture",
    "bioclimatic building design",
    "structural engineering and construction",
    "precast concrete construction",
    "precision construction engineering",
    "high-rise residential construction",
    "luxury building construction",
    "architectural planning and execution",
    "premium construction materials",
    "modern facade design",
    "computational facade optimization",
    "residential architectural design",
    "commercial architectural design",

    // Residential Development Keywords
    "luxury custom villas India",
    "bespoke luxury homes",
    "premium residential enclaves",
    "masterplanned apartments India",
    "luxury apartment development",
    "private estate development",
    "turnkey luxury homes",
    "custom residential architecture",
    "high-rise luxury apartments",
    "premium gated community development",

    // Commercial Development Keywords
    "commercial office space development",
    "Grade A office buildings India",
    "IT park development India",
    "corporate campus development",
    "LEED Platinum commercial buildings",
    "institutional real estate development",
    "commercial architecture and construction",

    // Location-Based Keywords
    "real estate developers Bengaluru",
    "real estate developers Hyderabad",
    "real estate developers Mumbai",
    "real estate developers NCR",
    "luxury villa developers Bengaluru",
    "premium residential developers India",
    "commercial developers India",

    // Brand & Long-Tail Keywords
    "ARCA architecture and development",
    "ARCA premium developments",
    "ARCA residential and commercial projects",
    "design-led real estate development",
    "architecture driven property development",
    "end-to-end real estate development",
    "integrated architecture engineering and construction",
    "premium turnkey development company",
    "responsible architectural development",
    "buildings designed for long-term value",
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
