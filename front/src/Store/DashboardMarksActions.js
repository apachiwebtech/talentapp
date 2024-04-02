
import { BASE_URL } from "../Components/Utils/BaseUrl";
import { dashScore} from "./DashboardMarksSlice";
import axios from "axios";

export const getPoints2= ()=>{
  return async(dispatch)=>{
    try{
      const user_id = localStorage.getItem('user_id'); // Retrieve user_id here
      const response = await axios.post(`${BASE_URL}/updateDashboardScore`,{ user_id });
      console.log(response.data);
      dispatch(dashScore(response.data));
    }catch(error){
      console.log(error);
    }
  }
}
export default getPoints2;
