import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ProfilePage.css';

import { displayHelperProfile, logout } from '../Routes/Login/AuthService';
import { useNavigate } from 'react-router-dom';

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";

const HelperProfilePage = () => {
  const { t } = useTranslation();
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [gender, setgender] = useState("");
    const [mob, setmob] = useState("");
    const [dob, setdob] = useState("");
    const [id, setid] = useState("");
    const [nationality, setNationality] = useState("");
    const [availability, setAvailability] = useState({});
    const [description, setDescription] = useState("");
    const [bookings, setBookings] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        const fetchData = async () => {
            try {
                setisLoading(true);
                const res = await displayHelperProfile();
                console.log(res);
                setfirstname(res.helper.firstname);
                setlastname(res.helper.lastname);
                setemail(res.helper.email);
                setgender(res.helper.gender);
                setdob(res.helper.dob);
                setmob(res.helper.mob);
                setid(res.helper._id);
                setBookings(res.helper.bookings);
                setNationality(res.helper.nationality);
                setDescription(res.helper.description);
                setAvailability(res.helper.availability);
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
            {/* <h4>id: {id}</h4> */}
            <h4>
              {t("DescriptionLabel")}: {description}
            </h4>
            <h4>
              {t("NationalityLabel")}: {nationality}
            </h4>
            <h4>
              {t("BookingLabel")}: {bookings}
            </h4>
            <div>
              <h4>{t("AvailabilityLabel")}: </h4>
              <pre>{JSON.stringify(availability, null, 100)}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HelperProfilePage