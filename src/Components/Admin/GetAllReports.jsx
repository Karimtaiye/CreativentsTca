import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function GetAllReports() {
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
  const url = 'https://creativents-on-boarding.onrender.com/api/admin/reports'
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
      {
        GetAllReports.map((e)=>(
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
                        axios.put(`https://creativents-on-boarding.onrender.com/api/blockuser/${e._id}`, null ,config)
                        .then(res=>{
                          console.log(res);
                        })
                        .catch(err=>{
                          console.log(err);
                        })
                      }}>Block</button>
            </div>
        </div>

    </section>
        ))
      }
      
    </>
  )
}

export default GetAllReports