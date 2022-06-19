import { ProviderGallery } from "api/generated/schema";

type classesRecord = Record<"headerName", string>;

export interface IUseColumnDef {
  classes: classesRecord;
}

export interface IUseGridSettings {
  classes: classesRecord;
  gallery: ProviderGallery[];
}
