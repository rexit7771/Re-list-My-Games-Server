import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/components/navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
        <ToastContainer />
      </div>
    </>
  );
}
