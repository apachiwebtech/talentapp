import { BASE_URL } from "../Component/BaseUrl";
import { CountActions } from "./CountSlice";
import axios from "axios";



export const getCount = (Post_id) => {


  return async (dispatch) => {

    const data = { post_id: Post_id };

    axios
      .post(`${BASE_URL}/comment`, data)
      .then((response) => {
        dispatch(CountActions.getCount({
          count: response.data,
          postId: Post_id,
        }))



      })
      .catch((error) => {
        console.log(error);
      });




  }
}

export const getgroupCount = (Post_id) => {


  return async (dispatch) => {

    const data = { post_id: Post_id };

    axios
      .post(`${BASE_URL}/group_comment`, data)
      .then((response) => {
        dispatch(CountActions.getgroupCount({
          groupcount: response.data,
          grouppostId: Post_id,
        }))



      })
      .catch((error) => {
        console.log(error);
      });




  }
}

export const getPostlikecount = () => {


  return async (dispatch) => {
   

    const data = {
      user_id: localStorage.getItem('user_id'),
    };


    axios
    .post(`${BASE_URL}/post_count`, data)
      .then((res) => {
     
        dispatch(CountActions.getPostlikecount({
          likedata: res.data,
        
        }))

      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export const getlikedata = () => {


  return async (dispatch) => {
   

    const data = {
      user_id: localStorage.getItem('user_id'),
    };


    axios
    .post(`${BASE_URL}/post_like_data`, data)
      .then((res) => {
     
        dispatch(CountActions.getpostlikedata({
          postLikeData: res.data,
        
        }))

      })
      .catch((err) => {
        console.log(err);
      });
  }
}






