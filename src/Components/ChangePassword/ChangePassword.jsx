import React, { useEffect, useState } from 'react';
import './ChangePassword.css'
import './ChangePasswordMedia.css'
import { useSelector } from 'react-redux'
import axios from 'axios';
import {useParams, useNavigate } from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import LogoC from "../../assets/LogoC.png"
import { GiConfirmed } from 'react-icons/gi'
import { BiSolidError } from 'react-icons/bi'
function ChangePassword() {
  const nav = useNavigate()
  const { id } = useParams()
  
  const userSignUpData = useSelector(state=>state.events.userRes)
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [succMsg, setSuccMsg] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  
  const token = userOnLoggedIn.token
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }


  const url = `https://creativents-on-boarding.onrender.com/api/changepassword/${id}`
  useEffect(()=>{
    if(currentPassword === "")
  {
    setLoading(true)
  }
    else if(password === "")
  {
    setLoading(true)
  }
    else if(confirmPassword === "")
  {
    setLoading(true)
  }
  else{
    setLoading(false)
  }
  },[currentPassword, confirmPassword, password])
  const ChangePassword = () => {
    setLoading(true)
    if (password !== confirmPassword) {
      alert('New password and confirm password do not match.');
      setLoading(false)
    }
    else{
      axios.put(url, {password} , config)
      .then(res=>{
        setLoading(false)
        console.log(res.data.data)     
*        setVisible(true);

          setTimeout(() => {
              setVisible(false);
              nav('/homepage'); 
            }, 5000)
        if (res){
            console.log("response sent")
            setSuccMsg("Password Updated Successfully")
        }else{
            console.log('Cannot Update Profile')
        }
    })
    .catch(err=>{
        console.log(err);
        setLoading(false)
        setError(true)
        setVisible(true);
        setTimeout(() => {
        setVisible(false);
          }, 3000)
        if(err.message === "Network Error"){
          setSuccMsg("Please check your Internet Connection")
        }
        else{ 
          setSuccMsg("Error Creating Event")
          }
    })

  }
}
  return (
    <div className='User_ChangePassword'>
      <div className='mypasswordHolder'>
        <img className='LogoCee' onClick={()=>(nav('/homepage'))} src={LogoC} alt="Logo" />
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
      <button style={{background:loading?"#815907":null}} disabled={loading} onClick={ChangePassword}>Change Password</button>
      </div>
    </div>

    {
            visible ?
            <div className="Update_PopUpMsg">
            <h2>{succMsg}</h2>
           {
             error?<BiSolidError style={{fontSize:"100px", color:"red"}}/> :         
             <GiConfirmed style={{fontSize:"100px", color:"green"}}/> 
           }
            {/* <button className="Canceled_Btn" onClick={()=>nav('/homepage')}>Go Back</button> */}
        </div>:null  
          }

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
                <BsFillCheckSquareFill onClick={()=>nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
                <h5>My events</h5>
            </div>
          </div>
          {
            visible ?
            <div className="Update_PopUpMsg">
            <h2>{succMsg}</h2>
           {
             error?<BiSolidError style={{fontSize:"100px", color:"red"}}/> :         
             <GiConfirmed style={{fontSize:"100px", color:"green"}}/> 
           }
            {/* <button className="Canceled_Btn" onClick={()=>nav('/homepage')}>Go Back</button> */}
        </div>:null  
          }
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
                <BsFillCheckSquareFill onClick={()=>nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
                <h5>My events</h5>
            </div>
          </div>
    </div>
  
  );
}

export default ChangePassword;
