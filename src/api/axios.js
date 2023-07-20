import axios from "axios";
const AUTH_BASE_URL = "http://localhost:3500";
const USER_MANAGEMENT_BASE_URL = "http://localhost:5002";

export default axios.create({
  baseURL: AUTH_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: USER_MANAGEMENT_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
