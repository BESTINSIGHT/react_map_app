import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";

const GoogleMap = ({ className, location }) => {
  const [maps, setMaps] = useState(null);
  const [placeDetail, setPlaceDetail] = useState({});
  const currentPositionMarker = useRef(null);
  const clickedLocation = useRef({
    latitude: null,
    longitude: null,
    placeId: null,
  });
  const mapRef = useRef(null);
  const selectedLocationMarker = useRef(null);
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
      const button = document.getElementById("move-current-location");
      const searchBox = new window.google.maps.places.SearchBox(input);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(button);

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
            console.count("Returned place contains no geometry");
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
            size: new window.google.maps.Size(15, 15),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(15, 15),
          };

          // place마다 마커 생성
          markers.push(
            new window.google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
              animation: window.google.maps.Animation.DROP,
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
        map: map,
        title: "Current Location",
        position: loca,
        animation: window.google.maps.Animation.DROP,
      });
      window.google.maps.event.addListener(map, "click", (event) => {
        clickedLocation.current = {
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng(),
          placeId: event.placeId,
        };

        // 클릭해서 생성한 마커 제거 및 새로 생성
        if (selectedLocationMarker.current) {
          selectedLocationMarker.current.setMap(null);
        }
        selectedLocationMarker.current = null;
        // 벡터마커 생성
        const svgMarker = {
          path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
          fillColor: "blue",
          fillOpacity: 0.8,
          strokeWeight: 0,
          rotation: 0,
          scale: 1.5,
          anchor: new window.google.maps.Point(12, 30),
        };
        selectedLocationMarker.current = new window.google.maps.Marker({
          map: map,
          title: "Seleted Location",
          icon: svgMarker,
          position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
          animation: window.google.maps.Animation.DROP,
        });

        if (event.placeId) {
          const request = {
            placeId: `${event.placeId}`,
            fields: [
              "name",
              "rating",
              "formatted_phone_number",
              "geometry",
              "photo",
              "formatted_address",
              "reviews",
            ],
          };
          const service = new window.google.maps.places.PlacesService(map);

          const callback = (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              console.log("place === ", place);
              //지정한 곳으로 맵 가운데로 이동
              setPlaceDetail(place);
            }
          };

          service.getDetails(request, callback);
        }

        console.log("event === ", event);
      });

      setMaps(map);
    }

    if (mapRef) {
      setIsLoading(false);
    }
  }, [mapRef, location, maps]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  useEffect(() => {
    console.log("maps === ", mapRef);
  }, [mapRef]);

  /*   useEffect(() => {
    if (maps && searchAddress.info && searchAddress.location) {
      maps.panToBounds(searchAddress.location);
    }
  }, [searchAddress, maps]); */

  return (
    <>
      {placeDetail.name && (
        <aside className="map-aside">
          <header>
            <Button
              style={{ position: "absolute", top: "0", right: "0" }}
              onClick={() => {
                setPlaceDetail({});
              }}
            >
              닫기
            </Button>
          </header>
        </aside>
      )}
      <div id="map" ref={mapRef} className={`${className}`} />
      <input
        id="search-box"
        type="text"
        placeholder="Search Place"
        style={{
          position: "absolute",
          top: "-100px",
        }}
      />
      <Button
        id="move-current-location"
        style={{ position: "absolute", top: "-100px" }}
        size={"sm"}
        onClick={() => {
          if (maps && location) {
            maps.setZoom(16);
            maps.setCenter({ lat: location.latitude, lng: location.longitude });
          }
        }}
      >
        My Location
      </Button>
    </>
  );
};

export default GoogleMap;
