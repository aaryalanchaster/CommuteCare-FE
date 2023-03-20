import React from 'react';
import './Booked.css';
import { useEffect } from 'react';
import { useState } from 'react';

import { bookingHelper, logout } from '../Routes/Login/AuthService';

import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

import bookImg from "../Assets/booked.jpg";
import { Button } from '@mui/material';


const Booked = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setresult] = useState(""); 
  const [error, seterror] = useState("");

  const navigate = useNavigate();

  const [jwtError, setjwtError] = useState("");

  //console.log(props.PersonId, props.Day,props.Time, props.Duration);


  useEffect(() => {

    const fetchData = async () => {
      try {
          setIsLoading(true);
          await bookingHelper(props.PersonId, props.Day, props.Time, props.Duration, props.Date, props.Location, props.Comments).then(
            (response) => {
              setresult(response.data)
            }
          );
          console.log("Response:",result);
        } catch (error) {
          console.error("Inside ",error.response.data);
          seterror(error.response.data)
          console.error('error', error);
          setjwtError(error.response.data.message);
          
          if(jwtError==="jwt expired" || jwtError==='jwt malformed'){
            console.log("Hello")
            logout();
            navigate('/');
          }
          setIsLoading(false);
        }
        setIsLoading(false);
    }
    
    fetchData();                      
    
    
  }, []);


   
  return (
    
    <div className='booked'>
      { isLoading? <>
        <div className='loading'><ReactLoading type="spin" color="#000" />
        
        </div>
      </> :
      <div className='booked-container'>
        <div className='booked-container-left'> 

        {error ? <span>Error: {error}</span> : <>
          {result === 'You have already booked a helper in this time slot' || result === 'Booking declined' ? <>{result}</>:
          <div className='booked-content'>
            <h1>Your booking has been sent to the helper !</h1>
            
            <p>Helper Name:&nbsp;&nbsp;&nbsp;{props.PersonName} </p>
            <p>Day: &nbsp;&nbsp;&nbsp;{props.Day}</p>
            <p>Date: &nbsp;&nbsp;&nbsp; {props.Date}</p>
            <div className='booked-buttons'>
            <Button
                      variant="outlined"
                      sx={{
                        ":hover": {
                          bgcolor: "#006e5f4a",
                          borderColor: "#006E60",
                        },
                        color: "white",
                        backgroundColor: "#00720B",
                        borderColor: "#006E60",
                        width: 100,
                      }}
                      
                      onClick={(e) => {
                        navigate('/');
                      }}

                    >Home</Button>
                    
            </div>
          </div>}
        
        </>} 
        
        </div>
        <div className='home-Img'>
                    <img  src={bookImg} alt='logo-img' className='homeimg'/>
        </div>
        
      </div>
      }
    </div>
    
  )
}

export default Booked