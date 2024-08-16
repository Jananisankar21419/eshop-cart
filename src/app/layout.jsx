import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";

const overusedgrotesk = localFont({
  src: [
    {
      path: "../../public/OverusedGrotesk-VF.woff2",
    },
  ],
  display: "swap",
  variable: "--font-overusedgrotesk",
  weight: "200 800",
});

export const metadata = {
  title: "e-shop",
  description: "shopping cart",
  robots: "index, follow",
  openGraph: {
    title: "e-shop",
    description: "shopping site",
    url: "https://e-shopcart.vercel.app",
    image: "/Images/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${overusedgrotesk.variable}`}>
      <body className="font-overusedgrotesk antialiased ">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
