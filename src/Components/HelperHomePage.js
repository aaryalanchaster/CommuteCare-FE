import React from 'react'
import { Link } from 'react-router-dom'
import './HelperHomePage.css'

const HelperHomePage = () => {
  return (
    <div className='helper-home'>
        <div className='helper-home-container'>
            <Link to='/helperAvailability' className='btn' >Availability</Link>
        </div>
    </div>
  )
}

export default HelperHomePage