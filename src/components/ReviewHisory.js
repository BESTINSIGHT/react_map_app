import { useEffect, useReducer, useState } from "react";
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
                onClick={() => {
                  setEditMode(false);
                  setSelectedReview(review);
                }}
              >
                <header>{review.placeName}</header>
                <StarRate
                  maxStarCount={5}
                  starRate={review.starRate}
                  isAdjustable={false}
                />
                <div>{review.placeAddress}</div>
              </Card>
            );
          })}
        {reviews.length === 0 && (
          <Card style={{ textAlign: "center" }}>{"리뷰가 비어있습니다."}</Card>
        )}
      </aside>
      {Object.keys(selectedReview).length !== 0 && (
        <main className="reviewHistoryPage-main" style={{ border: "none" }}>
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
              resize={false}
              size={"lg"}
              disabled={editmode === true ? false : true}
              style={{ fontSize: "large" }}
              onChange={(e) => {
                setSelectedReview({
                  ...selectedReview,
                  reviewText: e.target.value,
                });
              }}
            />
          </section>
          <section>{/* 지도 표시 */}</section>
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
