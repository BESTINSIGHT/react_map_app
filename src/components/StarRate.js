import { useEffect, useState } from "react";

const StarRate = ({
  className,
  style,
  maxStarCount,
  starRate = 0,
  setStarRate,
  isAdjustable = true,
}) => {
  const [countRate, setCountRate] = useState(
    new Array(maxStarCount).fill(false)
  );
  const [fakeStar, setFakeStar] = useState(null);

  const initStarRate = (count) => {
    const stars = countRate.map((item, index) => {
      return count <= index ? false : true;
    });

    setCountRate([...stars]);
  };

  useEffect(() => {
    initStarRate(starRate);
  }, [starRate]);

  return (
    <div className={className} style={style}>
      {countRate.map((item, index) => {
        return (
          <span
            key={index}
            style={{ margin: "0 3px 0 3px" }}
            className={
              isAdjustable === false
                ? item === true
                  ? "fa fa-star star-checked"
                  : "fa fa-star"
                : fakeStar === null
                ? item === true
                  ? "fa fa-star star-checked cursor-point"
                  : "fa fa-star cursor-point"
                : index <= fakeStar
                ? "fa fa-star fake-star-checked cursor-point"
                : "fa fa-star cursor-point"
            }
            onClick={() => {
              if (isAdjustable === false) {
                return;
              }
              console.log("별점 : ", index + 1);
              initStarRate(index + 1);
              setStarRate(index + 1);
            }}
            onMouseEnter={() => {
              if (isAdjustable === false) {
                return;
              }
              setFakeStar(index);
            }}
            onMouseLeave={() => {
              if (isAdjustable === false) {
                return;
              }
              setFakeStar(null);
            }}
          />
        );
      })}
    </div>
  );
};

export default StarRate;
