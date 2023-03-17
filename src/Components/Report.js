import React from "react";
import "./ReviewAndReport.css";
import logo from "../Assets/logo.png";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { textAlign } from "@mui/system";

const Report = () => {
  const [email, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [issueTitle, setissueTitle] = useState("");
  const [issueTitleFlag, setissueTitleFlag] = useState(false);
  const [issueTitleError, setissueTitleError] = useState("");

  const [issueDescription, setissueDescription] = useState("");
  const [issueDescriptionFlag, setissueDescriptionFlag] = useState(false);
  const [issueDescriptionError, setissueDescriptionError] = useState("");

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
      setEmailFlag(true);
      return true;
    } else {
      setEmailError("");
      setEmailFlag(false);
      return false;
    }
  };

  const checkIssueTitle = (issueTitle) => {
    if (!issueTitle) {
      setissueTitleError("Enter the title for the issue");
      setissueTitleFlag(true);
      return true;
    } else {
      setissueTitleError("");
      setissueTitleFlag(false);
      return false;
    }
  };

  const checkIssueDescription = (issueDescription) => {
    if (!issueDescription) {
      setissueDescriptionError("Enter the issue description");
      setissueDescriptionFlag(true);
      return true;
    } else {
      setissueDescriptionError("");
      setissueDescriptionFlag(false);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var flag = true;
    if (
      validateEmail(email) ||
      checkIssueTitle(issueTitle) ||
      checkIssueDescription(issueDescription)
    ) {
      if (email.length === 0) {
        setEmailError("Enter Email");
        setEmailFlag(true);
      }
      if (!issueTitle) {
        setissueTitleFlag(true);
        setissueTitleError("Enter the title for the issue");
      }
      if (!issueDescription) {
        setissueDescriptionError("Enter the issue description");
        setissueDescriptionFlag(true);
      }
      return false;
    }

    //after successful submission
  };

  return (
    <div className="report">
      <div className="logo">
        <img src={logo} alt="logo-img" className="logo-img"></img>
      </div>
      <div className="report-container">
        <div className="report-content">
          <TextField
            id="email"
            label="email"
            variant="standard"
            error={emailFlag}
            helperText={emailError}
            type={"email"}
            sx={{ width: 500, marginTop: 3 }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <TextField
            id="issueTitle"
            label="Title of the issue"
            variant="standard"
            error={issueTitleFlag}
            helperText={issueTitleError}
            sx={{ width: 500, marginTop: 3 }}
            value={issueTitle}
            onChange={(e) => {
              setissueTitle(e.target.value);
            }}
            required
          />

          <TextField
            id="issueDescription"
            value={issueDescription}
            onChange={(e) => {
              setissueDescription(e.target.value);
            }}
            placeholder="Describe your issue  here (150 wordlimit)"
            multiline
            rows={3}
            maxRows={4}
            sx={{
              width: 500,
              marginTop: 5,
            }}
            error={issueDescriptionFlag}
            helperText={issueDescriptionError}
            inputProps={{ maxLength: 150 }}
            label="Issue Description"
          />

          <div className="review-button">
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
                width: "200px",
              }}
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
