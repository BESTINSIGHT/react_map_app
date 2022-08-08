import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: [],
  reducers: {
    reviewAdd(reviews, action) {
      return (reviews = [...reviews, action.payload]);
    },
    reviewEdit(reviews) {},
    reviewRemove(reviews) {},
  },
});

export const reviewsActions = reviewsSlice.actions;

export default reviewsSlice.reducer;
