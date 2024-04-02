import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
   profiledata:[]
}


const ProfileSlice = createSlice({
    name : "profiledata", 
    initialState : initialState,
    reducers : {
    
        getProfiledata :(state, action) =>{
            state.profiledata = action.payload.profiledata;
           
        },
         

    }
})

export const profileActions = ProfileSlice.actions;

export default ProfileSlice.reducer;