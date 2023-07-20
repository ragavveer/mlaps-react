import { Outlet } from "react-router-dom";
import { useSelector} from 'react-redux';
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

export default function AuthGuard() {

  const getToken = useSelector(state => state?.authentication?.loginData?.accessToken);
  console.log('auth guard testing->',getToken);

  const [initialLoad, setInitialLoad]  = useState(true);
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
    if (!getToken && initialLoad) {
      verifyRefreshToken();
      setInitialLoad(false);
    }
    return () => (isMounted = false);
  }, [getToken, refresh, setIsLoading, initialLoad]);

  console.log(getToken);
  return (
    <div>
      Auth Guard
      {isLoading ? <p>Loading</p> : <Outlet />}
    </div>
  );
  // return (
  // <>
  // <p>Auth guard found</p>
  // <Outlet />
  // </>
  // )
}
