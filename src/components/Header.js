import { NavLink } from "react-router-dom";
import { primaryBtn } from "../utils/constants";

const Header = () => {
  return (
    <div className="flex py-2 justify-between items-center shadow-lg bg-slate-50">
      <div className="h-fit w-20">
        <NavLink to="/">
          <img
            src="https://clipground.com/images/dashboard-logo.jpg"
            alt="logo"
            className="max-w-full max-h-full"
          />
        </NavLink>
      </div>
      <div>
        <ul className="flex items-center gap-5 mx-5">
          <NavLink className={primaryBtn} to="">
            Dashboard
          </NavLink>
          <NavLink className={primaryBtn} to="status">
            Status
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Header;
