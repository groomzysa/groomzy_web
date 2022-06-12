import { Category, Duration, ISelectOption } from "store/types";
import { BusinessDay } from "api/generated/graphqlTypes";

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
export const PROVIDER_TRADING = "Provider trading";

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

/**
 *
 * Categories
 *
 */

export const CATEGORIES: ISelectOption[] = [
  { id: 1, value: Category.Barber, label: Category.Barber },
  { id: 2, value: Category.Hairdresser, label: Category.Hairdresser },
  { id: 3, value: Category.MakeupArtist, label: Category.MakeupArtist },
  { id: 4, value: Category.NailTechnician, label: Category.NailTechnician },
  { id: 5, value: Category.Spa, label: Category.Spa },
];

/**
 *
 * Duration units
 *
 */

export const DURATION_UNITS: ISelectOption[] = [
  { id: 1, value: Duration.Min, label: Duration.Min },
  { id: 2, value: Duration.Hour, label: Duration.Hour },
];

/**
 *
 * Business days
 *
 */

export const BUSINESS_DAYS: ISelectOption[] = [
  { id: 1, value: BusinessDay.Mon, label: BusinessDay.Mon },
  { id: 2, value: BusinessDay.Tue, label: BusinessDay.Tue },
  { id: 3, value: BusinessDay.Wed, label: BusinessDay.Wed },
  { id: 4, value: BusinessDay.Thu, label: BusinessDay.Thu },
  { id: 5, value: BusinessDay.Fri, label: BusinessDay.Fri },
  { id: 6, value: BusinessDay.Sat, label: BusinessDay.Sat },
  { id: 7, value: BusinessDay.Sun, label: BusinessDay.Sun },
];

/**
 *
 * General button text
 *
 */
export const SAVE = "Save";
