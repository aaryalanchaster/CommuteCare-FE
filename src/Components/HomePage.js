import React from 'react'
import './HomePage.css'
import logo from "../Assets/logo.jpg";
import homeImg from '../Assets/home-page.jpg';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const HomePage = () => {
    const { t } = useTranslation();
    const navigate = new useNavigate();
  return (
    <div className="home">
      <div className="eclipse">
        <div className="logo">
          <img src={logo} alt="logo-img" className="logo-img"></img>
        </div>
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