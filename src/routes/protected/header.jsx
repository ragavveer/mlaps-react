import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { userLogout } from "../../features/Auth/authSlice";
// import { useEffect, useState } from "react";

export default function Header() {
  // const [isLoggedOut, setIsLoggedOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const accessToken = useSelector( token );

  async function handleLogout() {
    await dispatch(userLogout()).unwrap();
    navigate("/home", { state: "" });
    // setIsLoggedOut(true);
  }

  // useEffect(() => {
  //   if (!accessToken && isLoggedOut) {
  //     navigate("/home", { state: "" });
  //   }
  // }, [accessToken, isLoggedOut, navigate]);

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
