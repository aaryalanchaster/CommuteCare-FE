import React from 'react'
import { Navigate } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import Footer from '../Components/Footer';


/**
 * *This is Home Page of the Website
 * *It redirects to the respective home page of the user or helper if the user is already logged in
 * 
 */


const Home = () => {
  
  const userLoggedIn = localStorage.getItem('LoggedIn');
  const userType = localStorage.getItem('UserType');
  console.log("User:", userType)
  
 
  return (
    <div>
      {userLoggedIn === 'true'? <>
      { userType === 'Customer' && <Navigate to='/customer' />}
      { userType === 'Helper' && <Navigate to='/helperHome'/>}
      </> : <>
      <HomePage />
      <Footer />
      </>
      }

    </div>
  ) 
}

export default Home