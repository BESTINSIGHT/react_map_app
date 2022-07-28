import React, { useEffect, useState } from "react";
import GoogleMap from "../components/googleMap/GoogleMap";
import HomeHeader from "../components/HomeHeader";

const MapPage = () => {
  const [myLocation, setMyLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    getMyCurrentPosition();
  }, []);

  function getMyCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      getPositionSuccess, //성공 시 호출
      getPositionError // 실패 시 호출
    );
  }
  const getPositionSuccess = (position) => {
    setMyLocation({
      ...myLocation,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };
  const getPositionError = (error) => {
    setMyLocation({
      ...myLocation,
      latitude: 37.422050009429405,
      longitude: -122.08408655875759,
    }); // 실패 시 구글본사 위치로 이동
    console.log(error);
    alert(`Message : ${error.message}`);
  };

  return (
    <>
      {myLocation.latitude && myLocation.longitude && (
        <GoogleMap className="mapPage-main" location={myLocation} />
      )}
    </>
  );
};

export default MapPage;
