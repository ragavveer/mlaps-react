import { axiosPrivate } from "../api/axios";
import { refresh } from "../redux/action/LoginAction";

let store;

export const injectStore = (_store) => {
  store = _store;
};

axiosPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${
        store.getState().authentication?.loginData?.accessToken
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
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      store.dispatch(refresh());
      prevRequest.headers["Authorization"] = `Bearer ${
        store.getState().authentication?.loginData?.accessToken
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
