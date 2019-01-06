import { combineReducers } from "redux";

import * as products from "../modules/products";

const appReducer = combineReducers({
  [products.constants.NAME]: products.reducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
