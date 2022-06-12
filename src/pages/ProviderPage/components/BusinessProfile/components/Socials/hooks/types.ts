type classesRecord = Record<
  "padRight10" | "viewButton" | "editButton" | "deleteButton" | "headerName",
  string
>;

export interface IUseColumnDef {
  classes: classesRecord;
}

export interface IUseGridSettings {
  classes: classesRecord;
  socials: { id: number; name: string; url: string }[];
}
