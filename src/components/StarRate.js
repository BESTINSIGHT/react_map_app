import { useRef, useState } from "react";

const StarRate = ({ starCount, setStarRate }) => {
  const [countRate, setCountRate] = useState(new Array(starCount).fill(false));
  const [fakeStar, setFakeStar] = useState(null);

  const initStarRate = (count) => {
    const stars = countRate.map((item, index) => {
      return count <= index ? false : true;
    });

    setCountRate([...stars]);
  };

  return (
    <div>
      {countRate.map((item, index) => {
        return (
          <span
            key={index}
            style={{ margin: "0 3px 0 3px" }}
            className={
              fakeStar === null
                ? item === true
                  ? "fa fa-star star-checked cursor-point"
                  : "fa fa-star cursor-point"
                : index <= fakeStar
                ? "fa fa-star star-checked cursor-point"
                : "fa fa-star cursor-point"
            }
            onClick={() => {
              console.log("별점 : ", index + 1);
              initStarRate(index + 1);
            }}
            onMouseEnter={() => {
              setFakeStar(index);
            }}
            onMouseLeave={() => {
              setFakeStar(null);
            }}
          ></span>
        );
      })}
      {/* <span class="fa fa-star star-checked"></span> */}
    </div>
  );
};

export default StarRate;
