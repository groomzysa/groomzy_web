import { ISelectOption } from "store/types";

export interface IGSelectProps {
  id: string;
  selectLabel: string;
  options: ISelectOption[];
  setSelect: (option: ISelectOption | undefined) => void;
  value?: ISelectOption;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  resetErrorMessage?: (value: string) => void;
}
