import React from 'react'
import './ForgotPassword.css'
import './ForgotPasswordMobile.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import LogoC from "../../assets/LogoC.png"

function ForgotPassword() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  // console.log({email});

    const url = "https://creativents-on-boarding.onrender.com/api/forgotpassword"
    
    const ResetPassword = () => {

      axios.post(url, {email})
      .then(res=>{
        console.log(res)
        nav('/checkpassword')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  return (
   <>
    <div className="Holders">
    <div className="EmailHolder">
    <div className="ForgetPasswordAndLogoHolder">
    <h2 className="ForgetPassword">Forgot Password</h2>
    <img src={LogoC} alt="Vent" className="ForgetPasswordLogo" />
    </div>
    <div className="EnterEmailAndSendCodeHolder">
    <div className="EnterEmailHolder">
    <h2 className="EnterEmailHolderText">Enter the Email used in registering</h2>
    </div>
    <div className="EmailAndSendCodeHolder">
    <h3 className="TextEmail">Email</h3>
    <input type="text" className="EmailInput" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
    <button className="SendCodeText" onClick={ResetPassword}>Send Code</button>
    </div>
    </div>
    </div>
    </div>
   </>
  )
}

export default ForgotPassword
