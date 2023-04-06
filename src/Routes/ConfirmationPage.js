import React, {useEffect} from 'react'
import Booked from '../Components/Booked'
import NavBar from '../Components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from '../Translation/i18n';
import Footer from '../Components/Footer';

/**
 * *Page that confirms the booking of the helper 
 * * - when the user clicks on BOOK NOW button
 * 
 */

const ConfirmationPage = () => {
    const location = useLocation();
 
    const navigate = useNavigate();

    useEffect(() => {
      i18n.changeLanguage(localStorage.getItem('lang'));

      const backButtonCheck = (event) => {
        if(window.location.pathname === '/availableHelpers'){
        
          navigate(-2); 
        }
      };
      
      window.addEventListener("popstate",backButtonCheck)
      return () => {
        window.removeEventListener('beforeunload', backButtonCheck);
      }
    }, [navigate])
    
  return (
    <div>
        <NavBar />
        <Booked 
        
        
        PersonName={location.state.bookdata.Person.firstname+ ' ' + location.state.bookdata.Person.lastname} 
        PersonEmail={location.state.bookdata.Person.email} 
        PersonMob = {location.state.bookdata.Person.mob}
        PersonId = {location.state.bookdata.Person._id}
        Day={location.state.bookdata.day}
        Time={location.state.bookdata.time}
        Duration= {location.state.bookdata.duration}
        Location = {location.state.bookdata.location}
        Comments = {location.state.bookdata.comments}
        Date = {location.state.bookdata.date}

        />
        <Footer />
        
    </div>
  )
}

export default ConfirmationPage