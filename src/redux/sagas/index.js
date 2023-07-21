import { all } from "redux-saga/effects";
import authSaga from "./LoginSaga";
import userManagementSaga from "./UserManagementSaga";

export default function* rootSaga() {
  yield all([authSaga(), userManagementSaga()]);
}
