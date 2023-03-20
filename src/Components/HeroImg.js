import React from 'react';
import './HeroImg.css';


import IntroImg from "../Assets/home-page.jpg";
import {Link} from "react-router-dom";

const HeroImg = () => {
  return (
    <div className="hero">
    
        <div className="mask">
            <img className="intro-img" src={IntroImg} alt='heroImg'></img>
        </div>
        <div className="content">
            
            <h1>CommuteCare</h1>
            <div>
            <Link className='btn' to="/customer"
                      state={{data: "Customer"}}
                        >Get Started</Link>
            </div>
        </div>
    </div>
  )
}

export default HeroImg