import { Dispatch, SetStateAction } from "react";
import { Crop } from "react-image-crop";

export interface GImageCropProps {
  rawImage?: File;
  className: string;
  imageSizeLimit?: number;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
  imageName: string;
  setFinalImage: Dispatch<SetStateAction<File | undefined>>;
  defaultCrop?: Crop;
  viewImage?: string;
  circularCrop?: boolean;
  maxHeightCrop?: number;
  maxWidthCrop?: number;
}
