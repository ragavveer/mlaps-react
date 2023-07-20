/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./routes/login";
import AuthGuard from "./routes/authguard";
import Root from "./root";
import RoleGuard from "./routes/roleguard";
import { AuthProvider } from "./context/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        element: <RoleGuard />,
        children: [
          {
            index: true,
            element: <Root />,
            // loader: RootLoader,
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
        // action: LoginAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
