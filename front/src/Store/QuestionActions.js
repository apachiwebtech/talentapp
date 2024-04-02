
import { BASE_URL } from '../Components/Utils/BaseUrl';
import {QuestionActions} from './QuestionSlice';
import axios from 'axios';


// export const GetQuestions =(id, cid)=>{
//     return async (dispatch)=>{
       
        
//         axios.get(`${BASE_URL}/getQuestions/${id}/${cid}}`)
//           .then((response) => {
//             console.log(response, "this is this response");
//            dispatch(QuestionActions.getQuestions({
//             questions : response.data || [],
//            }))
            
//           })
//           .catch((error) => {
//             console.log(error);
//           });    
//     }
// }


// export const GetQuestions = (id, cid) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getQuestions/${id}/${cid}`);

//       // Extracting questions and options
//       const formattedQuestions = response.data.map(question => ({
//         questionText: question.question,
//         options: question.Options.map(option => option.option_value),
//         points: question.Options.map(option => option.points),
//         qID: question.id
//         // Add other fields you need from the response
//       }));

//       console.log(formattedQuestions);
//       dispatch(QuestionActions.getQuestions({
//         questions: formattedQuestions || [],
//       }));

//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
export const GetQuestions = (id, cid) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/getQuestions/${id}/${cid}`);

      // Extracting questions and options
      const formattedQuestions = response.data.map(question => ({
        questionText: question.question,
        options: question.Options.reduce((acc, option) => {
          acc[option.option_value] = option.points;
          return acc;
        }, {}),
        answerID: question.id,
        qid: question.question_id,
        question_type : question.answer_type,
        cId : question.cid,
        catId : question.cat_id,
        // Add other fields you need from the response
      }));

      console.log(formattedQuestions);
      dispatch(QuestionActions.getQuestions({
        questions: formattedQuestions || [],
      }));

    } catch (error) {
      console.error(error);
    }
  }
}
export const GetList = (id)=>{
  return async (dispatch)=>{
    axios.get(`${BASE_URL}/getList/${id}`)
        .then((res)=>{
            console.log(res.data);
            dispatch(QuestionActions.getList({
              list : res.data || [],
            }))
        }).catch((err)=>{
            console.log(err);
        })
  }
}