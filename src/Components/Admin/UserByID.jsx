import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SpinnerDotted } from 'spinners-react'
function UserByID() {
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const [user, setUser] = useState(null)
    const { id } = useParams()
    console.log(id)
    const [blockUser, setBlockUser] = useState(false)
    const [deleteUser, setDeletedUser] = useState(false)


    const token = userOnLoggedIn.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const url = `https://creativents-on-boarding.onrender.com/api/getUserById/${id}`
    const getUserById = () => {
        axios.get(url ,config)
        .then(res=>{
            console.log(res)
            setUser(res.data.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getUserById()
    },[])
    console.log(user);
  return (
    <>
    
   {
    user === null?<h1>Loading...</h1>:
    <>
        <div className='Content_Title'>
    <h4>User ({user.firstname})</h4>
  </div>
  <div className='Admin_ContentManager'>
    <section className='Admin_AllUsers'>
          <div className='User_ById'>

        <div className='User_ByIdImage_Profile'>
          {
            !user.profilePicture?<div className='AllUser_ProfileName'><h1>{user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}</h1> </div>
            :<img src={user.profilePicture} alt="" />
          }
        </div>

        <div style={{justifyContent:"center", gap:"15px"}} className='User_ByIdData_Profile'>
            <div style={{display:"flex", flexDirection:"column",width:"90%", height:"50%", gap:"7px"}}>
            <h5>Name: {user.firstname} {user.lastname}</h5>
            <h5> Email: {user.email}</h5>
            <h5>isVerified: {user.isVerified?"True":"False"}</h5>
            <h5>Events: {user.myEventsLink.length}</h5>
            <h5>Tickets: {user.myEventsLink.length}</h5>
            <h5>Tickets Sold:&#8358; {user.totalTicketsSold}</h5>
            <h5>Reports</h5>
            </div>
        <button style={{background:blockUser?"rgb(175, 122, 16)":null}}  className='block_UserById' onClick={()=>{
            setBlockUser(true)
            axios.put(`https://creativents-on-boarding.onrender.com/api/blockuser/${id}`, null, config)
            .then(res=>{
                console.log(res)
                setBlockUser(false)
            })
            .catch(err=>{
                console.log(err);
                setBlockUser(false)
            })
        }}>{blockUser?<SpinnerDotted size={40} thickness={50} speed={100} color="#ffffff" />:"Block"}</button>
        <button style={{background:deleteUser?"rgba(4, 4, 44, 0.884)":null}} className='delete_UserById' onClick={()=>{
            setDeletedUser(true)
            axios.delete(`https://creativents-on-boarding.onrender.com/api/deleteuser/${id}`, config)
            .then(res=>{
                console.log(res);
                setDeletedUser(false)
            })
            .catch(err=>{
                console.log(err);
                setDeletedUser(false)
            })
        }} >{deleteUser?<SpinnerDotted size={40} thickness={50} speed={100} color="#ffffff" />:"Delete"}</button>
        </div>
      </div>

    </section>
  </div>
    </>
   }
    </>
  )
}

export default UserByID