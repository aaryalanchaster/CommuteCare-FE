import React from 'react'
import './ReviewAndReport.css';
import logo from "../Assets/logo.jpg";
import { Alert, Button, FormControl, NativeSelect, Rating, TextField } from '@mui/material';
import { useState } from 'react';

const Review = () => {
    const [star, setstar] = useState(0);
    const [starErrorFlag, setstarErrorFlag] = useState(null);
    const [starError, setstarError] = useState("");

    const [feedback, setfeedback] = useState("");
    const [feedbackErrorFlag, setfeedbackErrorFlag] = useState(false);
    const [feedbackError, setfeedbackError] = useState("");

    

    const checkFeedback = (feedback) => {
        if(!feedback){
            setfeedbackError("Enter feedback");
            setfeedbackErrorFlag(true);
            return true;
          }
          else{
            setfeedbackError("");
            setfeedbackErrorFlag(false);
            return false;
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(checkFeedback(feedback)){
            setfeedbackError("Enter feedback");
            setfeedbackErrorFlag(true);
            return false;
          }
        if(!star){
            setstarErrorFlag(true);
            setstarError("Please select the rating")
            return false;
        }  

        //after successful submission
      
    };

  return (
    <div className='review'>
        <div className='logo'>
          <img src={logo} alt='logo-img' className='logo-img'></img>
          <FormControl sx={{width: 100}}>
                    <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    >
                    <option value="English">en-US</option>
                    <option value="French">fr-FR</option>
                    <option value="German">de-DE</option>
                    <option value="Spanish">es-ES</option>
                    </NativeSelect>
                </FormControl>
      </div>
        <div className='review-container'>
            <div className='review-contents'>
                <p className='forgot-label'>We Value Your Feedback. Help Us Improve Our Services</p>
                <div className='review-stars'>
                    <Rating
                        name="simple-controlled"
                        value={star}
                        sx={{
                            fontSize: '5rem',
                            marginTop: 5,
                            
                        }}
                        size="large"
                        onChange={(e) => {
                            setstar(e.target.value);
                        }}
                    />
                </div>
                <TextField
                        id="feedback"
                        value={feedback}
                        onChange={(e) => {
                            setfeedback(e.target.value);}}
                        placeholder="Feedback (150 wordlimit)"
                        multiline
                        rows={3}
                        maxRows={4}
                        sx={{
                            width: 400,
                            marginTop: 5,
                            marginLeft: '20%'
                        }}
                        inputProps={{ maxLength: 150 }}
                        error={feedbackErrorFlag}
                        helperText={feedbackError}
                        label='Feedback'
                        />
                <div className='review-button'>
                        <Button variant='outlined' sx={{
                            ":hover": {
                            bgcolor: "#006e5f4a",
                            borderColor: "#006E60",
                            },
                            color: "white",
                            backgroundColor: "#00720B",
                            borderColor: "#006E60",
                          }} size="large" onClick={handleSubmit}>
                            Submit
                        </Button>

                </div>
                
                    
                
            </div>
        </div>
        {
                    starErrorFlag &&
                    <Alert variant="outlined" severity="error" className='alert-left'>
                    {starError}
                  </Alert> 
                  
                }
    </div>
  )
}

export default Review