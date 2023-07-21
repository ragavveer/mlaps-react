import { combineReducers } from "redux";
import authentication from "./Auth";
import userManagement from "./UserManagement";

const rootReducer = combineReducers({
  authentication: authentication,
  userManagement,
});

export default rootReducer;
