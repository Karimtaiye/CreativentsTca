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
    const [successDel, setSuccessDel] = useState(false)
    const { eventID } = useParams()

    const token = userOnLoggedIn.token
    const id = userOnLoggedIn.id
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }

    const url = `https://creativents-on-boarding.onrender.com/api/Delete/${eventID}`

    const deleteEventsById = () => {
        setLoading(true)
        console.log(token);
        axios.delete(url, config)
        .then(res=>{
            setLoading(false)
            console.log(res)
            setMsg("Event Deleted Successfully")
            setSubMsg("Click to Go back")
            setSuccessDel(true)
            if(res){
                console.log("request sent")
            }
            else{
                console.log("error sending request");
            }
        })
        .catch(err=>{
            setLoading(false)
            console.log(err)
            setMsg("Error Deleting Event")
            setSubMsg("Please try again later")
            if(err.message === "Network Error") {
                setMsg("No internet Connection")
                setSubMsg("Check your network and try again")
                console.log("You don't have an active internet Connection")
            }
        })
    }

    const cancelEventDelete = () => {
        // setConfirmation(cancel)
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
        <button className='Canceled_Btn' style={{background:loading?"#583f0d":null}} disabled={loading}  onClick={cancelEventDelete}>Cancel</button>
        <button className='Delete_Btn' style={{background:loading?"#1e2c52":null}} disabled={loading} onClick={deleteEventsById}>{loading?"Deleting":"Delete"}</button>
        </>
        
    }
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
                <BsFillCheckSquareFill onClick={()=>nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
                <h5>My events</h5>
            </div>
          </div>
   </div>
  )
}

export default ConfirmDelete
