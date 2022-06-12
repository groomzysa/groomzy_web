import { Staff } from "api/generated/graphqlTypes";

type classesRecord = Record<
  "padRight10" | "viewButton" | "editButton" | "deleteButton" | "headerName",
  string
>;

export interface IUseColumnDef {
  classes: classesRecord;
}

export interface IUseGridSettings {
  classes: classesRecord;
  providerStaffs: Staff[];
}
