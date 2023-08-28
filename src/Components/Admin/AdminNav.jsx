import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function AdminNav() {
    const nav = useNavigate()
    const { adminID } = useParams()
    const [user, setUser]  = useState(false)
    const [events, setEvents]  = useState(false)
    const [tickets, setTickets]  = useState(false)
    const [analysis, setAnalysis]  = useState(false)
    const [ratings, setRatings]  = useState(false)
    const [allUser, setAllUser] = useState([])
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const email = userOnLoggedIn.email
    const name = userOnLoggedIn.name
    const profilePicture = userOnLoggedIn.profilePicture

  return (
    <section className='Admin_NavSection'>
              <div className='Admin_NavActions'>
                <div className='Admin_AppDesc'>
                  <h3>Creativents</h3>
                </div>
                {/* <div className='Admin_Search'>
                <input type="text" placeholder='Search'/>
                </div> */}
                <div className='Admin_NavList'>
                  <nav>
                  <p onClick={()=>{
                      setUser(!user)
                      setEvents(false)
                      setTickets(false)
                      setRatings(false)
                      setAnalysis(false)
                    }}>User Manager</p>
                 {
                  user?
                  <ul className='Admin_UserDrop'>
                  <li onClick={()=>nav(`/adminDashboard/${adminID}id/allUser`)} >All Users</li>
                  <li onClick={()=>nav(`/adminDashboard/${adminID}id/userbyID`)}>Users By Id</li>
                  <li onClick={()=>nav(`/adminDashboard/${adminID}id/allBlocked`)}>Blocked Users</li>  
                  <li onClick={()=>nav(`/adminDashboard/${adminID}id/allActive`)}>Active Users</li>  
                  <li>Search Users</li>  
                  <li>Deleted Users</li>  
                </ul>:null
                 }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setEvents(!events)
                      setUser(false)
                      setTickets(false)
                      setRatings(false)
                      setAnalysis(false)
                    }}>Events Manager</p>
                  {
                    events?
                    <ul className='Admin_UserDrop'>
                    <li onClick={()=>nav(`/adminDashboard/${adminID}id/allEvents`)}>All Events</li>
                    <li onClick={()=>nav(`/adminDashboard/${adminID}id/eventbyID`)}>Event by Id</li>
                    <li onClick={()=>nav(`/adminDashboard/${adminID}id/allPending`)}>All Pending Deletion</li>
                    <li onClick={()=>nav(`/adminDashboard/${adminID}id/allReports`)}>All Reported Events</li>
                    <li onClick={()=>nav(`/adminDashboard/${adminID}id/reportbyID`)}>Report By Id</li>  
                    <li>All Updated Events</li>  
                    <li>All Deleted Events</li>  
                    {/* <li>Reported Events</li>   */}
                  </ul>:null
                  }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setRatings(!ratings)      
                      setTickets(false)
                      setEvents(false)
                      setUser(false)
                      setAnalysis(false)
                    }}>Promotion Manager</p>
                    {
                      ratings?
                      <ul className='Admin_UserDrop'>
                      <li onClick={()=>nav(`/adminDashboard/${adminID}id/allPromoted`)}>All Promoted Events</li>
                      <li>Promoted Event by Id</li>
                  </ul>:null
                     }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setAnalysis(!analysis)
                      setRatings(false)      
                      setTickets(false)
                      setEvents(false)
                      setUser(false)
                      // setanalysis(false)
                    }}>Analysis Manager</p>
                    {
                      analysis?
                      <ul className='Admin_UserDrop'>
                      <li   >Ananysis</li>
                      <li>Reported Users</li>
                  </ul>:null
                     }
                  </nav>
                  <nav>
                  <p>Settings</p>
                    {/* <ul className='Admin_UserDrop'>
                    <li>All Users</li>
                    <li>Users Ticket Purchases</li>
                    <li>Users Bookmarked Tickets</li>  
                  </ul>:null */}
                  </nav>
                  {/* <nav>
                  <p>More</p> */}
                    {/* <ul className='Admin_UserDrop'>
                    <li>All Users</li>
                    <li>Users Ticket Purchases</li>
                    <li>Users Bookmarked Tickets</li>  
                  </ul>:null */}
                  {/* </nav> */}
                  

                </div>

                <div className='Admin_Profile'>
                  <div className='Admin_ProfilePic'>
                    <img src={profilePicture} alt="" />
                  </div>
                  <div className='Admin_ProfileDetails'>
                    <h5>{email}</h5>
                    <p>Admin_{name}</p>
                  </div>
                </div>
              </div>
            </section>
  )
}

export default AdminNav