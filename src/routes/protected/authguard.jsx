import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { appStatus } from "../../features/Auth/authSlice";

export default function AuthGuard() {
  // blocking the screen until the refresh API call either succeed or failure
  const status = useSelector(appStatus);

  console.log("auth guard testing->", status);

  return (
    <div>
      Auth Guard
      {status === "loading" ? <p>Loading</p> : <Outlet />}
    </div>
  );
}
