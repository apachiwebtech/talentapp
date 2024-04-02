import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    AverageScore : 0,
    cat1 : 0,
    cat2 : 0,
    cat3 : 0.
}

const DashboardMarksSlice = createSlice({
    name : "DashMarks",
    initialState : initialState,

    reducers : {
        dashScore : (state, action)=>{
            const newDashScore = action.payload;
            state.AverageScore =newDashScore.averageScore;
            state.cat1 = newDashScore.cat1;
            state.cat2 = newDashScore.cat2;
            state.cat3 = newDashScore.cat3;
            console.log(newDashScore)
        }
    }

})

export const { dashScore } = DashboardMarksSlice.actions;
export default DashboardMarksSlice.reducer;