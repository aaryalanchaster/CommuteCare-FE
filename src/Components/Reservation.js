import React from "react";
import "./Reservation.css";
import Calendar from "react-calendar";

import image from "../Assets/home-page.jpg";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Textarea from "@mui/joy/Textarea";
import dayjs from 'dayjs';
import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";
import useHistoryState from "use-history-state";
import { DatePicker } from "@mui/x-date-pickers";
import { width } from "@mui/system";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import moment from "moment/moment";

const Reservation = () => {
  const { t } = useTranslation();
  const [date, setDate] = useHistoryState(null, "date");

  const [time, setTime] = useHistoryState(null, "time");

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useHistoryState(
    null,
    "selectedOption"
  );

  const [comments, setComments] = useHistoryState("", "comments");

  const [location, setLocation] = useHistoryState("", "Location");

  const handleOptionClick = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const stations = ["Paris-Vaugirard ", "Dreux" ,"Verneuil-sur-Avre" ,"L'Aigle" ,"Surdon" ,"Argentan" ,"Briouze" ,"Flers" ,"Vire" ,"Villedieu-les-Poêles" ,"Folligny" ,"Granville"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    

    
    if (!date || !time || !selectedOption || !location) {
      alert(t("FillColumns"));
      return false;
    }

    let hr = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    let min =
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

    const dateFormat = moment(date.$d).utc().format('MM/DD/YYYY');

    console.log("date",dateFormat);
    const formData = {
      day: date.$W,
      time: hr + ":" + min,
      duration: selectedOption,
    };
    console.log("formData", formData);

    navigate(
      `/availableHelpers?Day=${formData.day}&&time=${formData.time}&&duration=${formData.duration}`, {state:{comments,location,dateFormat}}
    ); // to navigate to the next page along with the retrieved data from DB
  };

  var maxDate = new Date(); //Date
  maxDate.setDate(maxDate.getDate() + 6);

  console.log("Date:", date);
  console.log("Date:", time);
  return (
    <form onSubmit={handleSubmit}>
      <div className="reservation">
        <div className="reservation-grid">
          <div className="reservation-container">
            <div className="reservation-date-time">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  variant="standard"
                  value={date}
                  label={t("DateofTravel")}
                  onChange={setDate}
                  minDate={new Date()}
                  maxDate={maxDate}
                  required
                  renderInput={(params) => (
                    <TextField sx={{ width: "100%" }} {...params} />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker
                  label={t("TimeofTravel")}
                  value={time}
                  ampm={false}
                  onChange={setTime}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </div>

            <div className="time-required">
              <p className="label">{t("DurationLabel")}</p>
              <Stack
                spacing={2}
                direction="row"
                required
                sx={{ height: 50, width: 500, gap: 3 }}
              >
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "15"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("15")}
                >
                  15 {t("minsLabel")}
                </Button>
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "30"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("30")}
                >
                  30 {t("minsLabel")}
                </Button>
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "60"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("60")}
                >
                  60 {t("minsLabel")}
                </Button>
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "100"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("100")}
                >
                  1+ {t("hourLabel")}
                </Button>
              </Stack>
            </div>

            <div className="text-area">
              <TextField
                id="comments"
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
                placeholder="Additional information..(150 wordlimit)"
                multiline
                rows={3}
                maxRows={4}
                sx={{
                  width: 450,
                  marginTop: 5,
                }}
                inputProps={{ maxLength: 150 }}
                label={t("AdditonalDescription")}
              />
            </div>
            <div className="location">
              <FormControl variant="standard" sx={{ width: 300 }} error={false}>
                <InputLabel id="location">{t("LocationLabel")}</InputLabel>
                <Select
                  labelId="location"
                  id="location"
                  value={location}
                  label={t("LocationLabel")}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  required
                >
                  {stations.map((station, index) => (
                    <MenuItem key={index} value={station}>
                      {station}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {false ? t("errorNationalityCode") : ""}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="submit">
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
                {t("showHelpersBtn")}
              </Button>
            </div>
          </div>

          <div className="image">
            <img src={image} alt="login-img" className="actual-img" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Reservation;
