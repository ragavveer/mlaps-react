import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function RoleGuard() {
  const [from, setFrom] = useState("");

  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );
  const location = useLocation();

  const path = location.pathname.slice(1);

  const menu = useSelector((state) => state?.authentication?.loginData?.menu);

  useEffect(() => {
    if (!accessToken && path !== "login") {
      console.log(path);
      setFrom(path);
    }
  }, [accessToken, path]);

  let naviagationElement;

  if (!accessToken) {
    // refresh token is empty
    naviagationElement = <Navigate to="login" state={from} />;
  } else if (path !== "login" && path !== "") {
    // user refresh/enters url with segments, like "/entity" or "/members".
    if (from !== "") {
      // after login
      naviagationElement = <Navigate to={from} state={from} />;
    } else {
      // after getting new access token from refresh token
      naviagationElement = <Navigate to={path} state={path} />;
    }
  } else if (menu.length > 0) {
    // user refresh/enters url with no segments, like "/". So we need to select the default menu
    naviagationElement = <Navigate to={menu[0]} state={menu[0]} />;
  } else {
    // user refresh/enters url with no segments, like "/". But users dont have menu options.
    naviagationElement = <Navigate to="default" />;
  }

  return (
    <div>
      Role Guard
      {naviagationElement}
      <Outlet />
    </div>
  );
}
