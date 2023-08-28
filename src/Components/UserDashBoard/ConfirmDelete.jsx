import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function ConfirmDelete({cancel, setConfirmation}) {
    const nav = useNavigate()
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const [msg, setMsg] = useState("Confirm Event Delete")
    const [subMsg, setSubMsg] = useState("This action cannot be undone")
    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(false)
    const [successDel, setSuccessDel] = useState(false)
    const { eventID } = useParams()

    const token = userOnLoggedIn.token
    const id = userOnLoggedIn.id
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }

    const url = `https://creativents-on-boarding.onrender.com/api/requestDelete/${eventID}`

    const deleteEventsById = () => {
        setLoading(true)
        console.log(token);
        axios.put(url, null, config)
        .then(res=>{
            setLoading(false)
            console.log(res)
            setMsg("Your request has been recieved and is being processed")
            setSubMsg("Click to Go back")
            setSuccessDel(true)
            setRequest(true)
            if(res){
                console.log("request sent")
            }
            else{
                console.log("error sending request");
            }
        })
        .catch(err=>{
            setLoading(false)
            setRequest(false)
            console.log(err)
            setMsg("Cannot send delete request")
            setSubMsg("Please try again later")
            if(err.message === "Network Error") {
                setMsg("No internet Connection")
                setSubMsg("Check your network and try again")
                console.log("You don't have an active internet Connection")
            }
        })
    }

    const cancelEventDelete = () => {

        nav(`/api/getUserWithLinks/${id}`)
    }

  return (
   <div className='MainDelete'>
     <div className="ConfirmDelete">
    <h1>{msg}</h1>
    <p>{subMsg}</p>
    <div className='BtnHolder'>
    {
        
        successDel?<button className='Goback' onClick={()=>{nav(`/api/getUserWithLinks/${id}`)}}>Go back</button>:       
        <>
        <button className='Canceled_Btn' style={{background:loading?"#583f0d":request?"#583f0d":null}}disabled={loading?true:request?true:false}  onClick={cancelEventDelete}>Cancel</button>
        <button className='Delete_Btn' style={{background:loading?"#1e2c52":request?"#1e2c52":null}} disabled={loading?true:request?true:false} onClick={deleteEventsById}>{loading?"Deleting":request?"Pending":"Delete"}</button>
        </>
        
    }
    </div>
     </div>
   </div>
  )
}

export default ConfirmDelete