import React from 'react'
import LoginPage from '../Components/LoginPage'
import { useLocation } from "react-router-dom";



const Login = () => {
  
  const location = useLocation();
 
  
  //console.log("State:", location.state.data)
  return (
    <div>
        <LoginPage data={location.state.data}/>
              
    </div>
  )
}

export default Login