import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="">
        <Navbar/>
        <div className="mx-5 md:mx-[40px] ">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
