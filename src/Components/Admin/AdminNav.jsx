import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminNav() {
    const nav = useNavigate()
    const [user, setUser]  = useState(false)
    const [events, setEvents]  = useState(false)
    const [tickets, setTickets]  = useState(false)
    const [ratings, setRatings]  = useState(false)
    const [reports, setReports]  = useState(false)
    const [allUser, setAllUser] = useState([])
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const token = userOnLoggedIn.token
    const id = userOnLoggedIn.id

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
                      setReports(false)
                    }}>User Manager</p>
                 {
                  user?
                  <ul className='Admin_UserDrop'>
                  <li >All Users</li>
                  <li>Users By Id</li>
                  <li>Blocked Users</li>  
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
                      setReports(false)
                    }}>Events Manager</p>
                  {
                    events?
                    <ul className='Admin_UserDrop'>
                    <li>All Events</li>
                    <li>Event by Id</li>
                    <li>All Pending Event Delete</li>
                    <li>All Deleted Events</li>
                    <li>All Updated Events</li>  
                    {/* <li>Reported Events</li>   */}
                  </ul>:null
                  }
                  </nav>
                  <nav>
                  <p onClick={()=>{              
                      setTickets(!tickets)
                      setEvents(false)
                      setUser(false)
                      setRatings(false)
                      setReports(false)
                    }}>Ticket Manager</p>
                  {
                    tickets?
                    <ul className='Admin_UserDrop'>
                    <li>All Puchased Tickets</li>
                    <li>All Updated Tickets</li>
                    <li>All Bookmarked Tickets</li>  
                  </ul>:null
                  }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setRatings(!ratings)      
                      setTickets(false)
                      setEvents(false)
                      setUser(false)
                      setReports(false)
                    }}>Promotion Manager</p>
                    {
                      ratings?
                      <ul className='Admin_UserDrop'>
                      <li>All Promoted Events</li>
                      <li>Promoted Event by Id</li>
                  </ul>:null
                     }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setReports(!reports)
                      setRatings(false)      
                      setTickets(false)
                      setEvents(false)
                      setUser(false)
                      // setReports(false)
                    }}>Reports Manager</p>
                    {
                      reports?
                      <ul className='Admin_UserDrop'>
                      <li>Reported Events</li>
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
                    <img src="" alt="" />
                  </div>
                  <div className='Admin_ProfileDetails'>
                    <h5>Email</h5>
                    <p>Admin_UserName</p>
                  </div>
                </div>
              </div>
            </section>
  )
}

export default AdminNav