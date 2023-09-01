import React, { useEffect, useState } from 'react'
import { BiShow, BiHide, BiArrowBack } from 'react-icons/bi'
import './LogIn.css'
import './LogInMobile.css'
import axios from'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { userStoreData } from '../Redux/State'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileUpdate } from '../Redux/State'
import LogoC from "../../assets/LogoC.png"
import { SpinnerDotted } from 'spinners-react'

function LogIn() {
  const Dispatch = useDispatch()
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const initUpdates = useSelector(state=>state.events.userInitUpdate)
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [errorBorder, setErrorBorder] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileName, setProfileName] = useState("")
    const userLogInData ={email:email.trim().toLowerCase(), password}

  const url = "https://creativents-on-boarding.onrender.com/api/login"
  // const url = "https://creativents-on-boarding.onrender.com//api/events/:eventID/review" 
 const userLogIn = (e) => {
  setErrorBorder(false)
  setLoading(true)
  setError(false)
  e.preventDefault()
   if(!email){
    // setError({error:true, type:"password", msg:"Password must contain at least 8 characters, including a lowercase letter, an uppercase letter, and a digit"})
    setLoading(true)

  }
  else if(!password){
    // setError({error:true, type:"confirmpassword", msg:"password does not match"})
    setLoading(false)
  }

  axios.post(url, userLogInData)
    .then(res=>{console.log(res)
      {
        res.data.data.isLogin?setError("User is Already Logged In on another device or page"):
        Dispatch(userStoreData({
          email:res.data.data.email, 
          id:res.data.data._id,
          token:res.data.data.token,
          name:res.data.data.firstname,
          login:res.data.data.islogin,
          profilePicture: res.data.data.profilePicture,
          admin: res.data.data.isAdmin
        }))
  
        Dispatch(userProfileUpdate(res.data.data))
        nav('/homepage')
  
      }
    })
    .catch(err=>{
      console.log(err)
      if(err.message === "Network Error"){
        setError("Please check your Internet Connection")
        console.log("error");
      }
      else if(err.response.data.message === "Incorrect Password"){
        setError("Email and password does not match")
        console.log("error");
      }
      else{
        setError(err.response.data.message)
      }
      setLoading(false) 
      setErrorBorder(true)
    })
 }

 console.log(userOnLoggedIn)
 console.log(initUpdates)

  useEffect(()=>{
    
  },[])

  return (
    <div className='logIn'>
    <section className='input_LogIn'>
      <div className='LogIn_logo'>
        <BiArrowBack className='back_ArrowLogin'  onClick={()=>nav('/')}/>
        <img src={LogoC} alt="" onClick={()=>nav('/landingpage')} style={{cursor:"pointer"}}/>
          {/* <NavLink to={'/signup'}> */}
          <span className='Reg_Route' onClick={()=>nav('/signup')}>Register</span>
          {/* </NavLink> */}
      </div>
       <div className='user_Auth'>
         <div className='user_Auth_wrapper'>
           <h1>Log  <span> in</span> to your account</h1>
           <form className="Input_auth">
                <div className='Inputs_Login'>
                    {/* <label className='labels'>Email</label> */}
               <input className='Mobile_Inputs' type="text" placeholder='Email' style={{border:errorBorder?"1px solid rgb(255, 178, 29)":null}} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
               {/* <span style={{fontSize:"13px", color:"rgb(255, 178, 29)", display:"flex", alignSelf:"flex-start", marginLeft:"20%", marginTop:"1%"}}>{error}</span> */}
               
               {/* <label className='labels'>Password</label> */}
               <input className='Mobile_Inputs' type={passwordShow?"text":"password"} placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
               <span className='error_msg'>{error}</span>
               {
               passwordShow? <BiHide  className='password_VisibilityLogIn' onClick={()=>setPasswordShow(!passwordShow)}/>
               :<BiShow  className='password_VisibilityLogIn' onClick={()=>setPasswordShow(!passwordShow)}/>
               }
             <div className='auth_Action'>
              <p onClick={()=>nav('/forgotpassword')}>Forgot password?</p>
              <button className='login_Btn' style={{backgroundColor:loading?"rgb(182, 132, 32)":null}} onClick={userLogIn} disabled={loading} >{loading?<SpinnerDotted size={40} thickness={50} speed={100} color="#ffffff" />:"Log in"}</button>
              <span>Don't have an account? <a onClick={()=>nav('/signup')}>sign up</a></span>
             </div>
           </form>
         </div>
       </div>
    </section>
    <section className='image_LogIn'>
    </section>
 </div>
  )
}   

export default LogIn