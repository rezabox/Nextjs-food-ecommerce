import BootstrapClient from "@/components/libraries/Bootstrap";
import "./globals.css";
import Header from "@/components/header/header";
import Toastify from "@/components/libraries/Toastify"
import Footer from "@/components/footer/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header/>
        {children}
        <Footer/>
        <BootstrapClient/>
        <Toastify/>
      </body>
    </html>
  );
}
