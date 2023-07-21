import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../redux/action/LoginAction";

export default function Root() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("users component");
  //   const timeOut = setTimeout(() => dispatch(documents()));
  //   return () => clearTimeout(timeOut);
  // }, [dispatch]);

  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link
              to="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              Home
            </Link>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="documents" className="nav-link px-2">
                Documents
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link px-2">
                About
              </Link>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            <button
              onClick={() => navigate("login")}
              type="button"
              className="btn btn-outline-primary me-2"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              type="button"
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        </header>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
