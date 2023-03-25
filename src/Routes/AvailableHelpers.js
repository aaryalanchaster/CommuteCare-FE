import React from 'react'
import { useLocation } from 'react-router-dom';
import HelperList from '../Components/HelperList';
import NavBar from '../Components/NavBar';

const AvailableHelpers = () => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const day = queryParam.get('Day');
    const time = queryParam.get('time');
    const duration = queryParam.get('duration');
    
    
    

  return (
     <div>
        <NavBar />
        <HelperList Day={day} Time={time} Duration={duration} Comments={location.state.comments} Location={location.state.location} Date={location.state.dateFormat}/>
    </div>
  )
}

export default AvailableHelpers