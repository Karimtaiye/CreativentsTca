import React, { useState } from 'react'
import './NewPassword.css'
import './NewPasswordMobile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function NewPassword() {
  const nav = useNavigate()
 const { id, token } = useParams()
 const [newPassword, setNewPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
 const [message, setMessage] = useState("")
 const [showMessage, setShowMessage] = useState(false)
  const url =`https://creativents-on-boarding.onrender.com/api/changepassword/${id}/${token}`
  console.log({newPassword, confirmPassword});
  const ConfirmNewPassord = () => {
     axios.post(url, {password: newPassword, confirmPassword})
    .then(res=>{
    console.log(res)
    setMessage(res.data)
    setShowMessage(true)
    // nav('/login')

   })
    .catch(err=>{
      console.log(err)
    setMessage("Failed to change password, Please try again ")
   })
   }
  return (
    <>
    <div className="ResetMainHolder">
        <div className="ResetHolder">
            <div className="resetrapper">
                <h2 className="ResetPassword">Reset Your Password</h2>
                
                <div className="rrr">
                <h3 className="ResetnewPassword">New Password</h3>
                <input type="password" className="ResetInputt" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                </div>

                <div className="rrr">
                <h3 className="ResetnewPassword">Confirm New Password</h3>
                <input type="password" className="ResetInputt"  value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>
                <button className="ResetButton" onClick={ConfirmNewPassord}>Continue</button>
            </div>
        </div>
    </div>
    {
      showMessage?<div className="Pass_Container">
    <h1>{message}</h1>
   </div>:null
    }
    </>
  )
}

export default NewPassword

