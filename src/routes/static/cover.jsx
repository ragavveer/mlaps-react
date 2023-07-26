import { Button, Tabs, Tab, Icon } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { token, menu } from "../../features/Auth/authSlice";

import "./cover.css";

const heroIcon = (
  <Icon sx={{ marginTop: "-8px" }}>
    <img alt="hero" className="hero-icon" />
  </Icon>
);

export default function Cover() {
  const navigate = useNavigate();
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
    if (accessToken) {
      if (protectedMenu?.length > 0) {
        const getPath = `/authorized/${protectedMenu[0]}`;
        // user refresh/enters url with no segments, like "/authorized". So we need to select the default menu
        naviagationElement = <Navigate to={getPath} />;
      } else {
        // user refresh/enters url with no segments, like "/authorized". But users dont have menu options.
        naviagationElement = <Navigate to="/authorized/default" />;
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
        <div className="header">
          <div
            className="logo"
            onClick={() => {
              setValue(false);
              navigate("/home");
            }}
          ></div>
          <div className="actions">
            <Button
              sx={{
                textTransform: "none",
                fontWeight: 200,
              }}
              color="inherit"
              startIcon={heroIcon}
              onClick={() => {
                navigate("/authorized/login", { state: "/authorized/" });
              }}
            >
              Sign In
            </Button>
          </div>
          <div className="application-brand">Mobility Labs</div>
          <div>
            <Tabs
              sx={{ minHeight: "2.5rem", height: "2.5rem" }}
              value={value}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                sx={{
                  textTransform: "none",
                  minHeight: "2.5rem",
                  height: "2.5rem",
                }}
                label="About"
                value="about"
              />
            </Tabs>
          </div>
        </div>
      </header>
      <section className="content">
        <Outlet />
      </section>
    </>
  );
}
