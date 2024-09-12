import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className='error'>
          
            <div class="error-container">
                <h1 className='h1-404'> 404 </h1>
                <p className='p-404'>
                    Oops! The page you're
                    looking for is not here.
                </p>
            <Link to="/dash" className='back-home'>Back to home</Link>
            </div>
       
         
          
        </div>
    )
}

export default ErrorPage