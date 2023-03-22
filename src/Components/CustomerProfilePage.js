import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ProfilePage.css';

import { additionalDetails, displayCustomerProfile, logout } from '../Routes/Login/AuthService';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AccountCircle, LocalPhone, Mail } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const CustomerProfilePage = () => {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState("");
    const [fnameErrorFlag, setfnameErrorFlag] = useState(false);
    const [fnameError, setfnameError] = useState("");
    const [lnameErrorFlag, setlnameErrorFlag] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lnameError, setlnameError] = useState("");
    const [email, setemail] = useState("");
    const [gender, setGender] = useState("");
    const [genderErrorFlag, setgenderErrorFlag] = useState(false);
    const [genderError, setgenderError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneErrorFlag, setPhoneErrorFlag] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [dob, setDob] = useState(null);
    const [dobErrorFlag, setdobErrorFlag] = useState(false);
    const [dobError, setdobError] = useState("");

    const navigate = useNavigate();
  
    const [isLoading, setisLoading] = useState(false);


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
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(handleFirstNameChange(firstName) || handleLastNameChange(lastName) || handlePhoneChange(phone) || handleDobChange(dob)
           || handleGenderChange(gender)
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
        
        return false;
      }
      const date = (dob.$M +1)+"/"+dob.$D+"/"+dob.$y;
      console.log("dob: ", date);
      try {
        await additionalDetails(firstName, lastName, gender, date, phone);
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
                const res = await displayCustomerProfile();
                console.log(res);
                setFirstName(res.user.firstname);
                setLastName(res.user.lastname);
                setemail(res.user.email);
                setGender(res.user.gender);
                setDob(res.user.dob);
                setPhone(res.user.mob);
               
                //console.log(res.user.dob);
                
                //setresult(res);
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
                  }}
                  variant="standard"
                  sx={{
                    width: "70%",
                    marginTop: "2%",
                  }}
                  inputProps={{ pattern: "[A-Za-z ]+" }}
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
                  }}
                  variant="standard"
                  sx={{
                    width: "70%",
                    marginTop: "5%",
                  }}
                  inputProps={{ pattern: "[A-Za-z ]+" }}
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
                  onChange={setemail}
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
                  variant="standard"
                  sx={{
                    width: "70%",
                    marginTop: "5%",
                  }}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
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
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerProfilePage