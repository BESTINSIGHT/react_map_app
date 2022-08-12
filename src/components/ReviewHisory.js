import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewsActions } from "../redux/reviews";
import Button from "./Button";
import Card from "./Card";
import StarRate from "./StarRate";
import Textarea from "./Textarea";

/* const reviewData = {
  placeId: placeDetail.placeId,
  location: placeDetail.placeLocation,
  placeName: placeDetail.name,
  placeAddress: placeDetail.formatted_address,
  placePhoneNumber: placeDetail.formatted_phone_number,
  starRate: starRate,
  reviewText: reviewText,
  createdDate: `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDay()}`,
}; */

const ReviewHistory = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const [selectedReview, setSelectedReview] = useState({});
  const [editmode, setEditMode] = useState(false);

  const saveReviewData = () => {
    dispatch(reviewsActions.reviewEdit(selectedReview));
    setEditMode(false);
  };

  const editReviewData = () => {
    setEditMode(true);
  };

  const deleteReviewData = () => {
    dispatch(reviewsActions.reviewRemove(selectedReview));
    setSelectedReview({});
  };

  const setStarRate = (starRate) => {
    setSelectedReview({ ...selectedReview, starRate: starRate });
  };

  return (
    <div className="reviewHistoryPage-content-wrapper">
      <aside className="reviewHistoryPage-aside">
        {reviews.length !== 0 &&
          reviews.map((review, index) => {
            return (
              <Card
                key={index}
                className={"cursor-point"}
                style={{
                  textAlign: "center",
                  marginTop: "3%",
                  marginBottom: "3%",
                }}
                color={"primary"}
                onClick={() => {
                  setEditMode(false);
                  setSelectedReview(review);
                }}
              >
                <h3>{review.placeName}</h3>
                <StarRate
                  maxStarCount={5}
                  starRate={review.starRate}
                  isAdjustable={false}
                />
                <div style={{ marginTop: ".5rem" }}>{review.placeAddress}</div>
              </Card>
            );
          })}
        {reviews.length === 0 && (
          <Card
            style={{
              position: "absolute",
              left: "20%",
              right: "20%",
              top: "30%",
              textAlign: "center",
              fontSize: "xx-large",
              fontWeight: "900",
              color: "#F9F9F9",
              backgroundColor: "#610C63",
              textShadow: "1px 1px 5px grey",
            }}
          >
            {"리뷰가 비어있습니다."}
          </Card>
        )}
      </aside>
      {/* 선택된 리뷰가 있을 때 표시 */}
      {Object.keys(selectedReview).length !== 0 && (
        <main className="reviewHistoryPage-main">
          <header style={{ textAlign: "center" }}>
            <h2>{selectedReview.placeName}</h2>
            {editmode === true && (
              <StarRate
                maxStarCount={5}
                starRate={selectedReview.starRate}
                setStarRate={setStarRate}
                style={{ fontSize: "150%" }}
              />
            )}
            {editmode === false && (
              <StarRate
                maxStarCount={5}
                starRate={selectedReview.starRate}
                isAdjustable={false}
                style={{ fontSize: "150%" }}
              />
            )}
            <div>{selectedReview.placeAddress}</div>
          </header>
          <section style={{ height: "50%", margin: "2%", textAlign: "center" }}>
            <Textarea
              value={selectedReview.reviewText}
              color={editmode ? "primary" : "secondary"}
              resize={false}
              size={"lg"}
              disabled={editmode === true ? false : true}
              style={{
                fontSize: "large",
              }}
              onChange={(e) => {
                setSelectedReview({
                  ...selectedReview,
                  reviewText: e.target.value,
                });
              }}
            />
          </section>
          {selectedReview.imageURL && selectedReview.imagefiles && (
            <section style={{ height: "18%" }}>
              <a
                href={`${selectedReview.imageURL}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${selectedReview.imageURL}`}
                  style={{
                    height: "100%",
                    display: "flex",
                    margin: "1rem auto 1rem auto",
                    borderRadius: "1rem",
                    boxShadow: "1px 1px 5px grey",
                  }}
                  alt={selectedReview.imagefiles.name}
                />
              </a>
            </section>
          )}
          <footer style={{ display: "flex", justifyContent: "flex-end" }}>
            {editmode === true && (
              <Button
                size={"sm"}
                style={{ margin: "0 10px 0 10px" }}
                onClick={saveReviewData}
              >
                저장
              </Button>
            )}
            {editmode === false && (
              <Button
                size={"sm"}
                style={{ margin: "0 10px 0 10px" }}
                onClick={editReviewData}
              >
                수정
              </Button>
            )}
            <Button
              size={"sm"}
              color={"danger"}
              style={{ backgorundColor: "red" }}
              onClick={deleteReviewData}
            >
              삭제
            </Button>
          </footer>
        </main>
      )}
    </div>
  );
};

export default ReviewHistory;
