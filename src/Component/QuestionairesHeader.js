import React, {useState} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";

const QuestionaireHeader = (props)=>{

console.log(props.color)
   const navigate = useNavigate()
   const titleStyle = {
    padding: "0",
    margin: "0",
    fontWeight: "bold",
    color: "#fff",
    whiteSpace: props.title.split(' ').length > 1 ? 'nowrap' : 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const moveToPrevious=(id)=>{
    switch (id){
        case '7' : {
            return '/questionaire/6'
        }
        case '6' : {
            return '/questionaire/5'
        }
        case '5' : {
            return '/dash'
        }
        default:{
            return '/dash'
        }
    }
}
let link;

if (props.id === '5') {
  link = '/';
} else {
  link = `/questionaire/${moveToPrevious(props.id)}`;
}
console.log(props.id, "id")
    return (
        <>
<div style={{ width: "100%", zIndex: "200", background: `${props.color}`, position: "relative", height: "5rem", display: "flex", alignItems: "center", padding: "10px" }}>
           <div  style={{position:"absolute", float:"left"}}>
              
            {/* <Link to={`/questionaire/${moveToPrevious(props.id)}`}> */}
            <Link to={moveToPrevious(props.id)}>
               <ArrowBackIosIcon sx={{color:"#fff"}}/>
            </Link>
               </div>
               <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)'}}>
               <h4 style={titleStyle}>
                  {props.title}
                  </h4> 
               </div>
        </div>
        </>
    )
}

export default QuestionaireHeader;
