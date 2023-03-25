import React, { useEffect } from "react";
import "./HelperAvailabilityPage.css";
import { useState } from "react";

import Calendar from "react-calendar";
import TimeField from "react-simple-timefield";

import { editAvailability, getAvailability, logout } from "../Routes/Login/AuthService";
import { Button } from "@mui/material";

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const HelperAvailabilityPage = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [errorStartTime, setErrorStartTime] = useState(null);
  const [errorEndTime, setErrorEndTime] = useState(null);
  const errortxt = t("errorInvalidTime");

  const [startTimeMon, setStartTimeMon] = useState("");
  const [endTimeMon, setEndTimeMon] = useState("");

  const [startTimeTue, setStartTimeTue] = useState("");
  const [endTimeTue, setEndTimeTue] = useState("");

  const [startTimeWed, setStartTimeWed] = useState("");
  const [endTimeWed, setEndTimeWed] = useState("");

  const [startTimeThu, setStartTimeThu] = useState("");
  const [endTimeThu, setEndTimeThu] = useState("");

  const [startTimeFri, setStartTimeFri] = useState("");
  const [endTimeFri, setEndTimeFri] = useState("");

  const [startTimeSat, setStartTimeSat] = useState("");
  const [endTimeSat, setEndTimeSat] = useState("");

  const [startTimeSun, setStartTimeSun] = useState("");
  const [endTimeSun, setEndTimeSun] = useState("");

  const navigate = useNavigate();

  const [showAvailability, setShowAvailability] = useState({
    Monday: `${startTimeMon}${endTimeMon}`,
    Tuesday: `${startTimeTue}${endTimeTue}`,
    Wednesday: `${startTimeWed}${endTimeWed}`,
    Thursday: `${startTimeThu}${endTimeThu}`,
    Friday: `${startTimeFri}${endTimeFri}`,
    Saturday: `${startTimeSat}${endTimeSat}`,
    Sunday: `${startTimeSun}${endTimeSun}`,
  });

  const [getAvailabilityInPage, setgetAvailabilityInPage] = useState("");

  const helperId = localStorage.getItem("HelperID");

  

  useEffect(() => {
    setShowAvailability({
      Monday: `${startTimeMon}${endTimeMon}`,
      Tuesday: `${startTimeTue}${endTimeTue}`,
      Wednesday: `${startTimeWed}${endTimeWed}`,
      Thursday: `${startTimeThu}${endTimeThu}`,
      Friday: `${startTimeFri}${endTimeFri}`,
      Saturday: `${startTimeSat}${endTimeSat}`,
      Sunday: `${startTimeSun}${endTimeSun}`,
    });
  }, [
    startTimeMon,
    startTimeTue,
    startTimeWed,
    startTimeThu,
    startTimeFri,
    startTimeSat,
    startTimeSun,
    endTimeMon,
    endTimeTue,
    endTimeWed,
    endTimeThu,
    endTimeFri,
    endTimeSat,
    endTimeSun,
  ]);

  const handleSubmit = async (event) => {
    console.log("Availability: ", showAvailability);

    try {
      await editAvailability(showAvailability);
    } catch (error) {
      console.error("error", error);
    }
  };

  var maxDate = new Date(); //Date
  maxDate.setDate(maxDate.getDate() + 6);



   
   const fetchAvailability = async () => {
    try {
      await getAvailability(helperId).then((response) =>{
        setgetAvailabilityInPage(response.data.availability);
        setStartTimeMon(response.data.availability.Monday.slice(0,5));
        setEndTimeMon(response.data.availability.Monday.slice(5,11));
        setStartTimeTue(response.data.availability.Tuesday.slice(0,5));
        setEndTimeTue(response.data.availability.Tuesday.slice(5,11));
        setStartTimeWed(response.data.availability.Wednesday.slice(0,5));
        setEndTimeWed(response.data.availability.Wednesday.slice(5,11));
        setStartTimeThu(response.data.availability.Thursday.slice(0,5));
        setEndTimeThu(response.data.availability.Thursday.slice(5,11));
        setStartTimeFri(response.data.availability.Friday.slice(0,5));
        setEndTimeFri(response.data.availability.Friday.slice(5,11));
        setStartTimeSat(response.data.availability.Saturday.slice(0,5));
        setEndTimeSat(response.data.availability.Saturday.slice(5,11));
        setStartTimeSun(response.data.availability.Sunday.slice(0,5));
        setEndTimeSun(response.data.availability.Sunday.slice(5,11));
      }

      );
    } catch (error) {
      console.error("error", error);
      if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
        logout();
        navigate('/');
      }
    }
  };

  

  useEffect(() => {
      
    fetchAvailability();
    i18n.changeLanguage(localStorage.getItem('lang'));
    
  }, []);

  console.log("AfterFetch: ", getAvailabilityInPage);
  
  

  return (
    <div className="availability">
      <div className="availability-grid">
        <div className="availability-calendar">
          <Calendar
            minDate={new Date()}
            maxDate={maxDate}
            onChange={setDate}
            value={date}
            required
          />
        </div>
        <div className="availability-container">
          <div className="Week-days">
            <div className="Week-day">
              <p>{t("MondayLabel")}</p>
            </div>
            <TimeField
              value={startTimeMon}
              onChange={(e) => {
                setStartTimeMon(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>{t("To")}</p>
            <TimeField
              value={endTimeMon}
              onChange={(e) => {
                setEndTimeMon(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>{t("TuesdayLabel")}</p>
            </div>
            <TimeField
              value={startTimeTue}
              onChange={(e) => {
                setStartTimeTue(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>{t("To")}</p>
            <TimeField
              value={endTimeTue}
              onChange={(e) => {
                setEndTimeTue(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>{t("WednesdayLabel")}</p>
            </div>
            <TimeField
              value={startTimeWed}
              onChange={(e) => {
                setStartTimeWed(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>{t("To")}</p>
            <TimeField
              value={endTimeWed}
              onChange={(e) => {
                setEndTimeWed(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>{t("ThrusdayLabel")}</p>
            </div>
            <TimeField
              value={startTimeThu}
              onChange={(e) => {
                setStartTimeThu(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>{t("To")}</p>
            <TimeField
              value={endTimeThu}
              onChange={(e) => {
                setEndTimeThu(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>{t("FridayLabel")}</p>
            </div>
            <TimeField
              value={startTimeFri}
              onChange={(e) => {
                setStartTimeFri(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>{t("To")}</p>
            <TimeField
              value={endTimeFri}
              onChange={(e) => {
                setEndTimeFri(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>{t("SaturdayLabel")}</p>
            </div>
            <TimeField
              value={startTimeSat}
              onChange={(e) => {
                setStartTimeSat(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>{t("To")}</p>
            <TimeField
              value={endTimeSat}
              onChange={(e) => {
                setEndTimeSat(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>{t("SaturdayLabel")}</p>
            </div>
            <TimeField
              value={startTimeSun}
              onChange={(e) => {
                setStartTimeSun(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>{t("To")}</p>
            <TimeField
              value={endTimeSun}
              onChange={(e) => {
                setEndTimeSun(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
        </div>
      </div>
      <div className="save-button">
        <Button
          variant="outlined"
          sx={{
            ":hover": {
              bgcolor: "#006e5f4a",
              borderColor: "#006E60",
            },
            color: "white",
            backgroundColor: "#00720B",
            borderColor: "#006E60",
            width: 200,
            marginTop: 4,
          }}
          size="large"
          onClick={handleSubmit}
        >
          {t("SaveBtn")}
        </Button>
      </div>
    </div>
  );
};

export default HelperAvailabilityPage;
