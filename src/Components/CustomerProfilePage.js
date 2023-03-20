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

const CustomerProfilePage = () => {
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
           || handleGenderChange(gender)
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
        
        return false;
      }
      const date = (dob.$M +1)+"/"+dob.$D+"/"+dob.$y;
      console.log("dob: ", date);
      try {
        await additionalDetails(firstName, lastName, gender, date, phone);
        alert("User Details updated successfully!!");
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
    <div className='profile'>
        {
            isLoading ? <div>Loading.....</div> : <>
                    
                    <div className='profile-container'>
                    <h2>Personal Details</h2>
                      <div className='profile-div'> 
                        <div className='profile-content'>
                        <TextField
                             error = {fnameErrorFlag}
                             helperText={fnameError}
                             label="First Name"
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
                             inputProps={{pattern: '[A-Za-z ]+'}}
                             value={firstName}
                             onChange={(e) => {
                              setFirstName(e.target.value);}}
                           />
                           <TextField
                            error = {lnameErrorFlag}
                            helperText={lnameError}
                             label="Last Name"
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
                             inputProps={{pattern: '[A-Za-z ]+'}}
                             value={lastName}
                             onChange={(e) => {
                              setLastName(e.target.value);}}
                           />
                           <TextField
                             
                             label="Email"
                             InputProps={{
                               startAdornment: (
                                 <InputAdornment position="start">
                                  <Mail  />
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

                           <FormControl variant="standard" sx={{width: "70%", marginTop: "5%", textAlign: 'left'}} error={genderErrorFlag}>
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

                           <TextField
                             error = {phoneErrorFlag}
                             helperText={phoneError}
                             label="Phone"
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
                              setPhone(e.target.value);}}
                             inputProps={{pattern: '[0-9]{10}',maxLength: 10  }}
                           />
                           <div className="profile-dob">
                               <LocalizationProvider dateAdapter={AdapterDayjs} fullwidth>
                                 <DatePicker
                                   variant="standard"
                                   value={dob}
                                   sx={{width: "70%", marginTop: "5%",}}
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
                               <Button variant='outlined' sx={{
                                  ":hover": {
                                  bgcolor: "#006e5f4a",
                                  borderColor: "#006E60",
                                  },
                                  color: "white",
                                  backgroundColor: "#00720B",
                                  borderColor: "#006E60",
                                  width: 150,
                                  marginTop: "10%",
                                  
                                }} size="large"  onClick={handleSubmit}>
                                  Save
                              </Button>
                           </div>
                          
                          
                        
                        </div>
                      </div>
                    </div>
            </>
        }
        
    </div>
  )
}

export default CustomerProfilePage