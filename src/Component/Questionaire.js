import React, { useEffect, useState } from "react";
import classes from './Questionaire.module.css';
import { BASE_URL } from "./BaseUrl";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { GetQuestions } from '../Store/QuestionActions'
import getPoints from '../Store/DashboardMarksActions';
import { useNavigate } from "react-router-dom";
import {goBack, goNext} from './moveToNextSection'
import Loader from "./Loader";
import QuestionaireHeader from "./QuestionairesHeader";
const Questionaire = (props) => {
    const { id, cid } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetQuestions(id, cid));
    }, [dispatch, id, cid]);


    const navigate = useNavigate();
    const questiosss = useSelector((state) => state.Question.questions);
    const [answerData, setAnswerData] = useState(null); // Define answerData using useState
    const [quizIsCompleted, setQuizIsCompleted] = useState(false);
    console.log(questiosss.length);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const currentQuest = questiosss[currentQuestion] || {};
    console.log(currentQuest, "current Question");
    // const { questionText, options, correctAnswer, qID, points } = currentQuest;
    const { questionText, options, correctAnswer, cId, catId, answerID, qid, question_type } = currentQuest;

    console.log(currentQuest, "lets see whats here");
    console.log(qid, question_type, answerID)
    const [answerIndex, setAnswerIndex] = useState(null);
    const [answer, setAnswer] = useState(null);
    // const [result, setResult] = useState(resultInitialState);

    const goToPrevious=()=>{
        if(currentQuestion ===0){
            
            const arr = goBack(id, Number(cid))
            console.log(arr);
            let  newId = arr[0];
            let  newCid = arr[1];

            // if(newId === '5'&& newCid == 1){
            //     navigate(`/questionaire/5/2`);
            //  }
            //  else if(newId === '5'&& newCid == 2){
            //     navigate('/dash')
            //  }
            //  else{

            //     navigate(`/questionaire/${newId}/${newCid}`);   
            // }
            if (id === '5' && cid == 1) {
                navigate(`/questionaire/5/2`);
              } else if (id === '5' && cid == 2) {
                navigate('/dash');
              } else {
                navigate(`/questionaire/${newId}/${newCid}`);
              }
              

        }else{

            setCurrentQuestion((prev) => prev - 1)
            setAnswerIndex(answerIndex);
        }
            console.log(currentQuestion, "current answer index")
    }
    const onAnswerClick = (answer, index, points) => {
        const userId = localStorage.getItem('user_id'); // Retrieve userId from localStorage

        setAnswerIndex(index);

        console.log('Points:', points);
        console.log('User ID:', userId);
        console.log("qid",qid);
        console.log("answer_type",question_type);
        console.log("answerId", answerID);
        console.log("cId", cId)
        const newAnswerData = {
            qid : qid,
            question_type : question_type,
            answerId : answerID,
            user_id : userId,
            points: points,
            cid : cId,
            cat_id: catId,
        }

        setAnswerData(newAnswerData);
        // setAnswerIndex(null);

        
    }



    const postData = () =>{
        axios.post(`${BASE_URL}/postQuestionData`,answerData)
        .then((res)=>{
            console.log('answer sent to backend')
            if (currentQuestion === questiosss.length - 1) {
                setQuizIsCompleted(true); // Set quizCompleted to true after submitting the last question
            }
        }).catch((err)=>{
            console.log(err);
        })
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
        setAnswer(null);
        if (currentQuestion !== questiosss.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
            setAnswerIndex(null);
        } else {
            setCurrentQuestion(0);
            setQuizIsCompleted(true);
        }

        if(currentQuestion === questiosss.length - 1){

            // console.log(goNext(id, Number(cid)));
            let arr = goNext(id, Number(cid)) 

            let  newId = arr[0];
            let  newCid = arr[1];

            console.log(newId, newCid);

            let nextUrl = `questionaire/${newId}/${newCid}`; // Construct the next URL

            if(id == '7' && cid == 13){
                navigate('/dash')
                return;
            }else{

                navigate(`/questionaire/${newId}/${newCid}`);   
            }
              } 
    }
    let newColor = '';
    let title = '';

    const returnColor = (id) => {
        switch (id) {
            case "5":
                return '#f6d331';
            case "6":
                return '#34b3ad';
            case "7":
                return '#ec3857';
            default:
                return '#ec3857'; // or any default color for other cases
        }
    };

    const returnTitle = (id) => {
        switch (id) {
            case '1':
                return "Leadership";
            case '2':
                return "Acedemic";
            case '3':
                return "Individual contribution";
            case '4':
                return "Act of kindness";
            case '5':
                return "Good Practices";
            case '8':
                return "Sports Skills";
            case '9':
                return "Performing art skills";
            case '10':
                return "Social skills";
            case '11':
                return "Life skills";
            case '13':
                return "Fitness";
            default:
                return "";
        }
    }
    newColor = returnColor(id);
    title = returnTitle(cid);

    const getAnswer = async()=>{
        const response = await fetch(`${BASE_URL}/getselectedanswer`, {
            method : "POST",
            body : JSON.stringify({
                user_id : localStorage.getItem('user_id'),
                qid : currentQuest.qid,
            }),
            headers : {
                'Content-Type':'application/json',
            }
        })

        const data = await response.json();
        console.log(data[0].points)
        const index = Object.entries(options).findIndex(([option, point]) => point === data[0].points);
    if (index !== -1) {
        setAnswerIndex(index); // Set the answerIndex if found
    }
    }
    useEffect(()=>{

        if(questiosss.length !== 0){

            getAnswer();
        }
    }, [questiosss.length, qid])
    return (
        <>
                <QuestionaireHeader  style={{zIndex:"300"}} color={newColor} title={title} id={id} cid = {cid}></QuestionaireHeader>

       
        <div className={classes["quiz-container"]}>
            { questiosss.length > 0 ?  (
                <>
                    <>
                <span className={classes["active-question"]}>{currentQuestion + 1}</span>
                <span className={classes["total-questions"]}>/{questiosss.length}</span>
            </>
            <h2>{questionText}</h2>
            <ul>
                
              
{options &&
        Object.entries(options).map(([option, point], index) => (
            <li
                onClick={() => onAnswerClick(option, index, point)}
                key={option}
                className={answerIndex === index ? classes['selectedAnswer'] : ""}
            >
                {option}
            </li>
        ))
    }
    

            </ul>
            <div className={classes["footer"]}>
                
                <button onClick={goToPrevious} className={classes["SecondaryButton"]}>
                    previous
                </button>
                <button className={classes["Button"]} onClick={postData}     disabled={answerIndex === null}
>
                    {currentQuestion === questiosss.length - 1 ? "Finish" : "Submit"}
                </button>
            </div>
                </>
            ) : (
                <Loader/>
            )}
        </div>
        </>
    )
}

export default Questionaire;
