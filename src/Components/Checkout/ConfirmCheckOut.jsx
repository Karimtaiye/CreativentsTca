import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GiConfirmed } from 'react-icons/gi'
import { BiSolidError } from 'react-icons/bi'
import { SpinnerCircularSplit } from 'spinners-react'
import {AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import { getBarCode } from '../Redux/State'
import { useDispatch } from 'react-redux'

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

function ConfirmCheckOut() {
const { id } = useParams()
const nav = useNavigate()
const Dispatch = useDispatch()
const ticketQuantity = useSelector((state)=>state.events.ticketQty)
const userOnLoggedIn = useSelector(state=>state.events.user)
const ticketPrice = useSelector((state)=>state.events.ticketPrice)
const [email, setEmail] = useState("")
const [DOB, setDOB] = useState("")
const [msg, setMsg] = useState("")
const [emailMsg, setEmailMsg] = useState("")
const [subMsg, setSubMsg] = useState("")
const [resAlert, setResAlert] = useState(false)
const [errors, seterrors] = useState(false)
const [loading, setLoading] = useState(false)

const token = userOnLoggedIn.token
const userEmail = userOnLoggedIn.email
const UserDetails = {email:token?userEmail:email, ticketQuantity, DOB}
console.log(ticketQuantity);
console.log(ticketPrice);

console.log(id);

const url = `https://creativents-on-boarding.onrender.com/api/tickets/${id}`
const BookEvent = () => {
    setLoading(true)
    setEmailMsg("")
    if(!token && !emailRegex.test(email)){
        // setResAlert(true)
        setEmailMsg("Invalid Email Format")
        // setSubMsg("Please check your email")
        setLoading(false)
      }
      else{
    axios.post(url, UserDetails)
    .then(res=>{
        console.log(res);
        Dispatch(getBarCode(res.data.data.barcode))
        nav(`/api/barcode/${res.data.data._id}`)
        setResAlert(true)
        setLoading(false)
            const refVal = "Creativents"+ Math.random() * 1000;
            window.Korapay.initialize({
              key: "pk_test_1QYXY85UpKezdtEXEGbhpnTxRx5ef2aQ4hsA46g7",
              reference: `${refVal}`,
              amount: ticketPrice * ticketQuantity, 
              currency: "NGN",
              customer: {
                // name: user.name,
                name: "user",
                email: email
                // name: user.email,
              },
              notification_url: "https://example.com/webhook"
            });

        if(res){
            console.log("response sent");
            setMsg("Ticket Purchased Successfully")
            setSubMsg("Check Your mail for your Ticket Details")
        }
        else{
            console.log("error sending response");
        }
    })
    .catch(err=>{
        console.log(err);
        seterrors(true)
        setLoading(false)
        setResAlert(true)
        if(err.message === "Network Error"){
            setMsg("Please check your Internet Connection")
            setSubMsg("And try again")
            
        }

        if(err.message === "Requested ticket quantity exceeds available tickets"){
            setMsg("Requested ticket quantity exceeds available tickets")
            setSubMsg("please select lower quantity")
        }
        else if(err.response.data.error === "Cannot read property 'DOB' of null"){
            setMsg("Cannot Purchase Ticket")
            setSubMsg("Please Provide Your DOB")
        }
        else
        
        {  
            setMsg("Ticket Purchased Failed")
            setSubMsg("Please try again")
          }
    })
}
}

  return (
    <div className='Checkout_PopUp'>
                    <div style={{background:resAlert?"white":null, gap:resAlert?"10px":null}} className='CheckOut_Content'>

                {
                    resAlert?
                    <>
                        <h2>{msg}</h2>
                        <h4>{subMsg}</h4>
                       {
                         resAlert && !errors?<GiConfirmed className='succ' style={{fontSize:"100px", color:"green"}}/>  :         
                         <BiSolidError className='fail' style={{fontSize:"100px", color:"red"}}/>
                         
                       }
                        <button className='Purchase_ContBtn' onClick={()=>nav(`/api/events/${id}`)}>Go back</button>

                    </>
                    :
                    <>
                        <h4>Please input your email and Date of Birth for purchase</h4>
                    <h6 style={{color:"red"}}>{emailMsg}</h6>
                    {
                    !token?<input style={{border:emailMsg?"1px solid red":null}} className='CheckOut_Input' placeholder='Email' type="email" onChange={(e)=>setEmail(e.target.value)}/>:null
                    }
                    <input className='CheckOut_Input' placeholder='Date of Birth' type="date" onChange={(e)=>setDOB(e.target.value)}/>
                    <div className='CheckOut_Btns'>
                        {
                            resAlert? <button  className='CheckOut_ConfirmBtn' onClick={()=>nav(`/api/events/${data._id}`)}>Go Back</button>:
                            <>
                            <button className='CheckOut_CancelBtn' onClick={()=>nav(`/api/events/${id}`)} disabled={loading}>Cancel</button>
                            <button className='CheckOut_ConfirmBtn' style={{background:loading?"#08022f93":null}} disabled={loading} onClick={BookEvent}>{
                                loading?<SpinnerCircularSplit style={{animation:"slideInUp",animationDuration:"0.5s"}} size={30} thickness={150} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0.44)" />:
                                "Confirm Book"}</button>
                            </>
                        }
                    </div>
                    </>
                }
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
                <BsFillCheckSquareFill onClick={()=>nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
                <h5>My events</h5>
            </div>
          </div>
            </div>
  )
}

export default ConfirmCheckOut