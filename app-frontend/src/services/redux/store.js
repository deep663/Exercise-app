import { configureStore } from "@reduxjs/toolkit";
import dailyDataReducer from "./dailyDataSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        dailyData: dailyDataReducer,
        userData: userReducer,
    },
});

export default store;