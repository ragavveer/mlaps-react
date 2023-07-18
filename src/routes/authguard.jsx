import { Outlet } from "react-router-dom";

export default function AuthGuard() {
  return (
    <div>
      Auth Guard <Outlet />
    </div>
  );
}
