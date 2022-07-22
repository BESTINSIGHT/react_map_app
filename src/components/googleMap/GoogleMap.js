import { useCallback, useEffect, useRef, useState } from "react";

const GoogleMap = ({ className, location }) => {
  const [maps, setMaps] = useState();
  const [marker, setMarker] = useState();
  const [clickedLocation, setClickedLocation] = useState({
    latitude: null,
    longitude: null,
    placeId: null,
  });
  const mapRef = useRef(null);

  const initMap = useCallback(() => {
    const loca = { lat: location.latitude, lng: location.longitude };
    const map = new window.google.maps.Map(mapRef.current, {
      center: loca,
      zoom: 15,
    });
    const marker = new window.google.maps.Marker({
      position: loca,
      map: map,
    });

    window.google.maps.event.addListener(map, "click", (event) => {
      setClickedLocation({
        ...clickedLocation,
        latitude: event.latLng.lat,
        longitude: event.latLng.lng,
        placeId: event.placeId,
      });
    });

    setMaps(map);
    setMarker(marker);
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  useEffect(() => {
    console.log("clickedLocation === ", clickedLocation);
  }, [clickedLocation]);

  return <div id="map" className={`${className}`} ref={mapRef}></div>;
};

export default GoogleMap;
