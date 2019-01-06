import * as actionTypes from "./actionTypes";

const initialState = {
  items: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_START:
      return {
        ...initialState,
        loading: true
      };
    case actionTypes.GET_ERROR:
      return {
        ...initialState,
        loading: false
      };
    case actionTypes.GET_SUCCESS:
      return {
        ...initialState,
        loading: false,
        items: action.products
      };
    default:
      return state;
  }
};
