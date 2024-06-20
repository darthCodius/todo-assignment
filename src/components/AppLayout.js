import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="text-sm lg:text-[16px] ">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
