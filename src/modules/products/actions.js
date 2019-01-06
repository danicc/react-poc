import * as actionTypes from "./actionTypes";

export const getProductsStart = () => ({
  type: actionTypes.GET_START
});

export const getProductsSuccess = products => ({
  type: actionTypes.GET_SUCCESS,
  products
});

export const getProductsError = () => ({
  type: actionTypes.GET_ERROR
});

const data = [
  {
    myId: 99,
    name: "Termo",
    price: 99
  },
  {
    myId: "asdf",
    name: "Mate",
    price: 100
  },
  {
    myId: "asdffs2",
    name: "Yerba",
    price: 88
  }
];

export const getProducts = () => dispatch => {
  dispatch(getProductsStart());

  setTimeout(() => {
    dispatch(getProductsSuccess(data));
  }, 1000);
};
