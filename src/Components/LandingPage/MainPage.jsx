import React from "react"
import Header from "./Header"
import Hero from "./Hero"
import Service from "./Service"
import Category from "./Category"
import FAQ from "./FAQ"
import Footer from "./Footer"
import devC4 from "../../image/devC4.png"
import {AiOutlineInstagram, AiOutlineTwitter, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
const MainPage = () =>{
  const nav = useNavigate()
    return(
        <> 
        <Header />
        <Hero/>
        <Service/>
        <Category/>
        <FAQ/>
        

        <div className="footer" style={{marginBottom:"-5px"}}>
            <div className="social-media">
                <div className='s-b-holder'>
                <div className="logo">
                <img src={devC4} onClick={()=>nav('/homepage')} alt=""></img>
                </div>
                <h1>reativent</h1>
                </div>

                <div className="social-image">
                    <AiOutlineInstagram className='all-social-media'/>
                    <AiOutlineTwitter className='all-social-media'/>
                    <AiFillLinkedin className='all-social-media'/>
                    <AiFillFacebook className='all-social-media'/>
                </div>
            </div>

            <div className="details">
                <ul>
                    <li>Payment Method</li>
                    <li>About Us</li>
                    <li>Featurs</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="date">
                <h3>© 2023 Creativent.ng. All Rights Reserved.</h3>
            </div>
        </div>

        </>
    )
}

export default MainPage