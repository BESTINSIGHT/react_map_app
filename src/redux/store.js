import { createStore } from "redux";

const reviewsReducer = (reviews = [], action) => {
  if(action.type === "add") {
    return [...reviews, action.review]
  }
  if(action.type === "edit") {

  }
  if(action.type === "remove") {

  }

  return reviews
}

const store = createStore(reviewsReducer);

export default store;
