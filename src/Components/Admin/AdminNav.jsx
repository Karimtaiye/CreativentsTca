import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function AdminNav() {
    const nav = useNavigate()
    const [user, setUser]  = useState(false)
    const [events, setEvents]  = useState(false)
    const [analysis, setAnalysis]  = useState(false)
    const [promotion, setPromotion]  = useState(false)
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const email = userOnLoggedIn.email
    const name = userOnLoggedIn.name
    // const token = userOnLoggedIn.token
    const profilePicture = userOnLoggedIn.profilePicture
    

  return (
    <section className='Admin_NavSection'>
              <div className='Admin_NavActions'>
                <div className='Admin_AppDesc'>
                  <h3 style={{cursor:"pointer"}} onClick={()=>nav('/homepage')}>Creativents</h3>
                </div>

                <div className='Admin_NavList'>
                  <nav>
                  <p className={user?"Active_Bar":null} onClick={()=>{
                      setUser(!user)
                      setEvents(false)
                      setPromotion(false)
                      setAnalysis(false)
                    }}>User Manager</p>
                 {
                  user?
                  <ul className='Admin_UserDrop'>
                  <li onClick={()=>nav('/adminDashboard/allUser')} >All Users</li>
                  <li onClick={()=>nav('/adminDashboard/allBlocked')}>Blocked Users</li>  
                  <li onClick={()=>nav('/adminDashboard/allActive')}>Active Users</li>  
                </ul>:null
                 }
                  </nav>
                  <nav>
                  <p className={events?"Active_Bar":null} onClick={()=>{
                      setEvents(!events)
                      setUser(false)
                      setPromotion(false)
                      setAnalysis(false)
                    }}>Events Manager</p>
                  {
                    events?
                    <ul className='Admin_UserDrop'>
                    <li onClick={()=>nav('/adminDashboard/allEvents')}>All Events</li>
                    <li onClick={()=>nav('/adminDashboard/eventbyID/:id')}>Event by Id</li>
                    <li onClick={()=>nav('/adminDashboard/allPending')}>All Pending Deletion</li>
                    <li onClick={()=>nav('/adminDashboard/allReports')}>All Reported Events</li>
                    <li onClick={()=>nav('/adminDashboard/reportbyID/:id')}>Report By Id</li>  
                    <li>All Deleted Events</li>  
                    {/* <li>Reported Events</li>   */}
                  </ul>:null
                  }
                  </nav>
                  <nav>
                  <p className={promotion?"Active_Bar":null} onClick={()=>{
                      setPromotion(!promotion)      
                      setEvents(false)
                      setUser(false)
                      setAnalysis(false)
                    }}>Promotion Manager</p>
                    {
                      promotion?
                      <ul className='Admin_UserDrop'>
                      <li onClick={()=>nav('/adminDashboard/allPromoted')}>All Promoted Events</li>
                      <li>Promoted Event by Id</li>
                  </ul>:null
                     }
                  </nav>
                  <nav>
                  <p className={analysis?"Active_Bar":null} onClick={()=>{
                      setAnalysis(!analysis)
                      setPromotion(false)      
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