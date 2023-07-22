import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/action/LoginAction";
import { useEffect } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );

  function handleLogout() {
    dispatch(logout());
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/login", { state: "" });
    }
  }, [accessToken, navigate]);

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
