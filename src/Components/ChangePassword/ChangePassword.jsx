import React, { useState } from 'react';
import './ChangePassword.css'
import './ChangePasswordMedia.css'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import LogoC from "../../assets/LogoC.png"
function ChangePassword() {
  const nav = useNavigate()
  const { id } = useParams()
  const userSignUpData = useSelector(state=>state.events.userRes)
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const token = userOnLoggedIn.token
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }


  const url = `https://creativents-on-boarding.onrender.com/api/changepassword/${id}`
  const ChangePassword = () => {
    if (password !== confirmPassword) {
      alert('New password and confirm password do not match.');
    }
    else{
      axios.put(url, {password} , config)
      .then(res=>{
        console.log(res);
        nav('/login')
      })
      .catch(err=>{
        console.log(err);
      })
    }
  };

  return (
    <div className='User_ChangePassword'>
      <div className='mypasswordHolder'>
        <img className='LogoCee' onClick={(nav('/homepage'))} src={LogoC} alt="Logo" />
            <div className='mypasswordraper'>
      <h2>Change Password</h2>
      <div>
        <label>Current Password:</label>
        <input type="password" value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}} />
      </div>
      <div>
        <label>New Password:</label>
        <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
      </div>
      <button onClick={ChangePassword}>Change Password</button>
      </div>
    </div>

    <div className="directiontodifferentpage">
            <div className="Homedirection">
                <AiFillHome onClick={()=>nav('/homepage')} className="directionmain"/>
                <h5>Home</h5>
            </div>

            <div className="Homedirection">
                <MdCreateNewFolder onClick={()=>nav('/upload')} className="directionmain"/>
                <h5>Create</h5>
            </div>
            <div className="Homedirection">
                <BsFillCheckSquareFill onClick={nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
                <h5>My events</h5>
            </div>
          </div>
    </div>
  
  );
}

export default ChangePassword;
