/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { userRefresh } from "./features/Auth/authSlice";
import { injectStore } from "./interceptor/interceptor";

import AuthGuard from "./routes/protected/authguard";
import Root from "./routes/protected/root";
import RoleGuard from "./routes/protected/roleguard";
import Header from "./routes/protected/header";
import Default from "./routes/protected/default";
import Upload from "./routes/protected/upload";
import Entities from "./routes/protected/entities";
import Members from "./routes/protected/members";
import Cover from "./routes/static/cover";
import Login from "./routes/protected/login";
import About from "./routes/static/about";
injectStore(store);

store.dispatch(userRefresh());

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "authorized",
        element: <RoleGuard />,
        children: [
          {
            element: <Header />,
            children: [
              {
                element: <Root />,
                children: [
                  { path: "upload", element: <Upload /> },

                  { path: "entity", element: <Entities /> },

                  { path: "members", element: <Members /> },
                ],
              },
              {
                path: "default",
                element: <Default />,
              },
            ],
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Cover />,
        children: [
          {
            path: "about",
            element: <About />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <>404 - Page</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
