import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import DashScore from './DashScore';

const DashBarProgress= ()=>{

    const [progress, setProgress] = useState(0);

    const averageScore = useSelector((state) => state.DashMarks.AverageScore);
  
    useEffect(() => {
      const x = (averageScore / 100) * 360;
      setProgress(x);
    }, [averageScore]);

    const circleStyle = {
        '--progress': `${progress}deg`,
        display: 'flex',
        alignItems: 'center', // Added to vertically center the content
        justifyContent: 'center', // Added to horizontally center the content
        position: 'relative',
        width: '175px',
        height: '175px',
        borderRadius: '50%',
        background: 'conic-gradient(rgb(217, 214, 255) var(--progress), rgb(245, 245, 245) 0deg)',
        fontSize: 0,
      };
    
      const progressBarStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        clipPath:" circle(50px at 0 100px)" ,
        background: 'conic-gradient(rgb(217, 214, 255) var(--progress), rgb(245, 245, 245) 0deg)',
      };
      const textStyle = {
        content: `${progress / 3.6}%`, // Convert degrees to percentage
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        margin: '10px',
        borderRadius: '50%',
        background: 'white',
        fontSize: '1rem',
        textAlign: 'center',
        position: 'absolute',
      };
    
      const centerContentStyle = {
        // Additional component in the center
        width: '150px',
        height: '150px',
        background: 'rgb(247, 245, 245)',
        boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px",
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    return (
        <div style={{ position: 'relative' }}>
        <div className="pro-circle" data-progress="" style={circleStyle} id="circle">
          <div style={progressBarStyle}></div>
          <div style={centerContentStyle}>
           <DashScore/>
          </div>
        </div>
      </div>
      );
}

export default DashBarProgress;