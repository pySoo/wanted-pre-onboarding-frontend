import ToastBar from "components/ToastBar";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  return (
    <div>
      <ToastBar />
      <Outlet />
    </div>
  );
}
