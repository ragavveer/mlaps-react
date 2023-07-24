import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthGuard() {
  // blocking the screen until the refresh API call either succeed or failure
  const loading = useSelector((state) => state?.authentication?.loading);

  console.log("auth guard testing->", loading);

  return (
    <div>
      Auth Guard
      {loading ? <p>Loading</p> : <Outlet />}
    </div>
  );
}
