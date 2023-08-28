import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
function ActiveUsers() {
    const [activeUsers, setActiveUser] = useState([])
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const token = userOnLoggedIn.token
  //   const id = userOnLoggedIn.id
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    console.log(token);
    const url = 'https://creativents-on-boarding.onrender.com/api/loginusers'
  //   const url = `https://creativents-on-boarding.onrender.com/api/allusers/${id}`
  // 
  const getAllActiveUsers = () => {
      axios.get(url, config)
      .then(res => {
          console.log(res);
          setActiveUser(res.data.data)
      })
      .catch(err => {
          console.log(err);
      });
  };
  
  
      console.log(activeUsers);
  
      useEffect(()=>{
        getAllActiveUsers()
      },[])
  
  return (
    <>
    
    <div className='Content_Title'>
                  <h4>All Active Users</h4>
                </div>
                <div className='Admin_ContentManager'>
                  <section className='Admin_AllUsers'>
                    {
                      activeUsers.map((e)=>(
                        <div className='GetAll_User' key={e._id}>

                      <div className='UserImage_Profile'>
                        {
                          !e.profilePicture?<div className='AllUser_ProfileName'><h1>{e.firstname.charAt(0).toUpperCase()}{e.lastname.charAt(0).toUpperCase()}</h1> </div>
                          :<img src={e.profilePicture} alt="" />
                        }
                        {/* <div className='User_NameInfo'>
                        </div> */}
                      </div>

                      <div style={{justifyContent:"center", gap:"15px"}} className='UserData_Profile'>
                          <div>
                          <h5>{e.firstname} {e.lastname}</h5>
                          <h6>{e.email}</h6>
                          </div>
                      <button className='active_User' >Active</button>
                      </div>
                    </div>
                      ))
                    }
                  </section>
                </div>
    </>
  )
}

export default ActiveUsers