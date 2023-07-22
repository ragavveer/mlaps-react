import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/action/LoginAction";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <>
      <div>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Outlet />
    </>
  );
}
