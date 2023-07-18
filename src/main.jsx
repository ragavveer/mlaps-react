/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import Document from "./routes/documents";
import Login from "./routes/login";
import Logout from "./routes/logout";
import ChangePassword from "./routes/change-password";
import AuthGuard from "./routes/authguard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: "logout",
            element: <Logout></Logout>,
          },
          {
            path: "entities",
            element: <Document></Document>,
          },
          {
            path: "users",
            element: <Document></Document>,
          },
          {
            path: "changepassword",
            element: <ChangePassword></ChangePassword>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
