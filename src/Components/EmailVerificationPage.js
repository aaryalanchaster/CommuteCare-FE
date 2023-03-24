import React from 'react'
import { useState, useEffect } from "react";
import './EmailVerificationPage.css'
import { useNavigate } from 'react-router-dom';
import image from '../Assets/home-page.jpg';
import { MuiOtpInput } from 'mui-one-time-password-input'
import Button from '@mui/material/Button';

import logo from "../Assets/logo.jpg";

import { verifyOTP, resendOTP, resendOTPHelper, verifyOTPHelper, logout } from '../Routes/Login/AuthService';
import { FormControl, NativeSelect } from '@mui/material';
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const ForgotPasswordPage = (props) => {

  const { t } = useTranslation();
  const email = props.data;
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(true);
  const [otpError, setOtpError] = useState("");
  const [remainingTime, setRemainingTime] = useState(60);
  const [tryCount, setTryCount] = useState(0);

  const navigate = new useNavigate();
  const userType = localStorage.getItem('UserType');


  useEffect(() => {

    let timer;
    if (remainingTime > 0 && otpSent) {
      timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime, otpSent]);

  const handleOtpChange = (val) => {
    const re = /^[0-9\b]+$/;
    if (val === "" || re.test(val)) {
      setOtp(val);
    }
  };

  const handleSendOtp = async(event) => {
    if(userType === 'Customer'){
        try {
            await resendOTP(email);
          } catch (error) {
            console.error('error', error);
            if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
              logout();
              navigate('/');
            }
          }
    }
    if(userType ==='Helper'){
        try {
            await resendOTPHelper(email);
          } catch (error) {
            console.error('error', error);
            if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
              logout();
              navigate('/');
            }
          }
    }
    

    setOtpSent(true);
    setTryCount(0);
    setRemainingTime(60);
  };

  const handleVerify = async (event) => {
    
    console.log("Otp:", Number(otp));
    if(userType === 'Customer'){
        try {
            await verifyOTP(otp, email);
            
            navigate('/additionalDetails');
          } catch (error) {
            console.error('error', error);
            if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
              logout();
              navigate('/');
            }
            setOtpError(error.response.data.message);
            setTryCount(tryCount + 1);
            setOtp("");
            
          }
    }
    if(userType ==='Helper'){
        try {
            await verifyOTPHelper(otp, email);
            
            navigate('/additionalDetails');
          } catch (error) {
            
            console.error('error', error);
            if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
              logout();
              navigate('/');
            }
            setOtpError(error.response.data.message);
            setTryCount(tryCount + 1);
            setOtp("");
          }
    }
    

  };

  const canResendOtp = tryCount < 2;


  return (
    <div className="emailVerification">
      <div className="logo">
        <img src={logo} alt="logo-img" className="logo-img"></img>
        <FormControl sx={{ width: 100 }}>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
          >
            <option value="English">en-US</option>
            <option value="French">fr-FR</option>
          </NativeSelect>
        </FormControl>
      </div>
      <div className="emailVerificationGrid">
        <div className="emailVerificationContent">
          <div className="emailVerificationContainer">
            <p>
              {t("OTPsend")} {email}
            </p>
            <div className="otp-input">
              <MuiOtpInput value={otp} onChange={handleOtpChange} />
            </div>
            {!canResendOtp && <p>{t("TryAgain")}</p>}

            <div className="single-line">
              <div className="single-line-time">
                <p>
                  {remainingTime} {t("SecondsRemaining")}
                </p>
              </div>

              <div className="single-line-button">
                {canResendOtp && (
                  <button
                    onClick={handleSendOtp}
                    disabled={remainingTime !== 0}
                    className="link"
                  >
                    {t("ResendBtn")}
                  </button>
                )}
              </div>
            </div>
            <div className="verify">
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
                  "&.Mui-disabled": {
                    background: "#eaeaea",
                    color: "#c0c0c0",
                  },
                }}
                size="large"
                onClick={handleVerify}
                disabled={otp.length !== 4 || remainingTime === 0}
              >
                {t("VerifyBtn")}
              </Button>
            </div>

            {otpError && <div className="error">{otpError}</div>}
          </div>
        </div>
        <div className="image">
          <img src={image} alt="login-img" className="actual-img" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage