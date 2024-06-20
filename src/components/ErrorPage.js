import { useNavigate } from "react-router";
import { primaryBtn } from "../utils/constants";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleErrorNavigation = () => {
    navigate("/");
  };

  return (
    <div className="absolute flex flex-col gap-5 justify-center items-center inset-0">
      <p>Page Not Found!</p>
      <button className={primaryBtn} onClick={handleErrorNavigation}>
        Please click here to go to Dashboard!
      </button>
    </div>
  );
};

export default ErrorPage;
