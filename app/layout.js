import BootstrapClient from "@/components/libraries/Bootstrap";
import "./globals.css";
import Header from "@/components/header/header";
import Toastify from "@/components/libraries/Toastify"
import Footer from "@/components/footer/Footer";
import Loader from "./loader/Loader";
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
       <AuthProvider>
        <Loader>
        <Header/>
        {children}
        <Footer/>
        <BootstrapClient/>
        <Toastify/>
        </Loader>
       </AuthProvider>
      </body>
    </html>
  );
}
