import React from "react";
import "./index.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Customer from "./Routes/Customer";
import Helper from "./Routes/Helper";
import AvailableHelpers from "./Routes/AvailableHelpers";
import ConfirmationPage from "./Routes/ConfirmationPage";
import Login from "./Routes/Login";
import EmailVerification from "./Routes/EmailVerification";
import SignUp from "./Routes/SignUp";
import AdditionalDetails from "./Routes/AdditionalDetails";
import HelperHome from "./Routes/HelperHome";
import HelperAvailability from "./Routes/HelperAvailability";
import ForgotPassword from "./Routes/ForgotPassword";
import NewPassword from "./Components/NewPassword";
import HelperProfile from "./Routes/HelperProfile";
import CustomerProfile from "./Routes/CustomerProfile";
import LoginChoice from "./Routes/LoginChoice";
import Review from "./Components/Review";
import Report from "./Components/Report";
import ChatPage from "./Routes/ChatPage";
import HistoryPage from "./Routes/HistoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginChoice" element={<LoginChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/additionalDetails" element={<AdditionalDetails />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/emailVerification" element={<EmailVerification />} />

        <Route path="/helperHome" element={<HelperHome />} />
        <Route path="/helperAvailability" element={<HelperAvailability />} />
        <Route path="/customer" element={<Customer />} />
        {/* <Route path="/helper" element={<Helper />} /> */}
        <Route path="/availableHelpers" element={<AvailableHelpers />} />
        <Route path="/confirmationPage" element={<ConfirmationPage />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/customerProfile" element={<CustomerProfile />} />
        <Route path="/helperProfile" element={<HelperProfile />} />
        <Route path="/review" element={<Review />} />
        <Route path="/report" element={<Report />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
