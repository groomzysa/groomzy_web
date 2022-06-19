import { Category, Duration, ISelectOption } from "store/types";
import { BusinessDay } from "api/generated/schema";

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
export const TS_AND_CS = "Terms and conditions";
export const PROVIDER_TRADING = "Provider trading";
export const REQUEST_RESET_PASSWORD = "Request reset password";
export const RESET_PASSWORD = "Reset password";
export const PRIVACY_POLICY = "Privacy policy";

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
  { id: 0, value: "None", label: "None" },
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
  { id: 1, value: BusinessDay.MON, label: BusinessDay.MON },
  { id: 2, value: BusinessDay.THU, label: BusinessDay.TUE },
  { id: 3, value: BusinessDay.WED, label: BusinessDay.WED },
  { id: 4, value: BusinessDay.THU, label: BusinessDay.THU },
  { id: 5, value: BusinessDay.FRI, label: BusinessDay.FRI },
  { id: 6, value: BusinessDay.SAT, label: BusinessDay.SAT },
  { id: 7, value: BusinessDay.SUN, label: BusinessDay.SUN },
];

/**
 *
 * General button text
 *
 */
export const SAVE = "Save";
