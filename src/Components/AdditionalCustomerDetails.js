import React, { useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import './SignUpPage.css'

import image from '../Assets/home-page.jpg';

import { additionalDetails, logout } from '../Routes/Login/AuthService';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';
import { Avatar, Button, FormHelperText, NativeSelect } from '@mui/material';
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
import CustomNav from './CustomNav';

import ReactLoading from 'react-loading';


const AdditionalCustomerDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [fnameErrorFlag, setfnameErrorFlag] = useState(false);
  const [fnameError, setfnameError] = useState("");
  const [lnameErrorFlag, setlnameErrorFlag] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [dob, setDob] = useState(null);
  const [dobErrorFlag, setdobErrorFlag] = useState(false);
  const [dobError, setdobError] = useState("");
  const [gender, setGender] = useState("");
  const [genderErrorFlag, setgenderErrorFlag] = useState(false);
  const [genderError, setgenderError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [photo, setPhoto] = useState(null);
   const [previewImage, setPreviewImage] = useState(null);


  const [phone, setPhone] = useState("");
  const [phoneErrorFlag, setPhoneErrorFlag] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryCodeErrorFlag, setcountryCodeErrorFlag] = useState(false);
  const [countryCodeError, setcountryCodeError] = useState("");
const { t } = useTranslation();
  const navigate = new useNavigate();

  const handleFirstNameChange = (firstName) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(firstName)) {
      setfnameError(t(""));
      setfnameErrorFlag(true);
      return true;
    }
    else{
      setfnameError('');
      setfnameErrorFlag(false);
      return false;
    }
  };

  const handleLastNameChange = (lastName) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(lastName)) {
      setlnameError(t("errorAlphabets"));
      setlnameErrorFlag(true);
      return true;
    }
    else{
      setlnameError('');
      setlnameErrorFlag(false);
      return false;
    }
  };

  const handleGenderChange = (gender) => {
    if(!gender){
      setgenderError(t("errorGender"));
      setgenderErrorFlag(true);
      return true;
    }
    else{
      setgenderError("");
      setgenderErrorFlag(false);
      return false;
    }
  };

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size > 20000000) {
      alert(t("errorFile"));
      return;
    }
    setPhoto(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handlePhoneChange = (phone) => {
    const regex = /^\d{10}$/;
    if (!regex.test(phone)) {
      setPhoneError(t("errorNumber"));
      setPhoneErrorFlag(true);
      return true;
    }
    else{
      setPhoneError('');
      setPhoneErrorFlag(false);
      return false;
    }
  };

  const handleCountryCodeChange = (countryCode) => {
    if(!countryCode){
      setcountryCodeError(t("errorCountryCode"));
      setcountryCodeErrorFlag(true);
      return true;
    }
    else{
      setcountryCodeError("");
      setcountryCodeErrorFlag(false);
      return false;
    }
  };

  const handleDobChange = (dob) => {
    if(!dob || dobErrorFlag){
      setdobError(t("errorDOB"));
      setdobErrorFlag(true);
      return true;
    }
    else{
      setdobError("");
      setdobErrorFlag(false);
      return false;
    }
  }

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleFirstNameChange(firstName) || handleLastNameChange(lastName) || handlePhoneChange(phone) || handleDobChange(dob)
        || handleCountryCodeChange(countryCode) || handleGenderChange(gender)
    ){
      if(firstName.length === 0){
        setfnameError(t("errorFirstName"));
        setfnameErrorFlag(true);
      }
      if(lastName.length === 0){
        setlnameError(t("errorLastName"));
        setlnameErrorFlag(true);
      }
      if(phone.length === 0){
        setPhoneError(t("errorPhoneNumber"));
        setPhoneErrorFlag(true);
      }
      if(!dob){
        setdobError(t("errorDOB"));
        setdobErrorFlag(true);
      }
      if(!gender){
        setgenderErrorFlag(true);
      }
      if(!countryCode){
        setcountryCodeErrorFlag(true);
      }
      return false;
    }
    const date = (dob.$M +1)+"/"+dob.$D+"/"+dob.$y;
    console.log("dob: ", date);
    try {
      setisLoading(true);
      await additionalDetails(firstName, lastName, gender, date, phone, photo);
      navigate("/customer");
    } catch (error) {
      console.error('error', error);
      if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
        logout();
        navigate('/');
      }
    }
    setisLoading(false);
  };

  useEffect(() => {
        
    i18n.changeLanguage(localStorage.getItem('lang'));
    console.log('lang--',localStorage.getItem('lang'))
    
  }, [])
  

  return (
    <div className="signUp">
      <CustomNav />
      {isLoading? <div className='loading'><ReactLoading type="spin" color="#000" /></div> : <>
      <div className="signup-grid">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="addtionalC-container">
            <div className="addtionalC-field">
              <TextField
                id="signUp"
                label={t("FirstNameLabel")}
                variant="standard"
                error={fnameErrorFlag}
                helperText={fnameError}
                type={"text"}
                sx={{ width: 300, marginTop: 2 }}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                inputProps={{ pattern: "[A-Za-z ]+" }}
                required
              />
            </div>
            <div className="addtionalC-field">
              <TextField
                id="signUp"
                label={t("LastNameLabel")}
                variant="standard"
                error={lnameErrorFlag}
                helperText={lnameError}
                type={"text"}
                sx={{ width: 300, marginTop: 3 }}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                inputProps={{ pattern: "[A-Za-z ]+" }}
                required
              />
            </div>
            <div className="addtionalC-field">
              <div className="addtionalC-date">
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                  <DatePicker
                    variant="standard"
                    value={dob}
                    label={t("DateofBirthLabel")}
                    onChange={(newValue) => {
                      if(newValue>new Date()  || newValue.$d.toString()==='Invalid Date'){
                          
                        setdobErrorFlag(true);
                        
                      }else{
                        setDob(newValue);
                        setdobErrorFlag(false);
                        //console.log("dob:",dob);
                      }
                    }}
                    maxDate={new Date()}
                    required
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: "100%" }}
                        {...params}
                        error={dobErrorFlag}
                        helperText={dobError}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="addtionalC-field">
              <FormControl
                variant="standard"
                fullWidth
                sx={{ width: 300, marginTop: 4.3, textAlign: "left" }}
                error={genderErrorFlag}
              >
                <InputLabel id="gender">{t("GenderLabel")}</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={gender}
                  label={t("GenderLabel")}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  required
                >
                  <MenuItem value="Male">{t("MaleGender")}</MenuItem>
                  <MenuItem value="Female">{t("FemaleGender")}</MenuItem>
                  <MenuItem value="Others">{t("OtherGender")}</MenuItem>
                  <MenuItem value="Prefer not to say">
                    {t("PreferNSGender")}
                  </MenuItem>
                </Select>
                <FormHelperText>
                  {genderErrorFlag ? t("errorGender") : ""}
                </FormHelperText>
              </FormControl>
            </div>

            

            <div className="addtionalC-field">
              <div className="addtionalC-phone-input">
                <FormControl
                  variant="standard"
                  sx={{ width: 120, marginTop: 4.3 }}
                  error={countryCodeErrorFlag}
                >
                  <InputLabel id="country-code">Country Code</InputLabel>
                  <Select
                    labelId="country-code"
                    id="country-code"
                    value={countryCode}
                    label={t("CountryCodeLabel")}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                    }}
                    required
                  >
                    <MenuItem value={+1}>+1 (USA/CA)</MenuItem>
                    <MenuItem value={+33}>+33 (FR)</MenuItem>
                    <MenuItem value={+44}>+44 (UK)</MenuItem>
                    <MenuItem value={+91}>+91 (India)</MenuItem>
                  </Select>
                  <FormHelperText>
                    {countryCodeErrorFlag ? t("errorCountryCode") : ""}
                  </FormHelperText>
                </FormControl>

                <TextField
                  id="phone"
                  label={t("PhoneNumberLabel")}
                  variant="standard"
                  error={phoneErrorFlag}
                  helperText={phoneError}
                  type={"text"}
                  sx={{ width: 150, marginTop: 3, marginLeft: 3 }}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
                  required
                />
              </div>
            </div>

            <div className='addtionalC-field'>
                <div className='addtionalC-field-profile-photo'>
                  <Avatar src={previewImage}
                    sx={{ width: 100, height: 100 }}
                        >     
                        </Avatar>
                  <input type="file" id="photo" className='photo-field' onChange={handlePhotoChange}/>
                </div>
              </div> 

            <div className="addtionalC-field">
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
                  width: 150,
                  marginTop: 4,
                }}
                size="large"
                onClick={handleSubmit}
              >
                {t("SubmitBtn")}
              </Button>
            </div>
          </div>
        </form>
        <div className="image">
          <img src={image} alt="login-img" className="actual-img" />
        </div>
      </div>
      </>}
    </div>
  );
}

export default AdditionalCustomerDetails