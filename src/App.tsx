import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { path } from "routes/path";
import TodoList from "pages/TodoList";

const router = createBrowserRouter([
  {
    path: path.signup,
    element: <SignUp />,
  },
  {
    path: path.signin,
    element: <SignIn />,
  },
  {
    path: path.todo,
    element: <TodoList />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
