import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function AllUser() {

  const [allUser, setAllUser] = useState([])
  const nav = useNavigate()
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const token = userOnLoggedIn.token
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

  }
  console.log(allUser);

  useEffect(()=>{
    getAllUser()
  },[])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // console.log(token);
  const searchUrl = `https://creativents-on-boarding.onrender.com/api/searchusers/search?searchTerm=${searchTerm}`

  const searchParameter = {
    searchparams: {
      firstname: searchTerm,   
      lastname: searchTerm,
      email: searchTerm,    
      username: searchTerm,  
    }
  }

  const getSearchResults = () => {
    axios.get(searchUrl, config)
  .then(res=>{
    console.log(res);
    setSearchResults(res.data.data); 
  })
  .catch(err=>{
    console.log(err);
  })
  }

  useEffect(()=>{
    if (searchTerm !== '') {
      getSearchResults()
    }
  },[searchTerm])
console.log(searchResults)


  return (
                <>
      <input type="text" className='Admin_SearchBar' value={searchTerm} placeholder='Search Users' onChange={(e)=>setSearchTerm(e.target.value)}/>
                <div className='Content_Title'>
                 {!searchTerm? <h4>All Users</h4>:null}
                </div>
                <div className='Admin_ContentManager'>
                  <section className='Admin_AllUsers'>
                    {
                      !searchTerm?
                      allUser.map((e)=>(
                        <div className='GetAll_User' style={{cursor:"pointer"}} key={e._id} onClick={()=>{
                          nav(`/adminDashboard/userbyID/${e._id}`)
                        }}>

                      <div className='UserImage_Profile'>
                        {
                          !e.profilePicture?<div className='AllUser_ProfileName'><h1>{e.firstname.charAt(0).toUpperCase()}{e.lastname.charAt(0).toUpperCase()}</h1> </div>
                          :<img src={e.profilePicture} alt="" />
                        }
                        <div className='User_NameInfo'>
                          <h5>{e.firstname} {e.lastname}</h5>
                          <h6></h6>
                        </div>
                      </div>

                      <div className='UserData_Profile'>
                        <article>
                          <h5><span >Created at</span>: {e.createdAt} </h5>
                        </article>
                        <article>
                          <h5>Email: {e.email}</h5>
                        </article>
                        <article>
                          <h5>Verified Status: {e.isVerified?"true":"false"}</h5>
                        </article>
                        <article>
                          <h5>Ticket Purchased:{e.myticketsLink.length} </h5>
                        </article>
                        <article>
                          <h5>Events Hosted: {e.myEventsLink.length}</h5>
                        </article>
                          {/* <article>
                            <h5>Ticket Sold: </h5>
                          </article> */}
                        <article>
                          <h5>Events Deleted: </h5>
                        </article>
                      </div>
                    </div>
                      )):
                      searchResults.length === 0?
                      (<h1>No Search Result</h1>):
                      searchResults.map((e)=>(
                        <div className='GetAll_User' style={{cursor:"pointer"}} key={e._id} onClick={()=>{
                          nav(`/adminDashboard/userbyID/${e._id}`)
                        }}>

                      <div className='UserImage_Profile'>
                        {
                          !e.profilePicture?<div className='AllUser_ProfileName'><h1>{e.firstname.charAt(0).toUpperCase()}{e.lastname.charAt(0).toUpperCase()}</h1> </div>
                          :<img src={e.profilePicture} alt="" />
                        }
                        <div className='User_NameInfo'>
                          <h5>{e.firstname} {e.lastname}</h5>
                          <h6></h6>
                        </div>
                      </div>

                      <div className='UserData_Profile'>
                        <article>
                          <h5><span >Created at</span>: {e.createdAt} </h5>
                        </article>
                        <article>
                          <h5>Email: {e.email}</h5>
                        </article>
                        <article>
                          <h5>Verified Status: {e.isVerified?"true":"false"}</h5>
                        </article>
                        <article>
                          <h5>Ticket Purchased:{e.myticketsLink.length} </h5>
                        </article>
                        <article>
                          <h5>Events Hosted: {e.myEventsLink.length}</h5>
                        </article>
                          {/* <article>
                            <h5>Ticket Sold: </h5>
                          </article> */}
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