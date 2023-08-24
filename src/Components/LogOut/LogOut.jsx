import React, { useState } from 'react'
import './LogOut.css'
import './LogOutMobile.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { userStoreData } from '../Redux/State'
import { useDispatch, useSelector } from 'react-redux'

function LogOut() {
  const Dispatch = useDispatch()
    const { id } = useParams()
  const userOnLoggedIn = useSelector(state=>state.events.user)
    const nav = useNavigate()
    const [confirmation, setConfirmation] = useState(false)
    const url = `https://creativents-on-boarding.onrender.com/api/logout/${id}`
    const [logOutMsg, setLogOutMsg] = useState("")
    const token = userOnLoggedIn.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const SignOutUser = () => {
        setConfirmation(true) 
        setLogOutMsg("Signing out........")
        axios
        .put(url, null, config)
        .then(res=>{
            console.log(res)
            setLogOutMsg("Successfully loggedOut")
            nav('/login') 
            Dispatch(userStoreData({email:"", id:"", token:"",name:"",login:false}))

        })
        .catch(err=>{
            console.log(err)
            if(err.message === "Network Error"){
              setLogOutMsg("Please check your Internet Connection")
              console.log("error");
            }
            else{
              setLogOutMsg("Error Logging Out")
            }
            
            setConfirmation(false)
        })
    }
    console.log(userOnLoggedIn);
  return (
    <>
    <div className="Logout_Container">
        
      {
        confirmation?
        <>
            <h1 className="Logout_Status">{logOutMsg}</h1>
            <p className="Logout_Message"></p>
        </>:
         <div className='Confirmation_Card'>
         <h3>Are you sure you want to log out</h3>
         <div className='LogOutBtn'>
         <button className='LogOutBtn_Confirmed' onClick={SignOutUser}>Log Out</button>
         <button className='LogOutBtn_Deny' onClick={()=>nav('/homepage')}>Go Back</button>
         </div>
        </div>

      }
    </div>
    </>
  )
}

export default LogOut