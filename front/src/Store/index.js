import {configureStore} from '@reduxjs/toolkit';
import CountReducer from './CountSlice'
import QuestionReducer from './QuestionSlice';
import DashboardMarksSlice from './DashboardMarksSlice';
import ProfileReducer from './ProdataSlice';
const store = configureStore({
    reducer : {
        Count : CountReducer,
        Question : QuestionReducer,
        DashMarks : DashboardMarksSlice,
        ProData : ProfileReducer
    }
})

export default store;