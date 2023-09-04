import { useNavigate, useParams } from "react-router-dom"
import "./BarCode.css"
import "./BarCodeResponsive.css"
import {BiArrowBack} from "react-icons/bi"
import { useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
import {MdNetworkCheck} from 'react-icons/md'
import {SpinnerDotted} from 'spinners-react'

const BarCode = () =>{
    const code = useSelector(state=>state.events.barCode)
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const purchasedID = useSelector(state=>state.events.eventID)
    const nav = useNavigate()
    const token = userOnLoggedIn.token
    const userID = userOnLoggedIn.id
    console.log(code);
    const { id } = useParams()
    const [ticketData, setTicketData] = useState()
    const [msg, setMsg] = useState("")
    const [network, setNetwork] = useState(false)

    console.log(purchasedID);
    console.log(userID);
    const url = `https://creativents-on-boarding.onrender.com/api/tickets/${id}`
    console.log(id);
    const getBarCode = () => {
        axios.get(url)
    .then(res=>{
        console.log(res)
        setTicketData(res.data.data)
    })
    .catch(err=>{
        console.log(err);
        if(err.message === "Network Error"){
            setMsg("Unable to connect to the Internet")
            setNetwork(true)
        }
        else if(err.response.data.message === "jwt expired"){
            nav('/login')
        }
        else {
            setMsg(err.response.data.message)
        }
    })
    }

    useEffect(()=>{
        getBarCode()
    },[])
    return(
        <>
       {
        !ticketData?<div style={{width:"100%",
        height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
       <h1 style={{
        fontSize:"26px", color:"white", textAlign:"center"
    }}>{msg}</h1>
    {
        network?<MdNetworkCheck className='Network_Icon' />:<SpinnerDotted size={250} thickness={50} speed={100} color="#ffffff" />
    }
    </div>:
        <div className="BackCodeHolder">
        <div className="CodeHolder">
            <div className="BackLogoHolder">
                <img src="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" alt="" className="CodeImage"/>
                <img src="./src/assets/Vent.png" alt="" className="CodeImage"/>
                <BiArrowBack style={{cursor:"pointer"}} onClick={()=>nav(!token?`/api/events/${purchasedID}`:`/api/getUserWithLinks/${userID}`)} className="CodeIcon"/>

            </div>
            <div className="BackSectionAndSeatHolder">
                <h2 className="CodeText">{ticketData.email}</h2>
                <h2 className="CodeText">{ticketData.link.eventDate === null? "EventDate" :ticketData.link.eventDate}</h2>
            </div>
            <article className="Added">
                <h2>This ticket admits {ticketData.ticketQuantity}</h2>
            </article>
            <div className="BackCodeHolderAndPartyHolder">
                <div className="BackCode">
                    <img src={`data:image/png;base64, ${code}`} alt="" />
                </div>
                <h2 className="Graduation">{ticketData.link.eventName === null? "EventName": ticketData.link.eventName}</h2>
            </div>
        </div>
    </div>
       }
        </>
    )
}
export default BarCode