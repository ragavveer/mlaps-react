import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/action/LoginAction";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );

  function handleLogout() {
    dispatch(logout());
    setIsLoggedOut(true);
  }

  useEffect(() => {
    if (!accessToken && isLoggedOut) {
      navigate("/login", { state: "" });
    }
  }, [accessToken, isLoggedOut, navigate]);

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
