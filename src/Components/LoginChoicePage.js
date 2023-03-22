import React from 'react'
import './LoginChoicePage.css'
import IntroImg from "../Assets/loginchoicescreen.jpg";
import logo from "../Assets/logo.jpg";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { FormControl, NativeSelect } from '@mui/material';

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const LoginChoicePage = () => {
  const navigate = new useNavigate();
  const { t } = useTranslation();
  return (
    <div className='choice'>
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
      <div className="mask">
            <img className="intro-img" src={IntroImg} alt='heroImg'></img>
      </div>
      <div className='choice-buttons'>
          <div className='choice-button-getHelp'>
            <Button variant="outlined" fullWidth size='large'
                sx={{
                  ":hover": {
                  bgcolor: "#006e5f4a",
                  borderColor: "#006E60",
                  },
                  color: "white",
                  backgroundColor: "#00720B",
                  borderColor: "white",
                  height: 60,
                }} onClick={(e)=> {navigate('/login', {state:{data: "Customer"}})}}
            
          >{t("GetHelpBtn")}</Button>
          </div>
          <div className='choice-button-helper'>
            <Button variant="outlined" fullWidth size='large'
              sx={{
                ":hover": {
                bgcolor: "#006e5f4a",
                borderColor: "#006E60",
                },
                color: "white",
                  backgroundColor: "#00720B",
                  borderColor: "white",
                height: 60,

              }} onClick={(e)=> {navigate('/login', {state:{data: "Helper"}})}}
            
          >{t("HelpSomeoneBtn")}</Button>
          </div>
      </div>
        {/*
        <div className='choice-container'>
         <div className='choice-contents'>
            <h3>What would you like to do today?</h3>
                    <div className='choice-buttons'>
                      <div className='btn'>
                        <Link to="/login" 
                          state={{data: "Customer"}}
                          >To Be Helped</Link>
                      </div>
                        
                    </div>
                <div className='choice-buttons'>
                <div className='btn'>
                      <Link to="/login"
                          state={{data: "Helper"}}
                          >To Help</Link>
                  </div>
                
                </div>
            </div> 
  </div>*/}
    </div>
  )
}

export default LoginChoicePage