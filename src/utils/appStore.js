import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

const appStore = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default appStore;
