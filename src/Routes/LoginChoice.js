import React from 'react'
import { Navigate } from 'react-router-dom'
import LoginChoicePage from '../Components/LoginChoicePage'

const LoginChoice = () => {
  const userLoggedIn = localStorage.getItem('LoggedIn');
  const userType = localStorage.getItem('UserType');
  
  return (
    <div>
        {userLoggedIn ==='True'? <>
          { userType === 'Customer' && <Navigate to='/customer' />}
          { userType === 'Helper' && <Navigate to='/helperHome'/>}
          </> : <LoginChoicePage />}
    </div>
  )
}

export default LoginChoice