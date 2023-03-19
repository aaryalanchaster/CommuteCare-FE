import { Button, ButtonGroup } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cancelBooking,
  getUserBookings,
  getUserHistory,
  logout,
} from "../Routes/Login/AuthService";
import "./History.css";

const History = () => {
  const navigate = useNavigate();

  const [bookings, setbookings] = useState([]);
  const [isCurrentBookings, setisCurrentBookings] = useState(true);
  const [isrefresh, setisrefresh] = useState(false);

  const getBookingsData = async () => {
    try {
      await getUserBookings().then((response) => {
        setbookings(response.data);
      });
    } catch (error) {
      console.error("error", error);
      if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
        logout();
        navigate('/');
      }
    }
  };
  const getHistoryData = async () => {
    try {
      await getUserHistory().then((response) => {
        setbookings(response.data);
        console.log(bookings)
      });
    } catch (error) {
      console.error("error", error);
      if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
        logout();
        navigate('/');
      }
    }
  };

  const deleteData = async (id) => {
    try {
      await cancelBooking(id).then((response) => {
        // setbookings(response.data);
        setisrefresh(!isrefresh);
      });
    } catch (error) {
      console.error("error", error);
      if(error.response.data.message==="jwt expired" || error.response.data.message==='jwt malformed'){
        logout();
        navigate('/');
      }
    }
  };

  const goTochatPage = (id, fname, lname) => {
    console.log("UserId <<", id);
    const name = fname + " " + lname; 
    console.log("UserName <<", name);
    navigate('/chat',{state:{id,name}});
    
  }

  useEffect(() => {
    console.log(isCurrentBookings);
    isCurrentBookings ? getBookingsData() : getHistoryData();
  }, [isCurrentBookings, isrefresh]);

  return (
    <div className="history">
      <div className="history-container">
        {bookings.map((booking, index) =>
          isCurrentBookings ? (
            <div className="booking-card" key={index}>
              
              <div className="booking-name">
                {`${booking.helper.firstname ?? "No first name"} ${
                  booking.helper.lastname ?? "No last name"
                }`}
              </div>
              <div className="booking-card-text">Location:{booking.location}</div>
              <div className="booking-card-day-time">
                <div>Day: {booking.day}</div>
                <div>Time: {moment(booking.starttime).utc().format("HH:mm")}</div>
              </div>
              <div className="booking-card-text">Duration: {booking.duration} mins</div>
              {booking.status === "pending" ? (
                <div className={`booking-card-status-${booking.status}`}><span className={`booking-card-status-dot-${booking.status}`}></span>{booking.status}</div>
              ) : (
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
                        goTochatPage(booking.helper._id, booking.helper.firstname, booking.helper.lastname);
                      }}

                    >Chat</Button>
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
                      
                      onClick={() => deleteData(booking._id)}
                    >Cancel</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="booking-card" key={index}>
              <div className="booking-name">
                {`${booking.helper.firstname ?? "No first name"} ${
                  booking.helper.lastname ?? "No last name"
                }`}
              </div>
              <div className="booking-card-text">Location: </div>
              <div className="booking-card-day-time">

                <div>Day: {booking.day}</div>
                <div>Time: {moment(booking.starttime).utc().format("HH:mm")}</div>
              </div>
              <div className="booking-card-text">Duration: {booking.duration} mins</div>
              <div className={`booking-card-status-${booking.status}`}><span className={`booking-card-status-dot-${booking.status}`}></span>{booking.status}</div>
              
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
                    ...(!isCurrentBookings ? {
                      backgroundColor: "#D4FFBC",
                      color: "#024F09"
                    } : {color: "white",
                    backgroundColor: "#00720B",}),
                  }}
                  size="large"
                  onClick={() => setisCurrentBookings(true)}
                >
                  Current
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
                    ...(isCurrentBookings && {
                      color: "#024F09",
                    backgroundColor: "#D4FFBC",
                      
                    }),
                  }}
                  size="large"
                  onClick={() => setisCurrentBookings(false)}
                >
                  History
                </Button>
        

        
        
      
      </div>
    </div>
  );
};

export default History;
