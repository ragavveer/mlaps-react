import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleGuard() {
  const getToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );
  console.log("roleguard testing->", getToken);
  return (
    <div>
      Role Guard
      {!getToken ? <Navigate to="login" /> : <Navigate to="users" />}
      <Outlet />
    </div>
  );
}
