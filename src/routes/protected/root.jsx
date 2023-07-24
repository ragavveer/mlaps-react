import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.replace("/authorized/", "");
  const menu = useSelector((state) => state?.authentication?.loginData?.menu);

  // let value = menu?.[0];
  const [value, setValue] = useState(path);

  function handleChange(event, newValue) {
    setValue(() => newValue);
    navigate(newValue);
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="lab API tabs example"
      >
        {menu?.includes("upload") && <Tab label="Upload" value="upload" />}
        {menu?.includes("entity") && <Tab label="Entity" value="entity" />}
        {menu?.includes("members") && <Tab label="Members" value="members" />}
      </Tabs>
      <Outlet />
    </>
  );
}
