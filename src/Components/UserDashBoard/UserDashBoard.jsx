import React from 'react'
import "./UserDashBoard.css"
import "./UserDashBoardMobile.css"
import {AiOutlineHeart} from "react-icons/ai"
import {BsBookmark, BsFillCheckSquareFill} from "react-icons/bs"
import {NavLink} from "react-router-dom"
import {AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {CiMenuKebab} from 'react-icons/ci';
import {CiCalendarDate} from 'react-icons/ci'
import {BiMoney} from 'react-icons/bi'
import {GiHamburgerMenu, } from "react-icons/gi"
import {MdDateRange,MdOutlineEventRepeat, MdEventAvailable} from "react-icons/md"
import { useDispatch, useSelector, useStore } from 'react-redux'
import { eventData } from '../Redux/State'
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete'
import Tickets from './Tickets'
import { SpinnerDotted } from 'spinners-react'
import LogoC from "../../assets/LogoC.png"


function UserDashBoard() {
    const nav = useNavigate()
    const { id } = useParams()
    const [myEvents, setMyEvents] = useState(true)
    const [msg, setMsg] = useState("Fetching User Data........")
    const Dispatch = useDispatch()
    const userInitEventData = useSelector(state=>state.events.eventInfo)
    const [myBookMarked, setMyBookMarked] = useState(false)
    const [myPurchases, setMyPurchases] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const [userProfle, setUserProfile] = useState()
    const [userHostedEvents, setUserHostedEvents] = useState()
    const [userBookMarked, setUserBookMarked] = useState()
    const [userPurchased, setUserPurchased] = useState()
    const [detail, setDetail] = useState(true);
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const userName = userOnLoggedIn.name
    const userId = userOnLoggedIn.id
    const userToken = userOnLoggedIn.token
    const userEmail = userOnLoggedIn.email
    const userProfilePicture = userOnLoggedIn.profilePicture
    
    const url = `https://creativents-on-boarding.onrender.com/api/getUserWithLinks/${id}`
    const getuserEventDetails = () => {
        axios.get(url)
        .then(res=>{
        console.log(res)
        console.log(res.data.data)
        Dispatch(eventData(res.data.data.myEventsLink))
        setUserProfile(res.data.data)
        setUserHostedEvents(res.data.data.myEventsLink)
        setUserPurchased(res.data.data.myticketsLink)
        setUserBookMarked(res.data.data.bookmarks)
        
    })
    .catch(err=>{
        console.log(err)
        if(err.message === "Network Error"){
            setMsg("Please check your Internet Connection")
        }
        else{
            
            setMsg("Error Creating Event")
          }
        
    })
    
}

    useEffect(()=>{
        getuserEventDetails()
    },[])
    
    console.log(userInitEventData);
    console.log(userHostedEvents);
    console.log(userPurchased);
    console.log(userBookMarked);

    // const deleteEventById = () => {
    //     nav(`/api/Events/:eventID`)
    //     setConfirmation(true)
    // }

  return (
        
      <>
           {
            userProfle === undefined?
            <div style={{width:"100%",
            height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <h1 style={{
            fontSize:"26px", color:"white", textAlign:"center"
        }}>{msg}</h1>
        <SpinnerDotted size={200} thickness={50} speed={100} color="#ffffff" />
        </div>:
            <main className="My_EventHolder">
            <nav className="NavDetailHolder">
                <div className="DetailLogoHolder">
                    <img src={LogoC} onClick={()=>nav('/homepage')} alt="Logo" className="DetailLogo" />
                </div>
                <div className="DetailNavIcon">
                    <div className="Saved" onClick={()=>{
                        setMyEvents(false)
                        setMyBookMarked(false)
                        setMyPurchases(true)
                    }}>
                    <h3 style={{color:myPurchases?"#fca702":null, fontSize:myPurchases?"12px":null, transition:"all 400ms"}} className="DetailSaved">Purchased</h3>
                    <AiOutlineHeart className="ReactHeart"/>
                    </div>
                    <div className="Book" onClick={()=>{
                        setMyEvents(false)
                        setMyBookMarked(true)
                        setMyPurchases(false)
                    }}>
                    <h3 style={{color:myBookMarked?"#fca702":null, fontSize:myBookMarked?"12px":null, transition:"all 400ms"}} className="DetailBook">BookMark</h3>
                   <BsBookmark className="ReactBook"/>
                    </div>
                  <div className="Cart" onClick={()=>{
                    setMyEvents(true)
                    setMyBookMarked(false)
                    setMyPurchases(false)
                  }}>
                  <h3 style={{color:myEvents?"#fca702":null, fontSize:myEvents?"12px":null, transition:"all 400ms"}} className="DetailCart">My Events</h3>
                    
                  {
                     myEvents?<MdEventAvailable style={{color:myEvents?"white":null, transition:"all 400ms"}} className="ReactCart"/>:
                     <MdOutlineEventRepeat className="ReactCart"/>
                     
                  }
                  </div>
                </div>
                <div className="Event_Profile">
                    <div className="DetailCircle">
                        <img src={userProfilePicture} alt="" />
                    </div>
                    <h3 className="DetailName">{userName}</h3>
                    <GiHamburgerMenu className="DetailMenu" 
                    // onClick={DetailPop}
                    />
                </div>
               </nav>

            <section className="Event_UserInfo">
                <div className="Events_Texts">
                    <h1 className="Events_Welcome">Hi there {userName}!!</h1>
                    <h2 className="Events_Purchased">You have {
                        myEvents? `Hosted (${userHostedEvents.length}) Events`:
                        myBookMarked?`BookMarked (${userBookMarked.length}) Events`:
                        myPurchases?`Purchased (${userPurchased.length}) Events`:null
                    } in total</h2>
                </div>
            </section>
            <div className="Hosted_Events">
            <div className="Hosted_EventsHolder">

                <div className="Hosted_EventsHolderText">
                    <h1 className="Hosted_EventsHolder">{
                        myEvents?"My Events":
                        myPurchases?"My Purchases":
                        myBookMarked?"My BookMarked":null
                   }</h1>
                    <div className='Event_Lines'></div>
                </div>
                <div  className='Host_EventOverView'>
                    
                        {
                            myEvents?
                            
                                userHostedEvents.map((e)=>(
                                    <>
                                        <div className='My_EventPackage' key={e._id}>
                                <div className='Hosted_EventImg'>
                                    <img src={e.eventImages} alt="" />
                                </div>
                                <div className='Hosted_EventDesc'>
                                    <div className='Hosted_EventWhere'>
                                        <h3>{e.eventName}</h3>
                                        <h4>{e.eventDescription}</h4>
                                        <h4>{e.eventDate}</h4>
                                    </div>
                                      <div className='Event_Reviews'>
                                     <NavLink to={'/rate'}>
                                     <p>View Ratings and Reviews</p>
                                     </NavLink>
                                       
                                      </div>
                                    <div className='Hosted_EventBtn'>
                                        <button className='EventUpdate_Btn' onClick={()=>nav(`/api/update/${e._id}`)}>Update</button>
                                        <button className='EventDelete_Btn' onClick={()=>{
                                            nav(`/api/Delete/${e._id}`)
                                            // setConfirmation(true)
                                        }}>Delete</button>
                                    </div>
                                </div>
                                    <p className='availableTicket'>Available tickets: {e.availableTickets}</p>
                                    {/* <p style={{position:"absolute", right:"0", top:"5%"}} className='availableTicket'>Purchased tickets: {e.purchasedTickets}</p> */}
                            </div>
                                    </>
                               )):
                               myPurchases?
                               userPurchased.length === 0?<h3>You don't have an purchased ticket {userName}!!</h3>:
                                    userPurchased.map((e)=>(
                                        <>
                                        <div className="main-category" key={e._id} onClick={()=>{
                    nav(`/api/events/${e._id}`)
                }}>
                <div className="category-image" >
                <img src={e.link.eventImages} alt="" />
                    <div className='love'>
                    {/* onClick={handleLiked} :liked ? */}
                    <BsFillSuitHeartFill style={{color:
                     "lightgrey"}}/>
                    </div>
                    <div className='love2'>
                    <CiMenuKebab/>
                    </div>
                    
                </div>
                <div className="category-discription">
                    <div className='locationandeventname'>
                        {/* <h4>The curve Cohort 2 Graduation Day 2023.</h4> */}
                        <h4>{e.link.eventName}</h4>
                        {/* <h4>180 Freedom Way, Lekki Phase 1 Lagos State.</h4> */}
                        <h4>{e.link.eventVenue}</h4>

<div class="rating">
<input value="5" name="rating" id="star5" type="radio"/>
<label for="star5"></label>
<input value="4" name="rating" id="star4" type="radio"/>
<label for="star4"></label>
<input value="3" name="rating" id="star3" type="radio"/>
<label for="star3"></label>
<input value="2" name="rating" id="star2" type="radio"/>
<label for="star2"></label>
<input value="1" name="rating" id="star1" type="radio"/>
<label for="star1"></label>
</div>
                    </div>
                <div className='dateandprice'>
                        <div className='thedate'>
                            <CiCalendarDate/>
                            <h5>{e.link.eventDate}</h5>
                            {/* <h5>26 july 2023</h5> */}
                        </div>
                        <div className='theprice'>
                            <BiMoney/>
                            <h5>#{e.link.eventPrice}</h5>
                            {/* <h5>#2000</h5> */}
                        </div>
                    </div>
                </div>
            </div>
                                        </>
                                    //    <Tickets key={e._id} src={e.link.eventImages}  eventVenue={e.link.eventVenue}  eventName={e.link.eventName} eventDate={e.link.eventDate} eventPrice={e.link.eventPrice}/>
                                    ))
                               :
                               myBookMarked?
                               userBookMarked.length === 0?<h3>You don't have an Bookmarked ticket {userName}!!</h3>:
                                     userBookMarked.map((e)=>(
                                       <>
                                        <div className="main-category" key={e._id} onClick={()=>{
                    nav(`/api/events/${e._id}`)
                }}>
                <div className="category-image" >
                <img src={e.eventImages} alt="" />
                    <div className='love'>
                    {/* onClick={handleLiked} :liked ? */}
                    <BsFillSuitHeartFill style={{color:
                     "lightgrey"}}/>
                    </div>
                    <div className='love2'>
                    <CiMenuKebab/>
                    
                    </div>
                    
                </div>
                <div className="category-discription">
                    <div className='locationandeventname'>
                        {/* <h4>The curve Cohort 2 Graduation Day 2023.</h4> */}
                        <h4>{e.eventName}</h4>
                        {/* <h4>180 Freedom Way, Lekki Phase 1 Lagos State.</h4> */}
                        <h4>{e.eventVenue}</h4>

<div class="rating">
<input value="5" name="rating" id="star5" type="radio"/>
<label for="star5"></label>
<input value="4" name="rating" id="star4" type="radio"/>
<label for="star4"></label>
<input value="3" name="rating" id="star3" type="radio"/>
<label for="star3"></label>
<input value="2" name="rating" id="star2" type="radio"/>
<label for="star2"></label>
<input value="1" name="rating" id="star1" type="radio"/>
<label for="star1"></label>
</div>
                    </div>
                <div className='dateandprice'>
                        <div className='thedate'>
                            <CiCalendarDate/>
                            <h5>{e.eventDate}</h5>
                            {/* <h5>26 july 2023</h5> */}
                        </div>
                        <div className='theprice'>
                            <BiMoney/>
                            <h5>#{e.eventPrice}</h5>
                            {/* <h5>#2000</h5> */}
                        </div>
                    </div>
                </div>
            </div>
                                        </>
                               ))
                               :null               
                        }

                </div>
                </div>
            </div>

  {
    confirmation? 
    <ConfirmDelete setConfirmation = {setConfirmation} cancel = {false}/>
    :
     null
  }
        </main>
           }
        <div className="directiontodifferentpage">
            <div className="Homedirection">
                <AiFillHome onClick={()=>nav('/homepage')} className="directionmain"/>
                <h5>Home</h5>
            </div>

            <div className="Homedirection">
                <MdCreateNewFolder onClick={()=>nav('/upload')} className="directionmain"/>
                <h5>Create</h5>
            </div>
            <div className="Homedirection">
                <BsFillCheckSquareFill onClick={()=>nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
                <h5>My events</h5>
            </div>
          </div>
         
    </>
  )
}

export default UserDashBoard