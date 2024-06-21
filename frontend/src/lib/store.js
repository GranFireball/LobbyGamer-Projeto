import { configureStore } from "@reduxjs/toolkit";
import pageSelectedReducer from "./features/pageSlicer";

export default configureStore({
  reducer: {
    pageSelected: pageSelectedReducer
  }
})