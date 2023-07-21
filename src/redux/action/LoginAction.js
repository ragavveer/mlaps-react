import * as type from "../types";

export function login(payload) {
  return {
    type: type.LOGIN,
    payload,
  };
}
export function logout() {
  return {
    type: type.LOGOUT,
  };
}
export function refresh() {
  return {
    type: type.REFRESH,
  };
}
