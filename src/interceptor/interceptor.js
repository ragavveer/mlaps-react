import { axiosPrivate } from "../api/axios";
import { userRefresh } from "../features/Auth/authSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

axiosPrivate.interceptors.request.use(
  (config) => {
    console.log("inside request interceptor");
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${
        store.getState().auth?.loginData?.accessToken
      }`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    console.log(prevRequest.sent);
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      await store.dispatch(userRefresh()).unwrap();
      prevRequest.headers["Authorization"] = `Bearer ${
        store.getState().auth?.loginData?.accessToken
      }`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

//     return () => {
//       axiosPrivate.interceptors.request.eject(requestIntercept);
//       axiosPrivate.interceptors.response.eject(responseIntercept);
//     };