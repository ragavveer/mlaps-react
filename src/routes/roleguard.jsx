import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from 'react-redux';
import useAuth from "../hooks/useAuth";

export default function RoleGuard() {
  // const { auth } = useAuth();
  const getToken = useSelector(state => state?.authentication?.loginData?.accessToken);
  console.log('roleguard testing->',getToken)

  // console.log(auth);
  return (
    <div>
      Role Guard
      
      <Outlet />
      {!getToken && <Navigate to="login" />}
    </div>
  );
}
