import axios from "axios";
const AUTH_BASE_URL = "http://localhost:3500";

export default axios.create({
  baseURL: AUTH_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
