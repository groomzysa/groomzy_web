export const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

export const removeLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
