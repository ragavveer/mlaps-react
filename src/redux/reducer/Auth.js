import * as type from "../types";

const initialState = {
  loginData: [],
  loading: false,
  error: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginData: action?.res?.data,
      };
    case type.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.LOGOUT_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.LOGOUT_SUCCESS:
    case type.LOGOUT_FAILURE:
      return {
        ...initialState,
      };
    case type.REFRESH_REQUESTED:
      return {
        ...initialState,
        loading: true,
      };
    default:
      return state;
  }
}
