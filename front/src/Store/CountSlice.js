import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    count : [],
    groupcount : [],
    likedata : [],
    postLikeData : [],
    postId : null,
    grouppostId :null,
}


const CountSlice = createSlice({
    name : "count", 
    initialState : initialState,
    reducers : {
        getCount  : (state, action)=>{
            state.count = action.payload.count;
            state.postId = action.payload.postId
         
        },
        getgroupCount  : (state, action)=>{
            state.groupcount = action.payload.groupcount;
            state.grouppostId = action.payload.grouppostId;
         
        },
        getPostlikecount :(state, action) =>{
            state.likedata = action.payload.likedata;
            state.postId = action.payload.postId ;
           
        }  ,
        getpostlikedata :(state, action) =>{
            state.postLikeData = action.payload.postLikeData;
            // state.postId = action.payload.postId ;
           
        }  ,
      

    }
})

export const CountActions = CountSlice.actions;

export default CountSlice.reducer;