import React from 'react'
import { useLocation } from 'react-router-dom';
import EmailVerificationPage from '../Components/EmailVerificationPage'
import NavBar from '../Components/NavBar'

const EmailVerification = () => {
  const location = useLocation();
  return (
    <div>
      
      <EmailVerificationPage data={location.state.data}/>
    </div>
  )
}

export default EmailVerification