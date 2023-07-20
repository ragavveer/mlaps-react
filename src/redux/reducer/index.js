import { combineReducers } from 'redux';
import authentication from './Login';


const rootReducer = combineReducers({
    authentication: authentication
});

export default rootReducer;