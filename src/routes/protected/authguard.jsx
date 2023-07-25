import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { status } from "../../features/Auth/authSlice";

export default function AuthGuard() {
  // blocking the screen until the refresh API call either succeed or failure
  const fetchStatus = useSelector(status);

  console.log("auth guard testing->", fetchStatus);

  return (
    <div>
      Auth Guard
      {fetchStatus === "loading" ? <p>Loading</p> : <Outlet />}
    </div>
  );
}
