import React, { useEffect } from 'react'
import './ReviewAndReport.css';
import logo from "../Assets/logo.jpg";
import { Alert, Button, FormControl, NativeSelect, Rating, TextField } from '@mui/material';
import { useState } from 'react';
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
import CustomNav from './CustomNav';
const Review = () => {
  const { t } = useTranslation();
    const [star, setstar] = useState(0);
    const [starErrorFlag, setstarErrorFlag] = useState(null);
    const [starError, setstarError] = useState("");

    const [feedback, setfeedback] = useState("");
    const [feedbackErrorFlag, setfeedbackErrorFlag] = useState(false);
    const [feedbackError, setfeedbackError] = useState("");

    

    const checkFeedback = (feedback) => {
        if(!feedback){
            setfeedbackError(t("errorFeedback"));
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
            setfeedbackError(t("errorFeedback"));
            setfeedbackErrorFlag(true);
            return false;
          }
        if(!star){
            setstarErrorFlag(true);
            setstarError(t("errorRating"));
            return false;
        }  

        //after successful submission
      
    };

    useEffect(() => {
        
      i18n.changeLanguage(localStorage.getItem('lang'));
      console.log('lang--',localStorage.getItem('lang'))
      
    }, [])

  return (
    <div className='review'>
        <CustomNav />
      <div className="review-container">
        <div className="review-contents">
          <p className="forgot-label">{t("FeedbackTitle")}</p>
          <div className="review-stars">
            <Rating
              name="simple-controlled"
              value={star}
              sx={{
                fontSize: "5rem",
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
              setfeedback(e.target.value);
            }}
            placeholder={t("FeedbackPH")}
            multiline
            rows={3}
            maxRows={4}
            sx={{
              width: 400,
              marginTop: 5,
              marginLeft: "20%",
            }}
            inputProps={{ maxLength: 150 }}
            error={feedbackErrorFlag}
            helperText={feedbackError}
            label="Feedback"
          />
          <div className="review-button">
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
              }}
              size="large"
              onClick={handleSubmit}
            >
              {t("SubmitBtn")}
            </Button>
          </div>
        </div>
      </div>
      {starErrorFlag && (
        <Alert variant="outlined" severity="error" className="alert-left">
          {starError}
        </Alert>
      )}
    </div>
  );
}

export default Review