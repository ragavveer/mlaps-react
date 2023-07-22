import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleGuard() {
  const location = useLocation();

  const path = location.pathname.slice(1);

  console.log(path);
  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );
  const menu = useSelector((state) => state?.authentication?.loginData?.menu);
  console.log("roleguard testing->", accessToken);
  return (
    <div>
      Role Guard
      {!accessToken ? (
        <Navigate to="login" />
      ) : path !== "login" ? (
        <Navigate to={path} />
      ) : menu.length > 0 ? (
        <Navigate to={menu[0]} />
      ) : (
        <Navigate to="default" />
      )}
      <Outlet />
    </div>
  );
}
