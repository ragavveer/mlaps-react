import * as type from "../types";

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case type.DOCUMENTS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action?.res?.data,
      };
    case type.DOCUMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
