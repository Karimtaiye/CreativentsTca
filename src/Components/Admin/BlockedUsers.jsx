import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SpinnerDotted } from 'spinners-react'

function BlockedUsers() {
  const [blockedUsers, setBlockedUsers] = useState([])
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const token = userOnLoggedIn.token
  const [blockUser, setBlockUser] = useState(false)

//   const id = userOnLoggedIn.id
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  console.log(token);
  const url = 'https://creativents-on-boarding.onrender.com/api/get-blocked'
//   const url = `https://creativents-on-boarding.onrender.com/api/allusers/${id}`
// 
const getAllBlockedUsers = () => {
    axios.get(url, config)
    .then(res => {
        console.log(res);
        setBlockedUsers(res.data.blockedUsers)

    })
    .catch(err => {
        console.log(err);

    });
};


    console.log(blockedUsers);

    useEffect(()=>{
        getAllBlockedUsers()
    },[])


  return (
    <>
      <div className='Content_Title'>
                  <h4>All Blocked Users</h4>
                </div>
                <div className='Admin_ContentManager'>
                  <section className='Admin_AllUsers'>
                    {
                      blockedUsers.map((e)=>(
                        <div className='GetAll_User' key={e._id}>

                      <div className='UserImage_Profile'>
                        {
                          !e.profilePicture?<div className='AllUser_ProfileName'><h1>{e.firstname.charAt(0).toUpperCase()}{e.lastname.charAt(0).toUpperCase()}</h1> </div>
                          :<img src={e.profilePicture} alt="" />
                        }
                      </div>

                      <div style={{justifyContent:"center", gap:"15px"}} className='UserData_Profile'>
                          <div>
                          <h5>{e.firstname} {e.lastname}</h5>
                          <h6>{e.email}</h6>
                          </div>
                      <button style={{background:blockUser?"rgb(175, 122, 16)":null}} className='unblock_User' onClick={()=>{
                        setBlockUser(true)
                        axios.put(`https://creativents-on-boarding.onrender.com/api/unblockuser/${e._id}`, null ,config)
                        .then(res=>{
                          console.log(res);
                          setBlockUser(false)

                        })
                        .catch(err=>{
                          console.log(err);
                          setBlockUser(false)

                        })
                      }}>{blockUser?<SpinnerDotted size={40} thickness={50} speed={100} color="#ffffff" />:"Unblock"}</button>
                      </div>
                    </div>
                      ))
                    }
                  </section>
                </div>
    </>
  )
}

export default BlockedUsers