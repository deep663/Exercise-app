import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    day: 0,
    dietPlan: {},
    workoutPlan: [],
    tips: "",
    completed: false,
};

const dailyDataSlice = createSlice({
    name: "dailyData",
    initialState,
    reducers: {
        setDailyData: (state, action) => {
            return { ...state, ...action.payload };
        },
        setDayComplete: (state, action) => {
            (state.completed = action.payload );
        }
    },
});

export const { setDailyData } = dailyDataSlice.actions;
export default dailyDataSlice.reducer;