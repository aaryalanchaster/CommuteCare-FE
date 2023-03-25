import React from 'react'
import { Navigate } from 'react-router-dom';
import HomePage from '../Components/HomePage';



const Home = () => {
  
  const userLoggedIn = localStorage.getItem('LoggedIn');
  const userType = localStorage.getItem('UserType');
  console.log("User:", userType)
  
 
  return (
    <div>
      {userLoggedIn === 'true'? <>
      { userType === 'Customer' && <Navigate to='/customer' />}
      { userType === 'Helper' && <Navigate to='/helperHome'/>}
      </> :
      <HomePage />
      }
    
    </div>
  ) 
}

export default Home