import { ISelectOption } from "store/types";

export interface IGSelectProps {
  id: string;
  selectLabel: string;
  options: ISelectOption[];
  setSelect: (option: ISelectOption) => void;
  value?: ISelectOption;
}
