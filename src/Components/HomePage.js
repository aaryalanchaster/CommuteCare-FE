import React, { useEffect } from 'react'
import './HomePage.css'
import logo from "../Assets/logo.jpg";
import homeImg from '../Assets/home-page.jpg';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { FormControl, NativeSelect } from '@mui/material';

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
import CustomNav from './CustomNav';
const HomePage = () => {
    const { t } = useTranslation();
    const navigate = new useNavigate();
    useEffect(() => {
        
      i18n.changeLanguage(localStorage.getItem('lang'));
      console.log('lang--',localStorage.getItem('lang'))
      
    }, [])
  return (
    <div className="home">
      <div className="eclipse">
      <CustomNav />
        <div className="home-container">
          <div className="home-content">
            <h1>{t("HomeTitle")}</h1>
            <div className="home-button">
              <Button
                variant="outlined"
                sx={{
                  ":hover": {
                    bgcolor: "#006e5f4a",
                  },
                  color: "#006E60",
                  backgroundColor: "white",
                  borderColor: "#006E60",
                }}
                size="large"
                onClick={(e) => {
                  navigate("/loginChoice");
                }}
              >
                {t("StartBtn")}
              </Button>
            </div>
          </div>
          <div className="home-Img">
            <img src={homeImg} alt="logo-img" className="homeimg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage