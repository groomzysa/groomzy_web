import { DayTime } from "api/generated/schema";

type classesRecord = Record<
  "padRight10" | "viewButton" | "editButton" | "deleteButton" | "headerName",
  string
>;

export interface IUseColumnDef {
  classes: classesRecord;
}

export interface IUseGridSettings {
  classes: classesRecord;
  providerOperatingTimes: DayTime[];
}
