import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: [],
  reducers: {
    //기존에 존재하는 값이 있는지 조회 후 추가 및 수정하도록 해야 함
    reviewAdd(reviews, action) {
      let editedData = [];

      if (reviews.length === 0) {
        editedData = [action.payload];
      }
      if (reviews.length > 0) {
        const alredyExist =
          reviews.filter((review) => review.placeId === action.payload.placeId)
            .length === 0
            ? false
            : true;

        if (alredyExist === true) {
          editedData = reviews.map((review) => {
            if (review.placeId === action.payload.placeId) {
              return action.payload;
            } else return review;
          });
        }
        if (alredyExist === false) {
          editedData = reviews.concat([action.payload]);
        }
      }

      return (reviews = editedData);
    },
    reviewEdit(reviews, action) {
      const editedData = reviews.map((review) => {
        if (review.placeId === action.payload.placeId) {
          return action.payload;
        } else return review;
      });

      return (reviews = editedData);
    },
    reviewRemove(reviews, action) {
      const editedData = reviews.filter((review) =>
        review.placeId === action.payload.placeId ? false : true
      );
      return (reviews = editedData);
    },
  },
});

export const reviewsActions = reviewsSlice.actions;

export default reviewsSlice.reducer;
