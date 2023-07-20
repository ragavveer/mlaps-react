import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../api/axios";

function getloginData(val) {
    const {username, password} = val;
    const data = axios.post("/auth",{ username, password },{withCredentials: true,});
    return data;   
}
function getRefreshData() {
   
    const response = axios.get("/refresh", {withCredentials: true,});
    return response;   
}

function* loginDetails(action) {
    
    const val = action.payload;
    // const {data: { accessToken }} = axios.post("/auth",{ username, password },{withCredentials: true,});
    // const data = axios.post("/auth",{ val },{withCredentials: true,});
    try {
        const loginData = yield call(getloginData,val);
       yield put({ type: 'LOGIN_SUCCESS', res: loginData });
    } catch (err) {
       yield put({ type: 'LOGIN_FAILURE', message: err });
    }
 }
 function* refreshDetails() {
    try {
        const refreshData = yield call(getRefreshData);
       yield put({ type: 'LOGIN_SUCCESS', res: refreshData });
    } catch (err) {
       yield put({ type: 'LOGIN_FAILURE', message: err });
    }
 }
function* loginSaga() {
    yield takeLatest('LOGIN', loginDetails);
    yield takeLatest('REFRESH', refreshDetails);
 }
 
 export default loginSaga;