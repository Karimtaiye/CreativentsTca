import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function GetAllPending() {
    const [GetAllReports, setGetAllReports] = useState([])
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const token = userOnLoggedIn.token
  //   const id = userOnLoggedIn.id
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    console.log(token);
    const url = 'https://creativents-on-boarding.onrender.com/api/eventsPendingDelete'
    // const url = 'https://creativents-on-boarding.onrender.com/api/blockuser'
  
      const getAllUserReports = () => {
          axios.get(url, config)
          .then(res=>{
              console.log(res)
              setGetAllReports(res.data.data)
          })
          .catch(err=>{
              console.log(err);
          })
      }
      console.log(GetAllReports);
      useEffect(()=>{
          getAllUserReports()
      },[])
    return (
        <>
      <div className='Content_Title'>
             <h4>All Pending Deletion</h4>
        </div>
      {
        GetAllReports.map((e)=>(
          <section className='Blocked_Users'>
        <div className='Blocked_UserImg'>
            <img src={e.eventImages} alt="" />
        </div>
        <div className='Blocked_UsersData'>
            <div className='Blocked_UserInfo'>
            <h5>{e.eventName}</h5>
            <h5>{e.eventCategory}</h5>
            <h5>Date: {e.customUpdatedAt}</h5>
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
                        axios.delete(`https://creativents-on-boarding.onrender.com/api/Delete/${e._id}`, config)
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

export default GetAllPending