
import { BASE_URL } from "../Components/Utils/BaseUrl";
import { profileActions } from "./ProdataSlice";
import axios from "axios";




export const getProfiledata = () => {


  return async (dispatch) => {
   

    const data = {
     user_id: localStorage.getItem('user_id'),
    };


    axios
    .post(`${BASE_URL}/profile_data`, data)
      .then((res) => {
     
        dispatch(profileActions.getProfiledata({
          profiledata: res.data,
        }))

      })
      .catch((err) => {
        console.log(err);
      });
  }
}






