export default function Login() {
  return (
    <main className="form-signin w-100 m-auto">
      <form method="post">
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
    </main>
  );
}
