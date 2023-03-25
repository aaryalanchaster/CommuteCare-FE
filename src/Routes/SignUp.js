import React from 'react'
import SignUpPage from '../Components/SignUpPage'
import { useLocation } from 'react-router-dom';

const SignUp = () => {
  const location = useLocation();
  return (
    <div>
        <SignUpPage data={location.state.userType}/>
    </div>
  )
}

export default SignUp