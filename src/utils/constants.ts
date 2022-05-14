import { ISelectOption } from "store/types";

/**
 *
 * Page names
 *
 */
export const HOME = "Home";
export const ABOUT = "About";
export const CONTACTS = "Contacts";
export const SIGN_IN = "Sign in";
export const SIGN_UP = "Sign up";
export const SIGN_OUT = "Sign out";
export const EDIT_PROFILE = "Edit profile";
export const TS_AND_CS = "Ts & Cs";

/**
 *
 * Provinces
 *
 */
export const PROVINCES: ISelectOption[] = [
  { id: 1, value: "Eastern Cape", label: "Eastern Cape" },
  { id: 2, value: "Free State", label: "Free State" },
  { id: 3, value: "Gauteng", label: "Gauteng" },
  { id: 4, value: "KwaZulu-Natal", label: "KwaZulu-Natal" },
  { id: 5, value: "Limpopo", label: "Limpopo" },
  { id: 6, value: "Mpumalanga", label: "Mpumalanga" },
  { id: 7, value: "Northern Cape", label: "Northern Cape" },
  { id: 8, value: "North West", label: "North West" },
  { id: 9, value: "Western Cape", label: "Western Cape" },
];
