import React, { useEffect } from 'react'
import './LoginChoicePage.css'
import IntroImg from "../Assets/loginchoicescreen.jpg";
import logo from "../Assets/logo.jpg";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { FormControl, NativeSelect } from '@mui/material';

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
import CustomNav from './CustomNav';
const LoginChoicePage = () => {
  const navigate = new useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
        
    i18n.changeLanguage(localStorage.getItem('lang'));
    console.log('lang--',localStorage.getItem('lang'))
    
  }, [])
  return (
    <div className='choice'>
      <CustomNav />
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