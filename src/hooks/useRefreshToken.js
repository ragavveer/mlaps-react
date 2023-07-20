import axios from "../api/axios";
import useAuth from "./useAuth";
import { useDispatch} from 'react-redux';
import {refresh} from '../redux/action/LoginAction';

const useRefreshToken = () => {
  // const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const refreshFn =()=>  {
    dispatch(refresh());
  }
  return refreshFn;
  
  // return '';

  // const refresh = async () => {
    
  //   const response = await axios.get("/refresh", {
  //     withCredentials: true,
  //   });
  //   setAuth({ accessToken: response.data.accessToken });
  //   return response.data.accessToken;
  // };
  // return refresh;
};

export default useRefreshToken;
