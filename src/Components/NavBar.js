import React, {useState} from 'react';
import './NavBar.css';

import { Link } from "react-router-dom";

import {FaBars, FaTimes} from "react-icons/fa";

import { logout } from '../Routes/Login/AuthService';
import { FormControl, FormControlLabel, InputLabel, MenuItem, NativeSelect, Select, Switch } from '@mui/material';

import { green } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import logo from "../Assets/logo.jpg";

import i18n from "../Translation/i18n";
import { initReactI18next, useTranslation, Translation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation();
  const [click, setClick] = useState(false);
  const [language, setlanguage] = useState('');

    const handleClick = () => setClick(!click);
    
  const handleChange = (event) => {
    // console.log(event.target.value);
    i18n.changeLanguage(event.target.value);
    console.log(i18n.language);
    // console.log( t("welcome") );
  }

    const [color, setColor] = useState(false);
    const changeColor = () => {
        if(window.scrollY>= 100){
            setColor(true);
        }else{
            setColor(false);
        }
    };

    const userLoggedIn = localStorage.getItem("LoggedIn");
    const userType = localStorage.getItem("UserType");

    console.log('loggedIn:', userLoggedIn)

    window.addEventListener("scroll", changeColor);

    //swtich color
    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: green[600],
          '&:hover': {
            backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: green[600],
        },
      }));
      const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <img src={logo} alt="logo-img" className="nav-img"></img>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        {userLoggedIn === "true" ? (
          <>
            <li>
              <Link to="/">Home</Link>{" "}
            </li>
            <li>
              <Link to="/history">Booking</Link>{" "}
            </li>

            {userType === "Customer" && (
              <li>
                <Link to="/customerProfile">Profile</Link>{" "}
              </li>
            )}
            {userType === "Helper" && (
              <li>
                <Link to="/helperProfile">Profile</Link>{" "}
              </li>
            )}
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
            <li>
              <FormControl fullWidth>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleChange}
                >
                  <option value="en">en</option>
                  <option value="fr">fr</option>
                  {/* <option value="German">de-DE</option>
                  <option value="Spanish">es-ES</option> */}
                </NativeSelect>
              </FormControl>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#000" }} />
        ) : (
          <FaBars size={20} style={{ color: "#000" }} />
        )}
      </div>
    </div>
  );
}

export default NavBar