import { Button, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { token, menu } from "../../features/Auth/authSlice";

import "./cover.css";

export default function Cover() {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useSelector(token);
  const protectedMenu = useSelector(menu);

  const [value, setValue] = useState(() => {
    const path = location.pathname.replace("/home", "");
    return path === ""
      ? false
      : path.startsWith("/")
      ? path.replace("/", "")
      : path;
  });

  let naviagationElement;

  const isValidUser = () => {
    let { pathname } = window.location;
    if (pathname === "/" || pathname === "/home") {
      if (!accessToken) {
        navigate("/");
      } else {
        if (protectedMenu?.length > 0) {
          const getPath = `/authorized/${protectedMenu[0]}`;
          // user refresh/enters url with no segments, like "/authorized". So we need to select the default menu
          naviagationElement = <Navigate to={getPath} />;
        } else {
          // user refresh/enters url with no segments, like "/authorized". But users dont have menu options.
          naviagationElement = <Navigate to="/" />;
        }
      }
    }
  };

  isValidUser();

  function handleChange(event, newValue) {
    setValue(() => newValue);
    navigate(newValue);
  }

  return (
    <>
      {naviagationElement}
      <header>
        <div className="top-bar"></div>
      </header>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/authorized/login", { state: "/authorized/" });
          }}
        >
          Login
        </Button>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          <Tab label="About" value="about" />
        </Tabs>
      </div>
      <Outlet />
    </>
  );
}
