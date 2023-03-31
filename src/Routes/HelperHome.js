import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Components/NavBar'

import HelperAvailabilityPage from '../Components/HelperAvailabilityPage'

const HelperHome = () => {
  return (
    <div>
        <NavBar />
        <HelperAvailabilityPage />

    </div>
  )
}

export default HelperHome