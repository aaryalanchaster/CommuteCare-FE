import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import './SignUpPage.css'
import logo from "../Assets/logo.jpg";
import image from '../Assets/home-page.jpg';

import { additionalDetails, logout } from '../Routes/Login/AuthService';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, FormHelperText, NativeSelect } from '@mui/material';

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
 //  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneErrorFlag, setPhoneErrorFlag] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryCodeErrorFlag, setcountryCodeErrorFlag] = useState(false);
  const [countryCodeError, setcountryCodeError] = useState("");

  const navigate = new useNavigate();

  const handleFirstNameChange = (firstName) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(firstName)) {
      setfnameError('Enter only alphabets');
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
      setlnameError('Enter only alphabets');
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
      setgenderError("Enter gender");
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
      alert("File size should be less than 20MB");
      return;
    }
    //setPhoto(selectedFile);
  };

  const handlePhoneChange = (phone) => {
    const regex = /^\d{10}$/;
    if (!regex.test(phone)) {
      setPhoneError('Number Invalid');
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
      setcountryCodeError("Enter Country Code");
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
    if(!dob){
      setdobError("Enter DOB");
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
        setfnameError('Enter First Name');
        setfnameErrorFlag(true);
      }
      if(lastName.length === 0){
        setlnameError('Enter Last Name');
        setlnameErrorFlag(true);
      }
      if(phone.length === 0){
        setPhoneError('Enter Phone Number');
        setPhoneErrorFlag(true);
      }
      if(!dob){
        setdobError("Enter DOB");
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
      await additionalDetails(firstName, lastName, gender, date, phone);
      navigate("/customer");
    } catch (error) {
      console.error('error', error);
      if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
        logout();
        navigate('/');
      }
    }
  };
  

  return (
    <div className='signUp'>
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
      <div className='signup-grid'>
      
            <form onSubmit={handleSubmit} className='signup-form'>
              
              <div className='addtionalC-container'>
              <div className='addtionalC-field'>
                  <TextField id="signUp" 
                          label="First Name" 
                          variant="standard"
                          error = {fnameErrorFlag}
                          helperText={fnameError}
                          type={"text"}
                          sx={{width: 300,
                            marginTop: 2,
                          }}
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);}}
                          inputProps={{pattern: '[A-Za-z ]+'}}
                          required/>
                </div>
                <div className='addtionalC-field'>
                    <TextField id="signUp" 
                          label="Last Name" 
                          variant="standard"
                          error = {lnameErrorFlag}
                          helperText={lnameError}
                          type={"text"}
                          sx={{width: 300,
                            marginTop: 3
                          }}
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);}}
                          inputProps={{pattern: '[A-Za-z ]+'}}
                          required/>
                </div>
                <div className='addtionalC-field'>
                
                <div className='addtionalC-date'> 
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <DatePicker
                        variant="standard"
                        value={dob}
                        
                        label="Date of Birth"
                        onChange={(newValue) => {
                          setDob(newValue);
                        }}
                        maxDate={new Date()}
                        required
                        renderInput={(params) => (
                          <TextField
                            sx={{ width: '100%' }}
                            {...params}
                            error={dobErrorFlag}
                            helperText={dobError}
                          />
                        )}
                      />
                      </LocalizationProvider>
                </div>
                    
                </div>
                
                
                <div className='addtionalC-field'>
                  <FormControl variant="standard" fullWidth sx={{width: 300, marginTop: 4.3, textAlign: 'left'}} error={genderErrorFlag}>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        labelId="gender"
                        id="gender"
                        value={gender}
                        label="gender"
                        onChange={(e) => {
                          setGender(e.target.value);}}
                        required
                        
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                      </Select>
                        <FormHelperText>{genderErrorFlag? "Enter gender": ""}</FormHelperText>
                    </FormControl>
                  

                </div>
                
                {/* <div className='signup-field'>
                  <label htmlFor="photo">Profile Photo:</label>
                  <input type="file" id="photo" onChange={handlePhotoChange}/>
                </div> */}
                

                <div className='addtionalC-field'>
                  
                  <div className="addtionalC-phone-input">
                    <FormControl variant="standard" sx={{width: 120, marginTop: 4.3}} error={countryCodeErrorFlag}>
                      <InputLabel id="country-code">Country Code</InputLabel>
                      <Select
                        labelId="country-code"
                        id="country-code"
                        value={countryCode}
                        label="Country Code"
                        onChange={(e) => {
                          setCountryCode(e.target.value);}}
                        required
                      >
                        <MenuItem value={+1}>+1 (USA/CA)</MenuItem>
                        <MenuItem value={+33}>+33 (FR)</MenuItem>
                        <MenuItem value={+44}>+44 (UK)</MenuItem>
                        <MenuItem value={+91}>+91 (India)</MenuItem>
                      </Select>
                      <FormHelperText>{countryCodeErrorFlag? "Enter Country Code": ""}</FormHelperText>
                    </FormControl>

                    <TextField id="phone" 
                          label="Phone Number" 
                          variant="standard"
                          error = {phoneErrorFlag}
                          helperText={phoneError}
                          type={"text"}
                          sx={{width: 150,
                            marginTop: 3,
                            marginLeft: 3
                          }}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);}}
                          inputProps={{pattern: '[0-9]{10}',maxLength: 10  }}
                          
                          required/>
                    
                  </div>
                </div>
                
                <div className='addtionalC-field'>
                      <Button variant='outlined' sx={{
                                  ":hover": {
                                  bgcolor: "#006e5f4a",
                                  borderColor: "#006E60",
                                  },
                                  color: "white",
                                  backgroundColor: "#00720B",
                                  borderColor: "#006E60",
                                  width: 150,
                                  marginTop: 4
                                }} size="large" onClick={handleSubmit}>
                                  Submit
                              </Button>
                </div>
              </div>
              </form>
              <div className='image'>
                  <img  src={image} alt='login-img'className='actual-img'/>
              
              </div>
        </div>  
      </div>
  )
}

export default AdditionalCustomerDetails