import React from 'react'
import './CheckPassword.css'
import LogoC from "../../assets/LogoC.png"
function CheckPassword() {
  return (
    <>
    <div className="VerifyHolders">
    <div className="VerifyHolder">
    <div className="VerifyEmailAndLogoHolder">
    <h1 className="VerifyEmailText">Reset Password</h1>
    <img src={LogoC} alt="Vent" className="VerifyLogo" />
    </div>
    <div className="CheckYourEmailAndResend">
    <h2 className="VerificationText">Check your mail for link to reset your password</h2>
    </div>
    </div>
    </div>
    </>
  )
}

export default CheckPassword