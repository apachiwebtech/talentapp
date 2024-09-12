import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QuestionaireCatCard from './QuestionaireCatCard';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetList } from '../Store/QuestionActions';
import image1 from '../images/Icon_01.png';
import image2 from '../images/Icon_02.png';
import image3 from '../images/Icon_03.png';
import image4 from '../images/Icon_04.png';
import QuestionaireHeader from './QuestionairesHeader';

const QuestionCategoriesList =()=>{

    const {id} = useParams();
    console.log(id);
    console.log(typeof(id))

    const dispatch = useDispatch();

    const list = useSelector((state)=>state.Question.categoryList);
    // const getListData=(id)=>{
    //     axios.get(`http://localhost:8081/getList/${id}`)
    //     .then((res)=>{
    //         console.log(res.data);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }

    let color=""
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

    const returnTitle=(id)=>{
        switch(id) {
            case '5':
                return "Achievement";
            case '6':
                return "Daily Habits";
            case '7':
                return "Fitness";  
            default : 
            return "";
        }
    }
    let newColor = '';
    let title = '';
    useEffect(()=>{
        dispatch(GetList(id));
       
        console.log(returnColor(id));
    },[dispatch, id])

    newColor = returnColor(id);
    title = returnTitle(id);
    return (
        <>
        <QuestionaireHeader  style={{zIndex:"300"}} color={newColor} title={title} id={id}></QuestionaireHeader>
        <Container sx={{marginTop:"1rem"}}>
            {id === "5" && <div>


                <QuestionaireCatCard title={"Acedemic"} id={id} cid={1} image={image1}/>
                <QuestionaireCatCard title={"Leadership"} id={id} cid={2} image={image2}/>
                <QuestionaireCatCard title={"Individual contribution"} id={id} cid={3} image={image3} />
                <QuestionaireCatCard title={"Sport Skills"} id={id} cid={8} image={image2} />
                <QuestionaireCatCard title={"Performing Art Skills"} id={id} cid={9} image={image3} />
                <QuestionaireCatCard title={"Social Skills"} id={id} cid={10} image={image4} />
                <QuestionaireCatCard title={"Life Skills"} id={id} cid={11} image={image1} />
                {/* {
                    list.map((item)=>{
                        return <QuestionaireCatCard title={item.title} id={item.Options[0]} cid={item.cid}/>
                    })
                } */}
            </div>
            }
            {id === "6" && <div>

                <QuestionaireCatCard title={"Act of Kindness"} id={id} cid={4} image={image4} />
                <QuestionaireCatCard title={"Good Practices"} id={id} cid={5} image={image1} />
                {/* {
                    list.map((item)=>{
                        return <QuestionaireCatCard title={item.title} id={item.cat_id} cid={item.assess_question_cid}/>
                    })
                } */}
            </div>
            }
            {id === "7" && <div>

                <QuestionaireCatCard title={"Fitness"} id={7} cid={13} image={image3} />
                {/* {
                    list.map((item)=>{
                        return <QuestionaireCatCard title={item.title} id={item.cat_id} cid={item.assess_question_cid}/>
                    })
                } */}
            </div>
            }

        </Container>
        </>

    )
}

export default QuestionCategoriesList;