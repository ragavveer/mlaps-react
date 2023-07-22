import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleGuard() {
  let { pathname: path } = window.location;

  path = path.slice(1);

  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );

  const menu = useSelector((state) => state?.authentication?.loginData?.menu);

  let naviagationElement;

  if (!accessToken) {
    // refresh token is empty
    naviagationElement = <Navigate to="login" state={path} />;
  } else if (path === "") {
    if (menu?.length > 0) {
      // user refresh/enters url with no segments, like "/". So we need to select the default menu
      naviagationElement = <Navigate to={menu[0]} />;
    } else {
      // user refresh/enters url with no segments, like "/". But users dont have menu options.
      naviagationElement = <Navigate to="default" />;
    }
  } else {
    naviagationElement = <Navigate to={path} />;
  }

  return (
    <div>
      Role Guard
      {naviagationElement}
      <Outlet />
    </div>
  );
}

// else if (path !== "login" && path !== "") {
//   // user refresh/enters url with segments, like "/entity" or "/members".
//   if (from !== "") {
//     // after login
//     naviagationElement = <Navigate to={from} state={from} />;
//   } else {
//     // after getting new access token from refresh token
//     naviagationElement = <Navigate to={path} state={path} />;
//   }
// }
