import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleGuard() {
  let { pathname } = window.location;

  pathname = pathname.replace("/authorized/", "");

  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );

  const menu = useSelector((state) => state?.authentication?.loginData?.menu);

  const from = useSelector((state) => state?.authentication?.loginData?.from);

  let naviagationElement;

  if (!accessToken) {
    // refresh token is expired or not available
    naviagationElement = <Navigate to="login" state={pathname} />;
  } else {
    let path = from ?? pathname;

    path = path === "login" ? "" : path;

    const isNavigatedToLogin =
      from !== undefined && from !== null ? true : false;

    if (path === "") {
      if (menu?.length > 0) {
        // user refresh/enters url with no segments, like "/authorized". So we need to select the default menu
        naviagationElement = (
          <Navigate to={menu[0]} replace={isNavigatedToLogin} />
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
    <div>
      Role Guard
      {naviagationElement}
      <Outlet />
    </div>
  );
}
