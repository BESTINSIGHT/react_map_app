import { memo, useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import StarRate from "../StarRate";
import { reviewsActions } from "../../redux/reviews";
import { useSelector, useDispatch } from "react-redux";

const GoogleMap = ({ className, location }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  const [maps, setMaps] = useState(null);
  const [placeDetail, setPlaceDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starRate, setStarRate] = useState(0);
  const currentPositionMarker = useRef(null);
  const clickedLocation = useRef({
    latitude: null,
    longitude: null,
    placeId: null,
  });
  const mapRef = useRef(null);
  const selectedLocationMarker = useRef(null);

  const initReviewtData = {
    placeId: "",
    location: { lat: 0, lng: 0 },
    placeName: "",
    placeAddress: "",
    placePhoneNumber: "",
    starRate: 0,
    reviewText: "",
  };
  const [reviewData, setReviewData] = useState(initReviewtData);
  const reviewsMarkers = useRef([]);

  // 지도 최초 정의
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
      });

      // 현재위치를 map의 position위치에 마커 생성
      currentPositionMarker.current = new window.google.maps.Marker({
        map: map,
        title: "Current Location",
        position: loca,
        animation: window.google.maps.Animation.DROP,
      });
      window.google.maps.event.addListener(map, "click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        clickedLocation.current = {
          latitude: lat,
          longitude: lng,
          placeId: event.placeId,
        };

        map.panTo({ lat: lat, lng: lng });

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
          position: { lat: lat, lng: lng },
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
              setPlaceDetail(place);

              setReviewData({
                location: { lat: lat, lng: lng },
                placeId: event.placeId,
                placeName: place.name,
                placeAddress: place.formatted_address,
                placePhoneNumber: place.formatted_phone_number,
                starRate: 0,
                reviewText: "",
              });
            }
          };

          service.getDetails(request, callback);
        }

        console.log("event === ", event);
      });

      setMaps(map);
    }
  }, [mapRef, location, maps]);

  const resetStarRate = () => {
    setStarRate(0);
  };

  const resetPlaceDetail = () => {
    setPlaceDetail({});
  };

  const resetReviewData = () => {
    setReviewData(initReviewtData);
  };

  const saveReviewData = () => {
    dispatch(reviewsActions.reviewAdd(reviewData));
    resetReviewData();
    resetStarRate();
    setIsModalOpen(false);
  };

  const validCheck = (value) => {
    let errors = [];

    if (value.placeId === "") {
      errors.push("placeId는 필수 값입니다.");
    }

    return errors;
  };

  useEffect(() => {
    initMap();
  }, [initMap]);

  useEffect(() => {
    setReviewData({ ...reviewData, starRate: starRate });
  }, [starRate]);

  useEffect(() => {
    if (reviews.length !== 0 && maps) {
      // 기존의 리뷰마커 제거
      reviewsMarkers.current.forEach((marker) => {
        marker.setMap(null);
      });
      let markers = [];

      const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.8,
        strokeWeight: 0,
        rotation: 0,
        scale: 1.5,
        anchor: new window.google.maps.Point(12, 30),
      };

      reviews.map((review) => {
        markers.push(
          new window.google.maps.Marker({
            map: maps,
            icon: svgMarker,
            title: review.placeName,
            position: review.location,
            animation: window.google.maps.Animation.DROP,
          })
        );
      });

      reviewsMarkers.current = markers;
    }
  }, [reviews, maps]);

  /* useEffect(() => {
    console.log("maps === ", mapRef);
  }, [mapRef]); */

  useEffect(() => {
    console.log("reviews !!!!!!!!!! ", reviews);
  }, [reviews]);

  /* useEffect(() => {
    console.log("reviewData === ", reviewData);
  }, [reviewData]); */

  return (
    <>
      <aside className={placeDetail.name ? "show-map-aside" : "hide-map-aside"}>
        <header style={{ margin: "1%" }}>
          <Button
            style={{ width: "35%", height: "10%" }}
            onClick={() => {
              setIsModalOpen(true);
              console.log("리뷰작성");
            }}
          >
            {"리뷰 작성"}
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="close-button"
            onClick={() => {
              resetReviewData();
              resetPlaceDetail();
            }}
          >
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </header>
        <div style={{ textAlign: "center", margin: "1%", color: "orange" }}>
          {placeDetail.rating
            ? `총 평점 : ${placeDetail.rating} / 5`
            : `평점 없음`}
        </div>
        <h3 style={{ textAlign: "center", margin: "1%", color: "#006400" }}>
          {placeDetail.name && `${placeDetail.name}`}
        </h3>
        <div style={{ textAlign: "center", margin: "1%" }}>
          {placeDetail.formatted_address && `${placeDetail.formatted_address}`}
        </div>
        <div
          style={{
            overflowY: "auto",
            width: "100%",
            height: "83%",
            borderTop: "1px solid grey",
            borderRadius: "3%",
          }}
        >
          {/* 리뷰 사진 */}
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "3%",
            }}
          >
            {placeDetail.photos &&
              placeDetail.photos.map((photo, index) => {
                const photoUrl = photo.getUrl();
                return (
                  <a
                    key={`photo-${index}`}
                    href={photoUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: "48%",
                      textAlign: "center",
                      flexShrink: "1",
                    }}
                  >
                    <img
                      src={photoUrl}
                      alt={photoUrl}
                      style={{
                        width: "100%",
                        border: "1px solid lightgrey",
                        borderRadius: "10px",
                      }}
                    />
                  </a>
                );
              })}
          </div> */}
          {/* 리뷰 */}
          {/* {placeDetail.reviews ? (
            placeDetail.reviews.map((review, index) => {
              return (
                <div
                  key={index}
                  style={{
                    margin: "3% auto 3% auto",
                    width: "90%",
                    maxHeight: "50%",
                    border: "1px solid lightgrey",
                    borderRadius: "10px",
                    overflowY: "auto",
                    backgroundColor: "white",
                  }}
                >
                  <div style={{ textAlign: "center", margin: "1%" }}>
                    {review.rating ? (
                      <StarRate
                        maxStarCount={5}
                        starRate={review.rating}
                        isAdjustable={false}
                      />
                    ) : (
                      `평점 없음`
                    )}
                  </div>
                  <div style={{ textAlign: "center", margin: "1%" }}>
                    <a
                      href={review.author_url && `${review.author_url}`}
                      target="_blank"
                      rel="noreferrer"
                      title={review.author_url && `${review.author_url}`}
                    >
                      {review.author_name &&
                        `작성자 : ${review.author_name} (${review.relative_time_description})`}
                    </a>
                  </div>
                  <div style={{ margin: "3% 1% 1% 1%" }}>
                    {review.text ? review.text : `내용 없음`}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{ textAlign: "center", margin: "5%" }}
            >{`리뷰가 없습니다.`}</div>
          )} */}
        </div>
      </aside>
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

      {/* 리뷰 작성 클릭 시 작동 */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <header
          style={{
            textAlign: "center",
            margin: "1%",
            borderBottom: "1px solid lightgrey",
          }}
        >
          <h3 style={{ margin: "1%", color: "#006400" }}>
            {placeDetail.name ? placeDetail.name : null}
          </h3>
          <StarRate
            maxStarCount={5}
            starRate={starRate}
            setStarRate={setStarRate}
            isModalOpen={isModalOpen}
            style={{ marginBottom: "1%" }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </header>
        <div
          style={{
            display: "inline-block",
            width: "100%",
            height: "80%",
            margin: "auto",
          }}
        >
          <textarea
            placeholder={"내용"}
            value={reviewData.reviewText}
            style={{
              display: "block",
              width: "85%",
              height: "85%",
              margin: "1% auto 0 auto",
              padding: "1%",
              fontSize: "large",
              border: "1px solid lightgrey",
              borderRadius: "1vw",
              resize: "none",
            }}
            onChange={(e) => {
              setReviewData({
                ...reviewData,
                reviewText: e.target.value,
              });
            }}
          />
        </div>
        <footer
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            margin: "1vw",
          }}
        >
          <Button type={"button"} onClick={saveReviewData}>
            저장
          </Button>
        </footer>
      </Modal>
    </>
  );
};

export default memo(GoogleMap);
