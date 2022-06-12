import jwt_decode from "jwt-decode";
import { Role } from "store/types";

import { getLocalStorage, setLocalStorage } from "utils/localStorage";

export const setToken = (token: string) => {
  setLocalStorage("token", token);
};

export const getToken = () => {
  return getLocalStorage("token");
};

export const getUserIdAndRole = () => {
  if (!getToken()) {
    return {
      id: undefined,
      role: undefined,
    };
  }
  const user = jwt_decode<{ id: number; role: Role }>(getToken() || "");
  return {
    id: user?.id,
    role: user?.role,
  };
};
