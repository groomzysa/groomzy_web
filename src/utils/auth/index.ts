import {
  getLocalStorage,
  setLocalStorage,
} from "utils/localStorage/localStorage";

export const setToken = (token: string) => {
  setLocalStorage("token", token);
};

export const getToken = () => {
  return getLocalStorage("token");
};
