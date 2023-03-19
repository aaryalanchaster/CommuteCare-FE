import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ProfilePage.css';

import { displayCustomerProfile, logout } from "../Routes/Login/AuthService";
import { useNavigate } from "react-router-dom";
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
const CustomerProfilePage = () => {
    const { t } = useTranslation();
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [gender, setgender] = useState("");
    const [mob, setmob] = useState("");
    const [dob, setdob] = useState("");
   
  
    const [isLoading, setisLoading] = useState(false);

    useEffect( () => {
        const fetchData = async () => {
            try {
                setisLoading(true);
                const res = await displayCustomerProfile();
                console.log(res);
                setfirstname(res.user.firstname);
                setlastname(res.user.lastname);
                setemail(res.user.email);
                setgender(res.user.gender);
                setdob(res.user.dob);
                setmob(res.user.mob);
               
                
                //setresult(res);
              } catch (error) {
                console.error('error', error);
              }
              setisLoading(false);
        }
        fetchData();
    }, [])
    
  return (
    <div className="profile">
      {isLoading ? (
        <div>{t("LoadingLabel")}</div>
      ) : (
        <>
          <div className="profile-container">
            <h2>Personal Details</h2>
            <div className="profile-div">
              <div className="profile-content">
                <h3>
                  {t("NameLabel")}: {firstname} {lastname}
                </h3>
                <h4>
                  {t("EmailLabel")}: {email}
                </h4>
                <h4>
                  {t("GenderLabel")}: {gender}
                </h4>
                <h4>
                  {t("PhoneNumberLabel")}: {mob}
                </h4>
                <h4>
                  {t("DateofBirthLabel")}: {dob}
                </h4>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerProfilePage