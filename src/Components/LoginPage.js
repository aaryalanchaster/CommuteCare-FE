import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login, loginHelper } from "../Routes/Login/AuthService";
import loginImg from "../Assets/home-page.jpg";
import logo from "../Assets/logo.jpg";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { FormControl, NativeSelect } from "@mui/material";

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const LoginPage = (props) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, seterror] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = new useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setEmailError(t("errorEmail"));
      setEmailFlag(true);
      return true;
    } else {
      setEmailError("");
      setEmailFlag(false);
      return false;
    }
  };

  const handlePasswordChange = (password) => {
    if (!validatePassword(password)) {
      setPasswordError(
        t("errorPassword")
      );
      setPasswordFlag(true);
      return true;
    } else {
      setPasswordError("");
      setPasswordFlag(false);
      return false;
    }
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (validateEmail(email) || handlePasswordChange(password)) {
      if (email.length === 0) {
        setEmailError(t("errorEmail"));
      }
      if (password.length === 0) {
        setPasswordError(t("errorEnterPassword"));
      }
      return false;
    }
    if (props.data === "Customer") {
      try {
        await login(email, password, props.data);
        navigate("/customer");
      } catch (error) {
        console.error("error", error.response);
        seterror(error.response.data.message);
      }
    }
    if (props.data === "Helper") {
      try {
        await loginHelper(email, password, props.data);
        navigate("/helperHome");
      } catch (error) {
        console.error("error", error);
        seterror(error.response.data.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="logo">
        <img src={logo} alt="logo-img" className="logo-img"></img>
        <FormControl sx={{width: 100}}>
                    <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    >
                    <option value="en">en</option>
                    <option value="fr">fr</option>
                    </NativeSelect>
                </FormControl>
      </div>
      <div className="login-comp">
        <form className="login-form" id="login">
          {/*<h2>Login</h2>
         <h2>Login For {props.data}</h2> */}

          <div className="login-container">
            <div className="input-withIcons">
              <TextField
                id="login"
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
              {/*<input type="email" id="email" value={email}  onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }} className='input-field' required/> */}
            </div>
            {/*emailError && <div className="error">{emailError}</div> */}
          </div>

          <div className="login-container">
            <TextField
              id="login"
              label={t("PasswordLabel")}
              variant="standard"
              error={passwordFlag}
              helperText={passwordError}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300, marginTop: 3 }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            {/*<label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={handlePasswordChange} className='input-field' required />
            {passwordError && <p className="error">{passwordError}</p>} */}
          </div>

          <div className="login-links">
            <div className="forgot-password-link">
              <Link
                to="/forgotPassword"
                state={{ userType: props.data }}
                className="login-link"
              >
                {t("ForgotPasswordLabel")}
              </Link>
            </div>
            <div className="new">
              <Link
                to="/signUp"
                state={{ userType: props.data }}
                className="login-link"
              >
                {t("NewUserLabel")}
              </Link>
            </div>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="login-button">
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
              onClick={handleLoginClick}
            >
              {t("LoginBtn")}
            </Button>
          </div>
        </form>

        <div className="login-Img">
          <img src={loginImg} alt="login-img" className="logoimg" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
