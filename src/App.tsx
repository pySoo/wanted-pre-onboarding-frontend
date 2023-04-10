import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { path } from "routes/path";
import TodoList from "pages/TodoList";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Welcome from "pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Welcome /> },
      { path: path.signup, element: <SignUp /> },
      { path: path.signin, element: <SignIn /> },
      { path: path.todo, element: <TodoList /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
