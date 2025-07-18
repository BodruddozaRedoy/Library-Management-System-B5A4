import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="mx-5 md:mx-[40px] flex-1">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
