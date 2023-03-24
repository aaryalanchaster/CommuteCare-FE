import React from 'react';
import './HeroImg.css';


import IntroImg from "../Assets/home-page.jpg";
import {Link} from "react-router-dom";
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const HeroImg = () => {
   const { t } = useTranslation();
  return (
    <div className="hero">
      <div className="mask">
        <img className="intro-img" src={IntroImg} alt="heroImg"></img>
      </div>
      <div className="content">
        <h1>CommuteCare</h1>
        <div>
          <Link className="btn" to="/customer" state={{ data: "Customer" }}>
            {" "}
            {t("GetStarted")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroImg