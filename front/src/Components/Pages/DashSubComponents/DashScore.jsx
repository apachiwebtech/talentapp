import React from "react";
import { useSelector } from "react-redux";
import classes from "./DashScore.module.css";
const DashScore = (props)=>{

    const AverageScore = useSelector((state)=> state.DashMarks.AverageScore);
    const cat1 = useSelector((state)=> state.DashMarks.cat1);
    const cat2 = useSelector((state)=> state.DashMarks.cat2);
    const cat3 = useSelector((state)=> state.DashMarks.cat3);
    return (
        <div className={classes.container}>
        <h6>Total Score</h6>
            <h1>
                {AverageScore} 
            </h1>
            <div className={classes.sectionScores}>
            <p className={classes.section5} >{cat1}</p>
            <span></span>
            <p className={classes.section6} >{cat2}</p>
            <span></span>
            <p className={classes.section7} >{cat3}</p>

            </div>
        </div>
    )
}

export default DashScore;