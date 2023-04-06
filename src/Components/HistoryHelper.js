import { Button } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  acceptBooking,
  completeBooking,
  getHelperConfirmedBookings,
  getHelperPendings,
  logout,
  rejectBooking,
} from "../Routes/Authentication/AuthService";
import "./History.css";
import i18n from "../Translation/i18n";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";

const HistoryHelper = () => {
   const { t } = useTranslation();
  const [bookings, setbookings] = useState([]);
  const [isPendingBookings, setisPendingBookings] = useState(true);
  const [isrefresh, setisrefresh] = useState(false);

  const [isLoading, setisLoading] = useState(false);

  // const [alert, setAlert] = useState(false);
  // const [alertContent, setAlertContent] = useState('');

  const navigate = useNavigate();

  const getPendingBookings = async () => {
    try {
      setisLoading(true);
      await getHelperPendings().then((response) => {
        setbookings(response.data);
      });
    } catch (error) {
      console.error("error", error);
      if (
        error.response.data.message === "jwt expired" ||
        error.response.data.message === "jwt malformed"
      ) {
        logout();
        navigate("/");
      }
    }
    setisLoading(false);
  };
  const getConfirmedBookings = async () => {
    try {
      setisLoading(true);
      await getHelperConfirmedBookings().then((response) => {
        setbookings(response.data);
      });
    } catch (error) {
      console.error("error", error);
      if (
        error.response.data.message === "jwt expired" ||
        error.response.data.message === "jwt malformed"
      ) {
        logout();
        navigate("/");
      }
    }
    setisLoading(false);
  };

  const handleAccept = async (id) => {
    try {
      await acceptBooking(id).then((response) => {
        // setbookings(response.data);
        console.log(response);
        setisrefresh(!isrefresh);
      });
    } catch (error) {
      console.error("error", error);
      if (
        error.response.data.message === "jwt expired" ||
        error.response.data.message === "jwt malformed"
      ) {
        logout();
        navigate("/");
      }
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectBooking(id).then((response) => {
        // setbookings(response.data);
        console.log(response);
        alert(response.data);
        // setAlertContent(response.data);
        //   setAlert(true);
        setisrefresh(!isrefresh);
      });
    } catch (error) {
      console.error("error", error);
      if (
        error.response.data.message === "jwt expired" ||
        error.response.data.message === "jwt malformed"
      ) {
        logout();
        navigate("/");
      }
    }
  };

  const goTochatPage = (id, fname, lname) => {
    console.log("UserId <<", id);
    const name = fname + " " + lname;
    console.log("UserName <<", name);
    navigate("/chat", { state: { id, name } });
  };

  const completeBookingFn = async (bookingId) => {
    console.log(bookingId);
    try {
      await completeBooking(bookingId).then((response) => {
        console.log(response);
        setisrefresh(!isrefresh);
      });
    } catch (error) {
      console.error("error", error);
      if (
        error.response.data.message === "jwt expired" ||
        error.response.data.message === "jwt malformed"
      ) {
        logout();
        navigate("/");
      }
    }
  };

  console.log("Booking:", bookings);

  useEffect(() => {
    isPendingBookings ? getPendingBookings() : getConfirmedBookings();
    i18n.changeLanguage(localStorage.getItem('lang'));
  }, [isPendingBookings, isrefresh]);

  return (
    <div className="history">
      {isLoading ? (
        <div className="loading">
          <ReactLoading type="spin" color="#000" />
        </div>
      ) : (
        <>
          <div className="history-container">
            {bookings.map((booking, index) =>
              isPendingBookings ? (
                <div className="booking-card" key={index}>
                  <div className="booking-name">
                    {`${booking.user.firstname ?? t("errorNoFirstName")} ${
                      booking.user.lastname ?? t("errorNoLastName")
                    }`}
                  </div>
                  <div className="booking-card-text">
                    {t("LocationLabel")}: {booking.location}
                  </div>
                  <div className="booking-card-day-time">
                    <div>
                      {t("Day")}: {booking.day}
                    </div>
                    <div>
                      {t("Time")}:
                      {moment(booking.starttime).utc().format("HH:mm")}
                    </div>
                  </div>
                  <div className="booking-card-day-time">
                    <div>
                      {t("Date")}: {booking.date}
                    </div>
                    <div>
                      {t("DurationLabel")}: {booking.duration} mins
                    </div>
                  </div>
                  <div className="booking-card-text">
                    {t("Description")}: {booking.description}
                  </div>

                  <div className="card-buttons">
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
                        width: 100,
                      }}
                      onClick={() => handleAccept(booking._id)}
                    >
                      {t("AcceptBtn")}
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        ":hover": {
                          bgcolor: "#006e5f4a",
                          borderColor: "#006E60",
                        },
                        color: "red",
                        background: "none",
                        borderColor: "red",
                        width: 100,
                      }}
                      onClick={() => handleReject(booking._id)}
                    >
                      {t("RejectBtn")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="booking-card" key={index}>
                  <div className="booking-name">
                    {`${booking.user.firstname ?? t("errorNoFirstName")} ${
                      booking.user.lastname ?? t("errorNoLastName")
                    }`}
                  </div>
                  <div className="booking-card-text">
                    {t("LocationLabel")}: {booking.location}
                  </div>
                  <div className="booking-card-day-time">
                    <div>
                      {t("Day")}: {booking.day}
                    </div>
                    <div>
                      {t("Time")}:{" "}
                      {moment(booking.starttime).utc().format("HH:mm")}
                    </div>
                  </div>
                  <div className="booking-card-day-time">
                    <div>
                      {t("Date")}: {booking.date}
                    </div>
                    <div>
                      {t("Duration")}: {booking.duration} mins
                    </div>
                  </div>
                  <div className="card-buttons">
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
                        width: 100,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        goTochatPage(
                          booking.user._id,
                          booking.user.firstname,
                          booking.user.lastname
                        );

                        // console.log("UserId <<", booking.user._id);
                        // setId(booking.user._id);
                        // console.log("UserId", Id);
                        // navigate('/chat',{state:{Id}});
                      }}
                    >
                      {t("ChatBtn")}
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{
                        ":hover": {
                          bgcolor: "#006e5f4a",
                          borderColor: "#006E60",
                        },
                        color: "green",
                        background: "#befc9d",
                        borderColor: "green",
                        width: 100,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        completeBookingFn(booking._id);
                      }}
                    >
                      {t("CompleteBtn")}
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="history-buttons">
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
                ...(!isPendingBookings
                  ? {
                      backgroundColor: "#D4FFBC",
                      color: "#024F09",
                    }
                  : { color: "white", backgroundColor: "#00720B" }),
              }}
              size="large"
              onClick={() => {
                setisPendingBookings(true);
              }}
            >
              {t("PendingBtn")}
            </Button>
            <Button
              variant="outlined"
              sx={{
                ":hover": {
                  bgcolor: "#006e5f4a",
                  borderColor: "#006E60",
                },
                backgroundColor: "#00720B",
                color: "white",
                borderColor: "#006E60",
                ...(isPendingBookings && {
                  color: "#024F09",
                  backgroundColor: "#D4FFBC",
                }),
              }}
              size="large"
              onClick={() => {
                setisPendingBookings(false);
              }}
            >
              {t("ConfirmedBtn")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryHelper;
