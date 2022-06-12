import Geocode from "react-geocode";

const geocode = Geocode;

geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY || "");
geocode.setRegion("za");

export { geocode };
