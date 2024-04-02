import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions : [],
    categoryList:[]
}

const QuestionsSlice = createSlice({
    name:"QuestionSLice",
    initialState : initialState,

    reducers : {
        getQuestions(state, action){
            state.questions = action.payload.questions;
        },
        getList(state, action){
            state.categoryList = action.payload.list;
        }
    }
})

export const QuestionActions = QuestionsSlice.actions;

export default QuestionsSlice.reducer;