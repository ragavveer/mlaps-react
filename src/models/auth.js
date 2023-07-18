import axios from "axios";

export async function login(frm) {
  const response = await axios.post("http://localhost:3500/auth", frm);
  return response;
}

export async function refresh() {
  const response = await axios.post("http://localhost:3500/refresh");
  return response;
}

export async function logout() {
  const response = await axios.post("http://localhost:3500/logout");
  return response;
}
