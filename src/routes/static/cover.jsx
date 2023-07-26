import { Button, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Cover() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(() => {
    const path = location.pathname.replace("/home", "");
    return path === ""
      ? false
      : path.startsWith("/")
      ? path.replace("/", "")
      : path;
  });

  function handleChange(event, newValue) {
    setValue(() => newValue);
    navigate(newValue);
  }

  return (
    <>
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
