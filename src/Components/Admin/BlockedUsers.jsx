import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function BlockedUsers() {
  const [blockedUsers, setBlockedUsers] = useState([])
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const token = userOnLoggedIn.token
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
        setBlockedUsers(res.data.blockedUsers); // Access blockedUsers property
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
                        {/* <div className='User_NameInfo'>
                        </div> */}
                      </div>

                      <div style={{justifyContent:"center", gap:"15px"}} className='UserData_Profile'>
                          <div>
                          <h5>{e.firstname} {e.lastname}</h5>
                          <h6>{e.email}</h6>
                          </div>
                      <button className='unblock_User' onClick={()=>{
                        axios.put(`https://creativents-on-boarding.onrender.com/api/unblockuser/${e._id}`, null ,config)
                        .then(res=>{
                          console.log(res);
                        })
                        .catch(err=>{
                          console.log(err);
                        })
                      }}>Unblock</button>
                      </div>
                    </div>
                      ))
                    }
                  </section>
                </div>
    </>
    // <section className='Blocked_Users'>
    //     <div className='Blocked_UserImg'>
    //     </div>
    //     <div className='Blocked_UsersData'>
    //         <div className='Blocked_UserInfo'>
    //         <h5>Email</h5>
    //         <h5>UserName</h5>
    //         <h5>Reasons</h5>
    //         </div>
    //         <div className='Blocked_ActionBn'>
    //             <button className='View_BlockedUser'>View</button>
    //             <button  className='Null_BlockedUser' onClick={()=>{
    //                 axios.get(url, e._id, config)
    //                 .then(res => {
    //                     console.log(res.data);
    //                     // setBlockedUsers(res.data.blockedUsers); // Access blockedUsers property
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //             }}>Unblock</button>
    //         </div>
    //     </div>

    // </section>
  )
}

export default BlockedUsers