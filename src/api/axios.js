import axios from "axios";
const AUTH_BASE_URL = "http://localhost:3500";
// const USER_MANAGEMENT_BASE_URL =
//   "https://64b179c6062767bc4826436e.mockapi.io/api/v1/";

export default axios.create({
  baseURL: AUTH_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
