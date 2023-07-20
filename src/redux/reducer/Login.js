import * as type from '../types';

const initialState = {
  loginData: [],
  refreshData: [],
  loading: false,
  error: null,
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case type.GET_LOGIN_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginData: action?.res?.data
      }
    case type.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
      case type.REFRESH_SUCCESS:
      return {
        ...state,
        refreshData: action?.res?.data,
        error: action.message,
      }
    default:
      return state
  }
}