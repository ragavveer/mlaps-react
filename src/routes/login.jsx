import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/LoginAction";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const [errMsg] = useState(null);

  const accessToken = useSelector(
    (state) => state?.authentication?.loginData?.accessToken
  );

  const menu = useSelector((state) => state?.authentication?.loginData?.menu);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const formvalues = {
      username,
      password,
    };
    console.log(location.state);
    dispatch(login(formvalues));
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg("No Server Response");
    //   } else if (err.response?.status === 400) {
    //     setErrMsg("Missing Username or Password");
    //   } else if (err.response?.status === 401) {
    //     setErrMsg("Unauthorized");
    //   } else {
    //     setErrMsg("Login Failed");
    //   }
    // }
  };

  useEffect(() => {
    if (accessToken) {
      console.log("after login action dispatch");
      const path = location.state;
      if (path === "") {
        if (menu?.length > 0) {
          // user refresh/enters url with no segments, like "/". So we need to select the default menu
          navigate(`../${menu[0]}`, { replace: true });
        } else {
          // user refresh/enters url with no segments, like "/". But users dont have menu options.
          navigate(`../default`, { replace: true });
        }
      } else {
        navigate(`../${location.state}`, { replace: true });
      }
    }
  }, [accessToken, location.state, menu, navigate]);

  return (
    <main className="form-signin w-100 m-auto">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please login</h1>

        <div className="form-floating">
          <input
            name="username"
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="UserName"
          />
          <label htmlFor="floatingInput">User name</label>
        </div>
        <div className="form-floating">
          <input
            name="password"
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          style={{ marginTop: "1rem" }}
          className="btn btn-primary w-100 py-2"
          type="submit"
        >
          Login
        </button>
      </form>
      <pre>{errMsg}</pre>
    </main>
  );
}
