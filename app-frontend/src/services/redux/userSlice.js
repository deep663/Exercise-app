import { createSlice } from "@reduxjs/toolkit";;

const initialState = {
    completedTasks: [],
    points: 0,
    streak: 0,
    remainingTasks:0,
};

const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return {...state, ...action.payload };
        },
    }, 
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;