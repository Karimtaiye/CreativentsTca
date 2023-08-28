import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function AllEvents() {
    const [GetAllEvents, setGetAllEvents] = useState([])
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const token = userOnLoggedIn.token
//   const id = userOnLoggedIn.id
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  console.log(token);
  const url = 'https://creativents-on-boarding.onrender.com/api/events'
  // const url = 'https://creativents-on-boarding.onrender.com/api/blockuser'

    const getAllUserEvents = () => {
        axios.get(url, config)
        .then(res=>{
            console.log(res)
            setGetAllEvents(res.data.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    console.log(GetAllEvents);
    useEffect(()=>{
        getAllUserEvents()
    },[])
  return (
    <>
      <div className='Content_Title'>
             <h4>All Events</h4>
        </div>
      {
        GetAllEvents.map((e)=>(
          <section className='All_Events'>
        <div className='AllEvents_Img'>
            <img src={e.eventImages} alt="" />
        </div>
        <div className='AllEvents_Data'>
            <div className='Blocked_UserInfo'>
            <h5>{e.eventName}</h5>
            <h5>{e.eventCategory}</h5>
            <h5>{e.eventLocation}</h5>
            <h5>&#8358; {e.eventPrice}</h5>
            </div>
            <div className='Blocked_ActionBn'>
                <button className='View_BlockedUser' onClick={()=>{
                        axios.put(`https://creativents-on-boarding.onrender.com/api/admin/report?reportId=${e._id}`, null ,config)
                        .then(res=>{
                          console.log(res);
                        })
                        .catch(err=>{
                          console.log(err);
                        })
                      }}>View</button>
                <button  className='Null_BlockedUser' onClick={()=>{
                        axios.delete(`https://creativents-on-boarding.onrender.com/api/Delete/${e.targetId}`, config)
                        .then(res=>{
                          console.log(res);
                        })
                        .catch(err=>{
                          console.log(err);
                        })
                      }}>Delete</button>
            </div>
        </div>

    </section>
        ))
      }
      
    </>
  )
}

export default AllEvents