import {configureStore} from '@reduxjs/toolkit';
import CountReducer from './CountSlice'
import QuestionReducer from './QuestionSlice';
import DashboardMarksSlice from './DashboardMarksSlice';
const store = configureStore({
    reducer : {
        Count : CountReducer,
        Question : QuestionReducer,
        DashMarks : DashboardMarksSlice,
    }
})

export default store;