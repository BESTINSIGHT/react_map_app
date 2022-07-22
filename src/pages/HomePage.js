import React, { useEffect, useState } from "react";
import GoogleMap from "../components/googleMap/GoogleMap";
import HomeHeader from "../components/HomeHeader";

const HomePage = () => {
  const [myLocation, setMyLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMyCurrentPosition();
    setIsLoading(false);
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
      latitude: -34.397,
      longitude: 150.644,
    });
    alert(error);
  };

  return (
    <div className="homePage-container">
      <HomeHeader className="homePage-header" />
      {isLoading
        ? "로딩 중"
        : myLocation.latitude &&
          myLocation.longitude && (
            <GoogleMap className="homePage-main" location={myLocation} />
          )}
    </div>
  );
};

export default HomePage;
