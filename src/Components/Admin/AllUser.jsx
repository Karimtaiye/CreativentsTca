import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
function AllUser() {

  const [allUser, setAllUser] = useState([])
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const token = userOnLoggedIn.token
  const id = userOnLoggedIn.id
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  console.log(token);
  const url = 'https://creativents-on-boarding.onrender.com/api/allusers'
  const getAllUser = () => {
    axios.get(url, config)
    
    .then(res=>{
      console.log(res);
      setAllUser(res.data.data)
    })
    .catch(err=>{
      console.log(err);
    })
    // console.log(config);
    
  }
  console.log(allUser);

  useEffect(()=>{
    getAllUser()
  },[])


  return (
                <>
                <div className='Content_Title'>
                  <h4>All Users</h4>
                </div>
                <div className='Admin_ContentManager'>
                  <section className='Admin_AllUsers'>
                    {
                      allUser.map((e)=>(
                        <div className='GetAll_User' key={e._id}>

                      <div className='UserImage_Profile'>
                        {
                          !e.profilePicture?<div className='AllUser_ProfileName'><h1>{e.firstname.charAt(0).toUpperCase()}{e.lastname.charAt(0).toUpperCase()}</h1> </div>
                          :<img src={e.profilePicture} alt="" />
                        }
                        <div className='User_NameInfo'>
                          <h5>{e.firstname} {e.lastname}</h5>
                          <h6>{e.email}</h6>
                        </div>
                      </div>

                      <div className='UserData_Profile'>
                        <article>
                          <h5>Created at: {e.createdAt} </h5>
                        </article>
                        <article>
                          <h5>Active status: </h5>
                        </article>
                        <article>
                          <h5>Verified Satus: </h5>
                        </article>
                        <article>
                          <h5>Ticket Purchased: </h5>
                        </article>
                        <article>
                          <h5>Events Hosted: </h5>
                        </article>
                        <article>
                          <h5>Ticket Sold: </h5>
                        </article>
                        <article>
                          <h5>Events Deleted: </h5>
                        </article>
                      </div>
                    </div>
                      ))
                    }
                  </section>
                </div>
                </>
  )
}

export default AllUser