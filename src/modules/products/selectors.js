import { NAME } from "./constants";

export const getProducts = state => state[NAME].items;

export const getLoading = state => state[NAME].loading;
