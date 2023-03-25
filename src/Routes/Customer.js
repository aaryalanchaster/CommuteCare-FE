import React from 'react'
import Reservation from '../Components/Reservation'
import NavBar from '../Components/NavBar'
import { Navigate } from 'react-router-dom';

const Customer = () => {
  const userLoggedIn = localStorage.getItem('LoggedIn');
  return (
    <div>
      
      {!userLoggedIn ? <Navigate to='/' /> :<>
        <NavBar />
        <Reservation />
       </>}
      
    </div>
  )
}

export default Customer