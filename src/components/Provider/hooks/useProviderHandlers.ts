import { IAddress } from "store/types";
import haversine from "haversine-distance";
import { Dispatch, SetStateAction } from "react";

export const useProviderHandlers = ({
  address,
  setDistance,
  setLoadingDistance,
}: {
  address: IAddress;
  setDistance: Dispatch<SetStateAction<string>>;
  setLoadingDistance: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleAddress = () => {
    if (!address) return;
    const {
      streetNumber,
      streetName,
      suburbName,
      cityName,
      provinceName,
      areaCode,
    } = address;
    if (
      !streetNumber ||
      !streetName ||
      !suburbName ||
      !cityName ||
      !provinceName ||
      !areaCode
    )
      return;
    return `${streetNumber}, ${streetName}, ${suburbName}, ${cityName}, ${provinceName}, ${areaCode}`;
  };

  const handleDistance = () => {
    if (!("geolocation" in navigator)) {
      alert(
        "The device does not support geolacation to determine current position."
      );
      return;
    } else {
      if (!address?.latitude || !address?.longitude) return;
      setLoadingDistance(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const devicePosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const providerPosition = {
            latitude: address.latitude!,
            longitude: address!.longitude!,
          };

          setLoadingDistance(false);
          setDistance(
            `~${(haversine(devicePosition, providerPosition) / 1000).toFixed(
              1
            )} km`
          );
        },
        (error) => alert(error.message)
      );
    }
  };
  return { handleAddress, handleDistance };
};
