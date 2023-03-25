import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ProfilePage.css';
import { nationalityPlaces } from '../Assets/data';

import { additionalDetailsHelper, displayHelperProfile, logout } from '../Routes/Login/AuthService';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AccountCircle, LocalPhone, Mail, PhoneAndroid } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const HelperProfilePage = () => {
 const { t } = useTranslation();
    const [email, setemail] = useState("");

    const [isLoading, setisLoading] = useState(false);

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

    const navigate = useNavigate();

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

    const handlePhoneChange = (event) => {
      const regex = /^\d{10}$/;
      if (!regex.test(phone)) {
        setPhoneError(t("errorPhoneNumber"));
        setPhoneErrorFlag(true);
        return true;
      }
      else{
        setPhoneError('');
        setPhoneErrorFlag(false);
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
          || handleGenderChange(gender) || handleBioChange(bio) || handleNationalityChange(nationality)
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
        alert(t("UpdateProfile"));
      } catch (error) {
        console.error('error', error);
        if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
          logout();
          navigate('/');
        }
      }

      
    };



    useEffect( () => {
        const fetchData = async () => {
            try {
                setisLoading(true);
                const res = await displayHelperProfile();
                console.log(res);
                setFirstName(res.helper.firstname);
                setLastName(res.helper.lastname);
                setemail(res.helper.email);
                setGender(res.helper.gender);
                setDob(res.helper.dob);
                setPhone(res.helper.mob);
                // setid(res.helper._id);
                // setBookings(res.helper.bookings);
                setNationality(res.helper.nationality);
                setbio(res.helper.description);
                //setAvailability(res.helper.availability);
                //setresult(res);
                //console.log(res.helper.dob);
              } catch (error) {
                console.error('error', error);
                if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
                  logout();
                  navigate('/');
                }
              }
              setisLoading(false);
        }
        fetchData();
        i18n.changeLanguage(localStorage.getItem('lang'));
    }, [])

    
    
  return (
    <div className="profile">
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <>
          <div className="profile-container">
            <h2>{t("personaldetails")}</h2>
            <div className="profile-div">
              <div className="profile-content">
                <TextField
                  error={fnameErrorFlag}
                  helperText={fnameError}
                  label={t("FirstNameLabel")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    pattern: "[A-Za-z ]+",
                  }}
                  variant="standard"
                  sx={{
                    width: "70%",
                    marginTop: "2%",
                  }}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <TextField
                  error={lnameErrorFlag}
                  helperText={lnameError}
                  label={t("LastNameLabel")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    pattern: "[A-Za-z ]+",
                  }}
                  variant="standard"
                  sx={{
                    width: "70%",
                    marginTop: "5%",
                  }}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <TextField
                  label={t("EmailLabel")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  variant="standard"
                  sx={{
                    width: "70%",
                    marginTop: "5%",
                  }}
                  value={email}
                />

                <FormControl
                  variant="standard"
                  sx={{ width: "70%", marginTop: "5%", textAlign: "left" }}
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
                    {genderErrorFlag ? "Enter gender" : ""}
                  </FormHelperText>
                </FormControl>

                <TextField
                  error={phoneErrorFlag}
                  helperText={phoneError}
                  label={t("PhoneNumberLabel")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhone />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
                  variant="standard"
                  sx={{
                    width: "70%",
                    marginTop: "5%",
                  }}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <div className="profile-dob">
                  <LocalizationProvider dateAdapter={AdapterDayjs} fullwidth>
                    <DatePicker
                      variant="standard"
                      value={dob}
                      sx={{ width: "70%", marginTop: "5%" }}
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
                <TextField
                  id="bio"
                  value={bio}
                  onChange={(e) => {
                    setbio(e.target.value);
                  }}
                  placeholder={("BioPH")}
                  multiline
                  rows={3}
                  maxRows={4}
                  sx={{
                    width: "70%",
                    marginTop: "5%",
                  }}
                  inputProps={{ maxLength: 150 }}
                  label={t("AboutMeLabel")}
                />
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{ width: "70%", marginTop: "5%", textAlign: "left" }}
                  error={nationalityErrorFlag}
                >
                  <InputLabel id="nationality">Nationality</InputLabel>
                  <Select
                    labelId="nationality"
                    id="nationality"
                    value={nationality}
                    label={t("NationalityLabel")}
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
                    {nationalityErrorFlag ? "Enter nationality" : ""}
                  </FormHelperText>
                </FormControl>

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
                    marginTop: "10%",
                  }}
                  size="large"
                  onClick={handleSubmit}
                >
                  {t("SaveBtn")}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HelperProfilePage