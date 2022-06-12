import { Dispatch, SetStateAction } from "react";
import haversine from "haversine-distance";

import { Address, ProviderProfile } from "api/generated/graphqlTypes";

export const useProviderHandlers = ({
  address,
  profile,
  setDistance,
  setLoadingDistance,
}: {
  address?: Address;
  profile?: ProviderProfile;
  setDistance: Dispatch<SetStateAction<string>>;
  setLoadingDistance: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleAddress = () => {
    if (!address && !profile) return;

    if (profile) {
      const {
        tradingStreetNumber,
        tradingStreetName,
        tradingSuburbName,
        tradingCityName,
        tradingProvinceName,
        tradingAreaCode,
      } = profile;
      if (
        !tradingStreetNumber ||
        !tradingStreetName ||
        !tradingSuburbName ||
        !tradingCityName ||
        !tradingProvinceName ||
        !tradingAreaCode
      )
        return;

      return `${tradingStreetNumber}, ${tradingStreetName}, ${tradingSuburbName}, ${tradingCityName}, ${tradingProvinceName}, ${tradingAreaCode}`;
    } else if (address) {
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
    }
  };

  const handleDistance = () => {
    if (!("geolocation" in navigator)) {
      alert(
        "The device does not support geolacation to determine current position."
      );
      return;
    } else {
      if (
        !(profile?.tradingLatitude && profile.tradingLongitude) &&
        !(address?.latitude && address?.longitude)
      )
        return;
      setLoadingDistance(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const devicePosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const providerPosition = {
            latitude: profile?.tradingLatitude || address!.latitude!,
            longitude: profile?.tradingLongitude || address!.longitude!,
          };

          setLoadingDistance(false);
          setDistance(
            `${(haversine(devicePosition, providerPosition) / 1000).toFixed(
              1
            )} km`
          );
        },
        (error) => {
          setLoadingDistance(false);
          setDistance(`can't load distance`);
        }
      );
    }
  };
  return { handleAddress, handleDistance };
};
