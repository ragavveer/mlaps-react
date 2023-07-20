import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

export default function AuthGuard() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    if (!auth?.accessToken) {
      verifyRefreshToken();
    }
    return () => (isMounted = false);
  }, [auth?.accessToken, refresh, setIsLoading]);

  console.log(auth);
  return (
    <div>
      Auth Guard
      {isLoading ? <p>Loading</p> : <Outlet />}
    </div>
  );
}
