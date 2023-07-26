import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { token, menu, from } from "../../features/Auth/authSlice";

export default function RoleGuard() {
  let { pathname } = window.location;

  pathname = pathname.replace("/authorized/", "");

  const accessToken = useSelector(token);

  const protectedMenu = useSelector(menu);

  const loginFrom = useSelector(from);

  let naviagationElement;

  if (!accessToken) {
    // refresh token is expired or not available
    naviagationElement = <Navigate to="login" state={pathname} />;
  } else {
    let path = loginFrom ?? pathname;

    path = path === "login" ? "" : path;

    const isNavigatedToLogin =
      loginFrom !== undefined && loginFrom !== null ? true : false;

    if (path === "") {
      if (protectedMenu?.length > 0) {
        // user refresh/enters url with no segments, like "/authorized". So we need to select the default menu
        naviagationElement = (
          <Navigate to={protectedMenu[0]} replace={isNavigatedToLogin} />
        );
      } else {
        // user refresh/enters url with no segments, like "/authorized". But users dont have menu options.
        naviagationElement = (
          <Navigate to="default" replace={isNavigatedToLogin} />
        );
      }
    } else {
      // user refresh/enters url with segments, like "/authorized/upload".
      naviagationElement = <Navigate to={path} replace={isNavigatedToLogin} />;
    }
  }

  return (
    <>
      {naviagationElement}
      <Outlet />
    </>
  );
}
