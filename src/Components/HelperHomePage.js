import React from 'react'
import { Link } from 'react-router-dom'
import './HelperHomePage.css'
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const HelperHomePage = () => {
   const { t } = useTranslation();
  return (
    <div className='helper-home'>
        <div className='helper-home-container'>
            <Link to='/helperAvailability' className='btn' >Availability</Link>
        </div>
    </div>
  )
}

export default HelperHomePage