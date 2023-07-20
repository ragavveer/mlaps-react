import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RoleGuard() {
  const { auth } = useAuth();

  console.log(auth);
  return (
    <div>
      Role Guard
      <Outlet />
      {!auth.accessToken && <Navigate to="login" />}
    </div>
  );
}
