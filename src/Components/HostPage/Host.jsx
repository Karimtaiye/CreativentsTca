import React, { useEffect, useState } from 'react'
import './Host.css'
import './HostMobile.css'
import Footer from '../LandingPage/Footer'
import LogoD from '../../assets/LogoD.png'
import { MdLocationPin } from 'react-icons/md'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import {MdNetworkCheck} from 'react-icons/md'
import {SpinnerDotted} from 'spinners-react'
import { checkFollow } from '../Redux/State'

function Host() {
    const [hostProfile, setHostProfile] = useState()
    const [eventspast, setEventsPast] = useState([])
    const Dispatch = useDispatch()
    const { id } = useParams()
    const [msg, setMsg] = useState("")
    const [network, setNetwork] = useState(false)
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const followingStatus = useSelector(state=>state.events.followStatus)
    const purchasedID = useSelector(state=>state.events.eventID)
    const nav = useNavigate()
    const [follow, setFollow] = useState(false)
    const [unFollow, setunFollow] = useState(false)
    const [all, setall] = useState(true)
    const [past, setpast] = useState(false)
    const [upcoming, setupcoming] = useState(false)

    console.log(followingStatus);
    console.log(purchasedID);

    const token = userOnLoggedIn.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }


    const url = `https://creativents-on-boarding.onrender.com/api/getUserProfile/${id}`
    const followUrl = `https://creativents-on-boarding.onrender.com/api/users/follow/${id}`
    const unFollowUrl = `https://creativents-on-boarding.onrender.com/api/users/unfollow/${id}`
    const getHostProfile = () => {
        axios.get(url)
        .then(res=>{
            console.log(res)
            setHostProfile(res.data.data)
            setEventsPast(res.data.data.myEventsLink)
        })
        .catch(err=>{
            console.log(err);
            if(err.message === "Network Error"){
                setMsg("Unable to connect to the Internet")
                setNetwork(true)
            }
            else if(err.response.data.message === "jwt expired"){
                nav('/login')
            }
            else {
                setMsg(err.response.data.message)
            }
        })
    }
    const currentDate = new Date()

       const pastEvents = eventspast.filter((e)=>{
            const eventDate = new Date(e.eventDate);
            return eventDate < currentDate;
        })

       const futureEvents = eventspast.filter((e)=>{
            const eventDate = new Date(e.eventDate);
            return eventDate > currentDate;
        })
    //     return pastEvents
    // }

    // if (!hostProfile) {
    //     console.log("hostProfile is undefined");
    // } else if (!hostProfile.myEventsLink) {
    //     console.log("myEventsLink is undefined in hostProfile");
    // } else {
    //     const pastEvents = hostProfile.myEventsLink.filter((e) => {
    //         const eventDate = new Date(e.eventDate);
    //         return eventDate < currentDate;
    //     });
    
    //     console.log("pastEvents:", pastEvents);
    
    //     return pastEvents;
    // }
    
    console.log(eventspast);
    console.log(pastEvents);
    console.log(futureEvents);
    useEffect(()=>{
        getHostProfile()
    },[])

  return (
    <>
       {
        !hostProfile?<div style={{width:"100%",
        height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
       <h1 style={{
        fontSize:"26px", color:"white", textAlign:"center"
    }}>{msg}</h1>
    {
        network?<MdNetworkCheck className='Network_Icon' />:<SpinnerDotted size={250} thickness={50} speed={100} color="#ffffff" />
    }
    </div>:
        <>
         <div className='Host_Page'>
        <div className='Host_Wrapper'>
            <section className='Host_Header'>
                <img onClick={()=>nav(token?'/homepage':'/landingpage')} src={LogoD} alt="" />
                <div className='HostEvent_Info'>
                    <ul>
                        <li className={past?"active_Host":null} onClick={()=>{
                            setall(false)
                            setpast(true)
                            setupcoming(false)
                        }}>Past Events</li>
                        <li className={all?"active_Host":null} onClick={()=>{
                            setall(true)
                            setpast(false)
                            setupcoming(false)
                        }}>All Events</li>
                        <li className={upcoming?"active_Host":null} onClick={()=>{
                            setall(false)
                            setpast(false)
                            setupcoming(true)
                        }}>Upcoming Events</li>
                    </ul>
                </div>
                <h5 className='ProfileBack_Btn' onClick={()=>nav(`/api/events/${purchasedID}`)}>Go back</h5>
            </section>

            <section className='Host_Body'>
                <div className='Host_ProfilePart'>
                    <div className='Host_image'>
                    </div>
                        <div className='ImageHost'>
                            <img src={hostProfile.profilePicture} alt="" />
                        </div>
                        <div className='Host_Info'>
                            <div className='Follow_Details'>
                            <h5>{hostProfile.firstname} {hostProfile.lastname}</h5>
                            <h5 style={{fontWeight:"normal"}}>{hostProfile.email}</h5>
                            <h5>{hostProfile.followers.length} {hostProfile.followers.length > 1? "Followers": "Follower"}</h5>
                            <h5>{hostProfile.following.length} Following</h5>
                            </div>
                                <div style={{width:"100%",display:"flex" , height:"30%", gap:"10px"}}>
                                <button className='Follow_Btn' disabled={follow} style={{color:follow?"grey":null, border:follow?"none":null}}
                            onClick={()=>{
                                setMsg("")
                                axios.put(followUrl, null,config)
                                .then(res=>{
                                    console.log(res)
                                    setFollow(true)
                                    setunFollow(false)
                                })
                                .catch(err=>{
                                    console.log(err)
                                    if(err.message === "Network Error"){
                                        setMsg("Unable to connect to the Internet")
                                    }
                                    else if(err.response.data.message === "jwt expired"){
                                        nav('/login')
                                     }
                                    else if(err.response.data.message === "You are already following this User"){
                                        setFollow(true)
                                        setMsg("You are already following this Person")
                                     }
                                    else{
                                    setMsg(err.response.data.message)
                                     }
                                })
                            }}>Follow</button>
                            <button className='unFollow_Btn' disabled={unFollow} style={{color:unFollow?"lightgrey":null, border:unFollow?"none":null}}
                            onClick={()=>{
                                setMsg("")
                                axios.put(unFollowUrl, null,config)
                                .then(res=>{
                                    console.log(res)
                                    setunFollow(false)
                                    setFollow(true)

                                })
                                .catch(err=>{
                                    console.log(err)
                                    if(err.message === "Network Error"){
                                        setMsg("Unable to connect to the Internet")
                                    }
                                    else if(err.response.data.message === "jwt expired"){
                                        nav('/login')
                                        }
                                        else{
                                    setMsg(err.response.data.message)
                                        }
                                })
                            }}>Unfollow</button>
                                </div>
                            <h6 style={{color:"red"}}>{msg}</h6>
                        </div>
                </div>
                <div className='HostAll_Events'>
                    <h1 style={{width:"100%", marginBottom:"15px"}}>{all?`All Events (${hostProfile.myEventsLink.length})`:past?`Past Events (${pastEvents.length})`:upcoming?`Upcoming Events (${futureEvents.length})`:null}</h1>
                    {
                        all?hostProfile.myEventsLink.map((e)=>(
            <div className='Upcoming_EventsDetails' key={e._id} style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
                        <div className='upper-Header'>{e.eventName}</div>
                    
                <div className='innupper-header'>
                        <div className='Upcoming_EventImage'>
                            <img src={e.eventImages} alt="" />
                        </div>
                    <div className='Upcoming_EventDesc'>
                        
                        <div className='Upcoming_LocationDiv'>
                            <MdLocationPin className='Upcoming_Location'/>
                            <span className='span'>{e.eventVenue}</span>
                         </div>
                            <span className='span3'>{e.eventDate}</span>
                         <div className='buttoncontroler'>
                            <h6>{e.eventLocation}</h6>
                            <h6>{e.eventTime}</h6>
                            <h6>&#8358;{e.eventPrice}</h6>
                            <button className='btn1'>Book now</button>
                        </div>
                    </div>
                </div>
            </div>
                        )):
                        past?pastEvents.map((e)=>(
                            <div className='Upcoming_EventsDetails' key={e._id} style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
                                        <div className='upper-Header'>{e.eventName}</div>
                                    
                                <div className='innupper-header'>
                                        <div className='Upcoming_EventImage'>
                                            <img src={e.eventImages} alt="" />
                                        </div>
                                    <div className='Upcoming_EventDesc'>
                                        
                                        <div className='Upcoming_LocationDiv'>
                                            <MdLocationPin className='Upcoming_Location'/>
                                            <span className='span'>{e.eventVenue}</span>
                                         </div>
                                            <span className='span3'>{e.eventDate}</span>
                                         <div className='buttoncontroler'>
                                            <h6>{e.eventLocation}</h6>
                                            <h6>{e.eventTime}</h6>
                                            <h6>&#8358;{e.eventPrice}</h6>
                                            <button className='btn1'>Book now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )):
                            upcoming?futureEvents.map((e)=>(
                                <div className='Upcoming_EventsDetails' key={e._id} style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
                                            <div className='upper-Header'>{e.eventName}</div>
                                        
                                    <div className='innupper-header'>
                                            <div className='Upcoming_EventImage'>
                                                <img src={e.eventImages} alt="" />
                                            </div>
                                        <div className='Upcoming_EventDesc'>
                                            
                                            <div className='Upcoming_LocationDiv'>
                                                <MdLocationPin className='Upcoming_Location'/>
                                                <span className='span'>{e.eventVenue}</span>
                                             </div>
                                                <span className='span3'>{e.eventDate}</span>
                                             <div className='buttoncontroler'>
                                                <h6>{e.eventLocation}</h6>
                                                <h6>{e.eventTime}</h6>
                                                <h6>&#8358;{e.eventPrice}</h6>
                                                <button className='btn1'>Book now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )):null
                    }

                </div>
            </section>
        </div>

    </div>
        <Footer />
        </>
       }
    </>
  )
}

export default Host