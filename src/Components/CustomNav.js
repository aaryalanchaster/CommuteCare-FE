import React, { useEffect } from 'react'
import './LoginChoicePage.css';
import logo from "../Assets/logo.jpg";
import { FormControl, NativeSelect } from '@mui/material';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import i18n from "../Translation/i18n"; 


const CustomNav = () => {
  const [language, setlanguage] = useState(null);

  const handleChange = (event) => {
     setlanguage(event.target.value);
     localStorage.setItem('lang', event.target.value);
    console.log(event.target.value);

    // console.log(event.target.value);
      
        i18n.changeLanguage(event.target.value);
      
        console.log(i18n.language);
    
        // console.log( t("welcome") );
  }
  useEffect(() => {
        
    i18n.changeLanguage(localStorage.getItem('lang'));
    console.log('lang--',localStorage.getItem('lang'))
    
  }, [])

  return (
    <div>
        <div className='logo'>
                <img src={logo} alt='logo-img' className='logo-img'></img>
                <FormControl sx={{width: 100}}>
                    <NativeSelect
                    defaultValue={localStorage.getItem('lang')}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    onChange={handleChange}
                    >
                    <option value="en">en</option>
                    <option value="fr">fr</option>
                    
                    </NativeSelect>
                </FormControl>
            </div>
    </div>
  )
}

export default CustomNav