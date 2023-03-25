import React, { useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom';
import logo from "../Assets/logo.jpg";
import image from '../Assets/home-page.jpg';



import { additionalDetailsHelper, logout } from '../Routes/Login/AuthService';
import { nationalityPlaces } from '../Assets/data';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';


import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
import CustomNav from './CustomNav';

const AdditionalHelperDetails = () => {
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
  // const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneErrorFlag, setPhoneErrorFlag] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryCodeErrorFlag, setcountryCodeErrorFlag] = useState(false);
  const [nationality, setNationality] = useState("");
  const [nationalityErrorFlag, setnationalityErrorFlag] = useState(false);
  const [bio, setbio] = useState("");
  const [bioErrorFlag, setbioErrorFlag] = useState(false);
  const [bioError, setbioError] = useState("");
const { t } = useTranslation();

  const navigate = new useNavigate();

  const handleFirstNameChange = (firstName) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(firstName)) {
      setfnameError(t("errorAlphabets"));
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

  const handleDobChange = (dob) => {
    if(!dob){
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

  const handleNationalityChange = (nationality) => {
    if(!nationality){
      setnationalityErrorFlag(true);
      return true;
    }
    else{
      
      setnationalityErrorFlag(false);
      return false;
    }
  };

  const handleGenderChange = (gender) => {
    if(!gender){
      
      setgenderErrorFlag(true);
      return true;
    }
    else{
      
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
    //setPhoto(selectedFile);
  };

  const handlePhoneChange = (event) => {
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
      
      setcountryCodeErrorFlag(true);
      return true;
    }
    else{
      
      setcountryCodeErrorFlag(false);
      return false;
    }
  };

  const handleBioChange = (bio) => {
    if(!bio){
      setbioError(t("errorBio"));
      setbioErrorFlag(true);
      return true;
    }
    else{
      setbioError('');
      setbioErrorFlag(false);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleFirstNameChange(firstName) || handleLastNameChange(lastName) || handlePhoneChange(phone) || handleDobChange(dob)
        || handleCountryCodeChange(countryCode) || handleGenderChange(gender) || handleBioChange(bio) || handleNationalityChange(nationality)
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
      if(!nationality){
        setnationalityErrorFlag(true);
      }
      if(!bio){
        setbioError(t("errorBio"));
        setbioErrorFlag(true);
      }
      return false;
    }
    const date = (dob.$M +1)+"/"+dob.$D+"/"+dob.$y;
    try {
      await additionalDetailsHelper(firstName, lastName, gender, date, phone, bio, nationality);
      navigate('/helperAvailability');
    } catch (error) {
      console.error('error', error);
      if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
        logout();
        navigate('/');
      }
    }
    
    
    
  };
  useEffect(() => {
        
    i18n.changeLanguage(localStorage.getItem('lang'));
    console.log('lang--',localStorage.getItem('lang'))
    
  }, [])

  return (
    <div className="signUp">
      <CustomNav />
      <div className="signup-grid">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="addtionalH-container">
            <div className="addtionalH-field">
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
            <div className="addtionalH-field">
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
            <div className="addtionalH-field">
              <div className="addtionalH-date">
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                  <DatePicker
                    variant="standard"
                    value={dob}
                    label={t("DateofBirthLabel")}
                    onChange={(newValue) => {
                      setDob(newValue);
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

            <div className="addtionalH-field">
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

            {/* <div className='signup-field'>
                        <label htmlFor="photo">Profile Photo:</label>
                        <input type="file" id="photo" onChange={handlePhotoChange}/>
                      </div> */}

            <div className="addtionalH-field">
              <div className="addtionalH-phone-input">
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

            <div className="addtionalH-field">
              <FormControl
                variant="standard"
                fullWidth
                sx={{ width: 300, marginTop: 4.3, textAlign: "left" }}
                error={nationalityErrorFlag}
              >
                <InputLabel id="nationality">Nationality</InputLabel>
                <Select
                  labelId="nationality"
                  id="nationality"
                  value={nationality}
                  label={"NationalityLabel"}
                  onChange={(e) => {
                    setNationality(e.target.value);
                  }}
                  required
                >
                  {nationalityPlaces.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.text}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {nationalityErrorFlag ? t("errorNationality") : ""}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="addtionalH-field">
              <div className="addtionalH-textfield">
                <TextField
                  id="bio"
                  value={bio}
                  onChange={(e) => {
                    setbio(e.target.value);
                  }}
                  placeholder={t("BioPH")}
                  multiline
                  rows={3}
                  maxRows={4}
                  sx={{
                    width: 300,
                    marginTop: 5,
                  }}
                  error={bioErrorFlag}
                  helperText={bioError}
                  inputProps={{ maxLength: 150 }}
                  label={t("AboutMeLabel")}
                />
              </div>
            </div>

            <div className="addtionalH-field">
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
    </div>
  );
}

export default AdditionalHelperDetails