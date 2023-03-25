import React from 'react'
import { Navigate } from 'react-router-dom';
import AdditionalCustomerDetails from '../Components/AdditionalCustomerDetails'
import AdditionalHelperDetails from '../Components/AdditionalHelperDetails'

const AdditionalDetails = () => {
  const userType = localStorage.getItem('UserType');
  const userLoggedIn = localStorage.getItem('LoggedIn');
  console.log("type:", userType)
  return (
    <div>
        {userLoggedIn === 'true'? <>
          { userType === 'Customer' && <Navigate to='/customer' />}
          { userType === 'Helper' && <Navigate to='/helperHome'/>}
          </> :<>
            {userType === 'Customer' ? <AdditionalCustomerDetails /> : <AdditionalHelperDetails />
            }
            </>
          }
        
    </div>
  )
}

export default AdditionalDetails