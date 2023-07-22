/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./routes/login";
import AuthGuard from "./routes/authguard";
import Root from "./routes/root";
import RoleGuard from "./routes/roleguard";
import { Provider } from "react-redux";
import store from "./redux/store";
import { injectStore } from "./interceptor/interceptor";
import { refresh } from "./redux/action/LoginAction";
import Header from "./routes/header";
import Default from "./routes/default";
import Upload from "./routes/upload";
import Entities from "./routes/entities";
import Members from "./routes/members";
injectStore(store);

store.dispatch(refresh());

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "",
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
            element: <Login></Login>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
