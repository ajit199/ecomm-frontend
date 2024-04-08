import "./App.css";
import Header from "./components/Header/Header";
import Category from "./pages/Category/Category";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/categories",
    element: <Category />,
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
