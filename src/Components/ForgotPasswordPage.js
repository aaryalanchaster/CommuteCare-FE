import React from "react";
import { useState, useEffect } from "react";
import "./ForgotPasswordPage.css";
import logo from "../Assets/logo.jpg";

import { forgotPass, forgotPassHelper } from "../Routes/Login/AuthService";
import { Button, FormControl, NativeSelect, TextField } from "@mui/material";
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const ForgotPasswordPage = (props) => {
   const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [serror, setserror] = useState("");
  const [errorFlag, seterrorFlag] = useState(false);

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setEmailError(t("errorValidEmail"));
      setEmailFlag(true);
      return true;
    } else {
      setEmailError("");
      setEmailFlag(false);
      return false;
    }
  };

  const handleSendOtp = async (event) => {
    if (validateEmail(email)) {
      if (email.length === 0) {
        setEmailError(t("errorEmail"));
        setEmailFlag(true);
      }
      return false;
    }
    if (props.data === "Customer") {
      console.log(props.data);
      try {
        await forgotPass(email, props.data);
      } catch (error) {
        console.log("error", error);
        setserror(error.response.data);
        seterrorFlag(true);
        console.log("flg", errorFlag)
      }
    }
    if (props.data === "Helper") {
      try {
        await forgotPassHelper(email, props.data);
      } catch (error) {
        console.error("error", error);
      }
    }

    setOtpSent(true);
  };

  return (
    <div className="forgot">
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
            <option value="en">en-US</option>
            <option value="fr">fr-FR</option>
          </NativeSelect>
        </FormControl>
      </div>
      <div className="forgot-container">
        {!otpSent ? (
          <div className="forgot-component">
            <label htmlFor="email" className="forgot-label">
              Forgot Your Password? No Problem.{" "}
            </label>
            <label className="forgot-label">
              Let Us Help You Regain Access
            </label>
            <br></br>
            <TextField
              id="signUp"
              label={t("EmailLabel")}
              variant="standard"
              error={emailFlag}
              helperText={emailError}
              type={"email"}
              sx={{ width: 300, marginTop: 3 }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <br></br>
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
                marginTop: 4,
              }}
              size="large"
              onClick={handleSendOtp}
            >
              {t("SubmitBtn")}
            </Button>
          </div>
        ) : (
          <div className="forgot-component">
            {errorFlag ? (
              <p className="forgot-label">{serror}</p>
            ) : (
              <p className="forgot-label">
                Password reset link has been sent to {email}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
