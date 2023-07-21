import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthGuard() {
  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );
  const loading = useSelector((state) => state?.authentication?.loading);

  console.log("auth guard testing->", accessToken, loading);

  return (
    <div>
      Auth Guard
      {loading ? <p>Loading</p> : <Outlet />}
    </div>
  );
}
