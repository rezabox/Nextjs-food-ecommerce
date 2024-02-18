import BootstrapClient from "@/components/libraries/Bootstrap";
import "./globals.css";
import Header from "@/components/header/header";
import Toastify from "@/components/libraries/Toastify"

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header/>
        {children}
        <BootstrapClient/>
        <Toastify/>
      </body>
    </html>
  );
}
