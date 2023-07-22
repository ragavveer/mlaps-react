import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/axios";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REFRESH,
  REFRESH_REQUESTED,
} from "../types";
import { ROLE_MAPPING } from "../../models/roles-config";

function getloginData(val) {
  const { username, password } = val;
  const data = axios.post(
    "/auth",
    { username, password },
    { withCredentials: true }
  );
  return data;
}

function getLogoutData() {
  const response = axios.get("/logout", { withCredentials: true });
  return response;
}

function getRefreshData() {
  const response = axios.get("/refresh", { withCredentials: true });
  return response;
}

function* login(action) {
  const val = action.payload;
  try {
    const loginData = yield call(getloginData, val);
    loginData.data = { ...loginData.data, ...ROLE_MAPPING[0] };
    yield put({ type: LOGIN_SUCCESS, res: loginData });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, message: err });
  }
}

function* logout() {
  try {
    yield call(getLogoutData);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOGOUT_FAILURE, message: err });
  }
}

function* refresh() {
  try {
    yield put({ type: REFRESH_REQUESTED });
    const refreshData = yield call(getRefreshData);
    refreshData.data = { ...refreshData.data, ...ROLE_MAPPING[0] };
    yield put({ type: LOGIN_SUCCESS, res: refreshData });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, message: err });
  }
}

function* authSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(REFRESH, refresh);
}

export default authSaga;
