import { call, put, takeLatest } from "redux-saga/effects";
import { axiosPrivate } from "../../api/axios";
import { DOCUMENTS, DOCUMENTS_SUCCESS, DOCUMENTS_FAILURE } from "../types";

function getDocuments() {
  const data = axiosPrivate.get("/employees");
  return data;
}

function* documents() {
  try {
    const documents = yield call(getDocuments);
    yield put({ type: DOCUMENTS_SUCCESS, res: documents });
  } catch (err) {
    yield put({ type: DOCUMENTS_FAILURE, message: err });
  }
}

function* userManagementSaga() {
  yield takeLatest(DOCUMENTS, documents);
}

export default userManagementSaga;
