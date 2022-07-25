import { useCallback, useEffect, useRef, useState } from "react";

const GoogleMap = ({ className, location }) => {
  const [maps, setMaps] = useState(null);
  const currentPositionMarker = useRef(null);
  const clickedLocation = useRef({
    latitude: null,
    longitude: null,
    placeId: null,
  });
  const mapRef = useRef(null);
  const [searchAddress, setSearchAddress] = useState({
    info: [],
    location: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const initMap = useCallback(() => {
    const loca = { lat: location.latitude, lng: location.longitude };
    let markers = [];

    if (maps === null) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: loca,
        zoom: 15,
      });

      const input = document.getElementById("search-box");
      const searchBox = new window.google.maps.places.SearchBox(input);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
      searchBox.addListener("places_changed", () => {
        const bounds = new window.google.maps.LatLngBounds();
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          // 이전에 검색해서 생긴 마커들 제거
          if (markers.length !== 0) {
            markers.forEach((marker) => {
              marker.setMap(null);
            });
            markers = [];
          }

          const icon = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25),
          };

          // place마다 마커 생성
          markers.push(
            new window.google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );

          markers.forEach((marker) => {
            window.google.maps.event.addListener(marker, "click", (event) => {
              clickedLocation.current = {
                ...clickedLocation.current,
                latitude: event.latLng.lat(),
                longitude: event.latLng.lng(),
                placeId: event.placeId,
              };
              console.log("event === ", event);
            });
          });

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);

        setSearchAddress({
          info: places,
          location: bounds.getCenter(),
        });
      });

      // 현재위치를 map의 position위치에 마커 생성
      currentPositionMarker.current = new window.google.maps.Marker({
        position: loca,
        map: map,
      });
      window.google.maps.event.addListener(map, "click", (event) => {
        clickedLocation.current = {
          ...clickedLocation.current,
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng(),
          placeId: event.placeId,
        };
        console.log("event === ", event);
      });

      setMaps(map);
    }

    if (mapRef) {
      setIsLoading(false);
    }
  }, [mapRef, location, clickedLocation, maps]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  useEffect(() => {
    console.log("maps === ", maps);
  }, [maps]);

  /*   useEffect(() => {
    if (maps && searchAddress.info && searchAddress.location) {
      maps.panToBounds(searchAddress.location);
    }
  }, [searchAddress, maps]); */

  return (
    <>
      <input id="search-box" type="text" placeholder="Search Place" />
      <div id="map" ref={mapRef} className={`${className}`} />
    </>
  );
};

export default GoogleMap;
