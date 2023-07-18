import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import useAuth from "./hooks/useAuth";

export default function Root() {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
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
              onClick={() => navigate("logout")}
              type="button"
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        </header>
        <div>
          <Outlet context={[auth, setAuth]} />
        </div>
      </div>
    </>
  );
}
