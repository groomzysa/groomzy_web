import React, { FC, SyntheticEvent, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { DEFAULTCROP, DEFAULT_IMAGE_SIZE_LIMIT } from "./constants";
import { GImageCropProps } from "./types";

export const GImageCrop: FC<GImageCropProps> = ({
  rawImage,
  className,
  setErrorMessage,
  imageSizeLimit = DEFAULT_IMAGE_SIZE_LIMIT,
  imageName,
  setFinalImage,
  defaultCrop = DEFAULTCROP,
  viewImage,
  circularCrop = true,
  maxHeightCrop,
  maxWidthCrop,
}) => {
  const [crop, setCrop] = useState<Crop>(defaultCrop);
  const [image, setImage] = useState<EventTarget & HTMLImageElement>();

  /**
   *
   * Handlers
   *
   */
  const handleImageLoaded = (
    image: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImage(image.currentTarget);
    getCroppedImage(image.currentTarget, crop);
  };

  const handleImageCrop = (crop: Crop) => {
    setCrop(crop);
  };

  const handleImageCropComplete = (crop: Crop) => {
    handleUserCrop(crop);
  };

  const handleUserCrop = (crop: Crop) => {
    if (image && crop.width && crop.height) {
      getCroppedImage(image, crop);
    }
  };

  const getCroppedImage = (
    image: EventTarget & HTMLImageElement,
    crop: Crop
  ) => {
    const imageCanvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    imageCanvas.width = crop.width;
    imageCanvas.height = crop.height;
    const imgCx = imageCanvas.getContext("2d");

    imgCx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    imageCanvas.toBlob((blob) => {
      if (!blob || !rawImage) {
        return;
      }

      if (blob.size / (1024 * 1024 * imageSizeLimit) > imageSizeLimit) {
        setErrorMessage("Image size should net exceed 5Mb");
        return;
      }

      //@ts-ignore
      blob.name = imageName;
      //@ts-ignore
      blob.lastModified = rawImage!.lastModified;
      //@ts-ignore
      blob.webkitRelativePath = rawImage!.webkitRelativePath;

      const blobAsFile = new File([blob], imageName, {
        type: blob.type,
      });
      setFinalImage(blobAsFile);
    });
  };

  return (
    <ReactCrop
      crop={crop}
      onChange={handleImageCrop}
      onComplete={handleImageCropComplete}
      maxHeight={maxHeightCrop}
      maxWidth={maxWidthCrop}
      circularCrop={circularCrop}
      className={className}
    >
      {rawImage ? (
        <img alt={"Profile"} src={viewImage} onLoad={handleImageLoaded} />
      ) : null}
    </ReactCrop>
  );
};
