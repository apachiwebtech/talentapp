import React, { useState } from 'react'
import { useEffect } from 'react';

const useOnline = () => {
    const [isonline ,setIsonline] = useState(true);
    useEffect (() => {
      

        const handleronline = () => {
            setIsonline(true);
        } 
        
        const handleroffline = () => {
            setIsonline(false);
        } 
        
        window.addEventListener("online" ,handleronline)
        window.addEventListener("offline", handleroffline)

        return  () =>{
            window.removeEventListener("online" ,handleronline)
            window.removeEventListener("offline", handleroffline)
        }
    
            
    },[])

    return isonline ;

 
  
}

export default useOnline;