import { Outlet } from "react-router-dom";
import NavScroll from "../../Components/website/Navbar/Navbar";
import Footer from "../../Components/website/Footer/Footer";

export default function Website() {
  return (
    <>
      <NavScroll />
      <Outlet />
      <Footer />
    </>
  );
}
