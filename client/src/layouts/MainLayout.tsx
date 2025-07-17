import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
        <Navbar/>
        <div className="m-5 md:m-[60px]">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
