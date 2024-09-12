import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

import { Link } from 'react-router-dom';
export default function QuestionaireCatCard(props) {
  const theme = useTheme();

  return (
    <Link to={`/questionaire/${props.id}/${props.cid}`}>
    <Box sx={{ padding: "10px"}}>
    <Card sx={{ display: 'flex', justifyContent: "space-between", borderRadius: "10px", boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px " }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between", width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
          <img src={props.image} alt="iconImage" style={{ width: "100%", height: '100%', color: "white", background:"#e73758", borderRadius:"10px" }} />
          <CardContent  sx={{ whiteSpace: 'nowrap', padding:"0.5rem", display:"flex", textAlign:"center",alignItems:"center",justifyContent:"center",margin:"auto 0" }}>
            <Typography variant="p" sx={{ whiteSpace: 'nowrap', padding:"0" }}>
              {props.title}
            </Typography>
          </CardContent>
        </Box>
        <Link to={`/questionaire/${props.id}/${props.cid}`} style={{marginRight:"10px"}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ background:"#e73758", height:"30px", width:"30px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <ArrowForwardIcon sx={{ color: "white" }} />
            </Box>
            <Typography variant='p' sx={{whiteSpace: 'nowrap', fontSize:"0.75rem", marginTop: "5px" }}>
               
            </Typography>
          </Box>
        </Link>
      </Box>
    </Card>
  </Box>
</Link>
  );
  
}
