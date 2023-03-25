import axios from "axios";

const url ="https://commutecare-vercel.vercel.app"
  // "https://commutecare.herokuapp.com"; // http://localhost:5000   // https://commutecare.herokuapp.com

export const login = async (email, password, data) => {
  const response = await axios.post(`${url}/userLogin`, {
    email,
    password,
  });

  const token = response.data.token;
  if (token) {
    localStorage.setItem("User", JSON.stringify(response.data.token));
    //console.log(response.data.token);
    localStorage.setItem("LoggedIn", true);
    localStorage.setItem("UserType", data);
    localStorage.setItem("UserID", response.data.userId);
    console.log(response.data);
  }

  return response.data;
};

export const loginHelper = async (email, password, data) => {
  const response = await axios.post(`${url}/helperLogin`, {
    email,
    password,
  });
  const token = response.data.token;
  if (token) {
    localStorage.setItem("User", JSON.stringify(response.data.token));
    //console.log(response.data.token);
    localStorage.setItem("LoggedIn", true);
    localStorage.setItem("UserType", data);
    localStorage.setItem("HelperID", response.data.helperId);
    console.log(response.data);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("User");
  localStorage.removeItem("UserType");
  localStorage.removeItem("UserID");
  localStorage.removeItem("HelperID");
  localStorage.setItem("LoggedIn", false);
};

export const signUp = async (email, password, data) => {
  const response = await axios.put(`${url}/userSignup`, {
    email: email,
    password: password,
  });

  const token = response.data.token;
  if (token) {
    localStorage.setItem("User", JSON.stringify(response.data.token));
    //console.log(response.data.token);
    localStorage.setItem("UserType", data);
    console.log(response.data);
  }

  return response.data;
};

export const verifyOTP = async (otp, email) => {
  const token = localStorage.getItem("User");
  const response = await axios.post(
    `${url}/verifyOTP`,
    {
      otp: Number(otp),
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  console.log(response.data);

  return response.data;
};

export const resendOTP = async (email) => {
  const token = localStorage.getItem("User");
  const response = await axios.post(
    `${url}/resendOTP`,
    {
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  console.log(response.data);

  return response.data;
};

export const additionalDetails = async (first, last, gender, dob, mob) => {
  const token = localStorage.getItem("User");
  const response = await axios.put(
    `${url}/additionalDetails`,
    {
      firstname: first,
      lastname: last,
      gender: gender,
      dob: dob,
      mob: mob,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  localStorage.setItem("UserID", response.data.user._id);
  localStorage.setItem("LoggedIn", true);
  console.log(response.data);

  return response.data;
};

export const forgotPass = async (email, data) => {
  console.log("email:", email);
  const response = await axios.post(`${url}/forgot-password`, {
    email: email,
  });
  //console.log(response.data.token);
  localStorage.setItem("UserType", data);
  console.log(response);

  return response.data;
};

export const signUpHelper = async (email, password, data) => {
  const response = await axios.put(`${url}/helperSignup`, {
    email: email,
    password: password,
  });

  const token = response.data.token;
  if (token) {
    localStorage.setItem("User", JSON.stringify(response.data.token));
    //console.log(response.data.token);

    localStorage.setItem("UserType", data);
    console.log(response.data);
  }

  return response.data;
};

export const resendOTPHelper = async (email) => {
  const token = localStorage.getItem("User");
  const response = await axios.post(
    `${url}/resendOTPHelper`,
    {
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  console.log(response.data);

  return response.data;
};

export const verifyOTPHelper = async (otp, email) => {
  const token = localStorage.getItem("User");
  const response = await axios.post(
    `${url}/verifyOTPHelper`,
    {
      otp: Number(otp),
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  console.log(response.data);

  return response.data;
};

export const additionalDetailsHelper = async (
  first,
  last,
  gender,
  dob,
  mob,
  bio,
  nation
) => {
  const token = localStorage.getItem("User");
  const response = await axios.put(
    `${url}/additional-details`,
    {
      firstname: first,
      lastname: last,
      dob: dob,
      mob: mob,
      gender: gender,
      description: bio,
      nationality: nation,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  localStorage.setItem("HelperID", response.data.helper._id);
  localStorage.setItem("LoggedIn", true);
  console.log(response.data);

  return response.data;
};

export const editAvailability = async (availability) => {
  const token = localStorage.getItem("User");
  const helperID = localStorage.getItem("HelperID");
  const response = await axios.put(
    `${url}/editAvailability/${helperID}`,
    {
      Monday: availability.Monday,
      Tuesday: availability.Tuesday,
      Wednesday: availability.Wednesday,
      Thursday: availability.Thursday,
      Friday: availability.Firday,
      Saturday: availability.Saturday,
      Sunday: availability.Sunday,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  console.log(response.data);

  return response.data;
};

export const forgotPassHelper = async (email, data) => {
  console.log("email:", email);
  const response = await axios.post(`${url}/forgot-password/helper`, {
    email: email,
  });
  //console.log(response.data.token);
  localStorage.setItem("UserType", data);
  console.log(response);

  return response.data;
};

export const passwordChange = async (pass, token) => {
  const response = await axios.post(`${url}/reset-password/${token}`, {
    password: pass,
  });
  console.log(response);

  return response.data;
};

export const passwordChangeHelper = async (pass, token) => {
  const response = await axios.post(`${url}/reset-password/helper/${token}`, {
    password: pass,
  });
  console.log(response);

  return response.data;
};

export const displayCustomerProfile = async () => {
  const token = localStorage.getItem("User");
  const response = await axios.get(`${url}/userProfile`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  console.log(response);

  return response.data;
};

export const displayHelperProfile = async () => {
  const token = localStorage.getItem("User");
  const response = await axios.get(`${url}/helperProfile`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  console.log(response);

  return response.data;
};

export const displayAvailHelperList = async (day, time, duration) => {
  const token = localStorage.getItem("User");
  const response = axios.get(
    `${url}/availableHelpers?day=${day}&time=${time}&duration=${duration}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  console.log(response);

  return response;
};

export const bookingHelper = async (helperId, day, time, duration, date, location, comments) => {
  const token = localStorage.getItem("User");
  const response = axios.post(
    `${url}/book`,
    {
      helperId: helperId,
      day: day,
      starttime: time,
      duration: duration,
      date: date,
      location: location,
      description: comments,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  console.log(response);

  return response;
};

export const getAvailability = async (helperId) => {
  const response = axios.get(`${url}/getAvailability/${helperId}`);
  console.log(response);
  return response;
};

export const addChatMessagesUser = async (userId, helperId, message) => {
  const response = axios.post(`${url}/addmsgUser`, {
    userId: userId,
    helperId: helperId,
    message: message,
  });
  console.log(response);
  return response;
};
export const addChatMessagesHelper = async (userId, helperId, message) => {
  const response = axios.post(`${url}/addmsgHelper`, {
    userId: userId,
    helperId: helperId,
    message: message,
  });
  console.log(response);
  return response;
};

export const getChatMessages = async (userId, helperId) => {
  const response = axios.get(`${url}/getmsg/${userId}/${helperId}`);
  return response;
};

export const getUserBookings = async () => {
  const token = localStorage.getItem("User");
  const response = axios.get(`${url}/user-booking`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return response;
};

export const getUserHistory = async () => {
  const token = localStorage.getItem("User");
  const response = axios.get(`${url}/booking-history`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return response;
};

export const getHelperPendings = async () => {
  const token = localStorage.getItem("User");
  const response = axios.get(`${url}/pending-requests`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return response;
};

export const getHelperConfirmedBookings = async () => {
  const token = localStorage.getItem("User");
  const response = axios.get(`${url}/confirmed-booking`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return response;
};

export const rejectBooking = async (bookingId) => {
  const token = localStorage.getItem("User");
  const response = axios.post(
    `${url}/decline-booking/${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  return response;
};

export const acceptBooking = async (bookingId) => {
  const token = localStorage.getItem("User");
  const response = axios.post(
    `${url}/accept-booking/${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }
  );
  return response;
};

export const cancelBooking = async (bookingId) => {
  const token = localStorage.getItem("User");
  const response = axios.delete(`${url}/delete/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return response;
};

export const reportIssue = async (email, title, description) => {
  const token = localStorage.getItem("User");
  const response = axios.post(`${url}/report`,{
    email: email,
    title: title,
    detailedDescription: description,
   } ,{
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return response;
};


export const completeBooking = async (bookingId) => {
  const token = localStorage.getItem("User");
  const response = axios.post(`${url}/complete-help`,{
    bookingId: bookingId,
   } ,{
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return response;
};