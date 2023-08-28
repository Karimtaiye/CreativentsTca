import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AllPromoted() {
    const [allPromoted, setAllPromoted] = useState([])
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const token = userOnLoggedIn.token
  //   const id = userOnLoggedIn.id
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    console.log(token);
    const url = 'https://creativents-on-boarding.onrender.com/api/admin/reports'
    // const url = 'https://creativents-on-boarding.onrender.com/api/blockuser'
  
      const getAllPromotedEvents = () => {
          axios.get(url, config)
          .then(res=>{
              console.log(res)
              setAllPromoted(res.data.data)
          })
          .catch(err=>{
              console.log(err);
          })
      }
      console.log(allPromoted);
      useEffect(()=>{
        getAllPromotedEvents()
      },[])
  
  return (
    <>
      <div className='Content_Title'>
             <h4>All Promoted Events</h4>
        </div>
      {
        allPromoted.map((e)=>(
          <section className='Blocked_Users'>
        <div className='Blocked_UserImg'>
        </div>
        <div className='Blocked_UsersData'>
            <div className='Blocked_UserInfo'>
            <h5>Email</h5>
            <h5>UserName</h5>
            <h5>{e.reason}</h5>
            </div>
            <div className='Blocked_ActionBn'>
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
