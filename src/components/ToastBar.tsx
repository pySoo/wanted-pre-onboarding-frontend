import { ToastContainer } from "react-toastify";

export default function ToastBar() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      theme="colored"
    />
  );
}
