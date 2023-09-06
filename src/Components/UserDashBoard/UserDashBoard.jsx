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
import { FaStar } from 'react-icons/fa'
import { SpinnerDotted } from 'spinners-react'
import { MdNetworkCheck } from 'react-icons/md'
import LogoC from "../../assets/LogoC.png"


function UserDashBoard() {
    const nav = useNavigate()
    const { id } = useParams()
    const [myEvents, setMyEvents] = useState(true)
    const [network, setNetwork] = useState(false)
    const [msg, setMsg] = useState("Loading")
    const Dispatch = useDispatch()
    const userInitEventData = useSelector(state=>state.events.eventInfo)
    const [myBookMarked, setMyBookMarked] = useState(false)
    const [myPurchases, setMyPurchases] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const [userProfle, setUserProfile] = useState()
    const [userHostedEvents, setUserHostedEvents] = useState()
    const [userBookMarked, setUserBookMarked] = useState([])
    const [userPurchased, setUserPurchased] = useState([])
    const [detail, setDetail] = useState(true);
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const userName = userOnLoggedIn.name
    const userId = userOnLoggedIn.id
    const token = userOnLoggedIn.token
    const userEmail = userOnLoggedIn.email
    const userProfilePicture = userOnLoggedIn.profilePicture

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    
    const url = `https://creativents-on-boarding.onrender.com/api/getUserWithLinks/${id}`
    const getuserEventDetails = () => {
        axios.get(url, config)
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
            setNetwork(true)
        }
        else if(err.response.data.message === "jwt expired"){
            nav('/login')
        }
        else{
            
            setMsg("Error Creating Event")
          }
        
    })
    
}

    useEffect(()=>{
        getuserEventDetails()
    },[])
    
    const totalPurchase = userPurchased.reduce((a,e)=>a + e.totalPrice, 0)
    console.log(totalPurchase)
    console.log(userInitEventData);
    console.log(userHostedEvents);
    console.log(userPurchased);
    console.log(userBookMarked);


  return (
        
      <>
           {
            userProfle === undefined?
            <div style={{width:"100%",
            height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <h1 style={{
            fontSize:"26px", color:"white", textAlign:"center"
        }}>{msg}</h1>
        {network?<MdNetworkCheck className='Network_Iconic' />:<SpinnerDotted size={200} thickness={50} speed={100} color="#ffffff" />}
        {network?
        <button className='GoBackBtn' onClick={()=>{
            nav('/homepage')
        }}>Go Back</button>:null}
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
                    {
                        myEvents?
                        <>
                            <h3>Total Earnings: &#8358;{userProfle === undefined?"00":userProfle.Earnings}</h3>
                             <h3>Total Tickets Sold: {userProfle === undefined?"00":userProfle.totalTicketsSold}</h3>
                        </>:null
                    }
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
                                        <h4>{e.eventVenue}</h4>
                                        <h4>{e.eventDate}</h4>
                                    </div>
                                      <div className='Event_Reviews'>
                                     <NavLink to={'/rate'}>
                                     <p>View Ratings and Reviews</p>
                                     </NavLink>
                                       
                                      </div>
                                    <div className='Hosted_EventBtn'>
                                        <button disabled={e.isToBeDeleted} style={{background:e.isToBeDeleted?"#b47c0c":null, cursor:e.isToBeDeleted?
                                        "not-allowed":null}} className='EventUpdate_Btn' onClick={()=>nav(`/api/update/${e._id}`)}>Update</button>
                                        <button disabled={e.isToBeDeleted} style={{color:e.isToBeDeleted?"grey":null, border:e.isToBeDeleted?
                                        "1px solid rgb(150, 6, 6)":null, cursor:e.isToBeDeleted?"not-allowed":null}} className='EventDelete_Btn' onClick={()=>{
                                            nav(`/api/Delete/${e._id}`)
                                            // setConfirmation(true)
                                        }}>{e.isToBeDeleted?"Pending":"Delete"}</button>
                                    </div>
                                </div>
                                    <p className='availableTicket'>Available tickets: {e.availableTickets}</p>

                            </div>
                                    </>
                               )):
                               myPurchases?
                               userPurchased.length === 0?<h3>You don't have an purchased ticket {userName}!!</h3>:
                                    userPurchased.map((e)=>(
                                        <>
                                        <div className="main-category" key={e._id} onClick={()=>{
                                             nav(`/api/barcode/${e._id}`)
                                        }}>
                <div className="category-image" >
                <img src={e.link === null? "":e.link.eventImages} alt="" />
                    
                </div>
                <div className="category-discription">
                    <div className='locationandeventname'>
                        {/* <h4>The curve Cohort 2 Graduation Day 2023.</h4> */}
                        <h4>{e.link === null? "EventName":e.link.eventName}</h4>
                        {/* <h4>180 Freedom Way, Lekki Phase 1 Lagos State.</h4> */}
                        <h4>{e.link === null? "EventVenue":e.link.eventVenue}</h4>

                        <div class="rating">
{[1, 2, 3, 4, 5].map((star) => (
                      <FaStar style={{fontSize:"18px", marginTop:"10px"}}
                      key={star}
                      className={star <= e.overallRating? 'star_selected' : 'starh'}
                      onClick={() => handleStarClick(star)}
                      />
                  ))}
</div>
                    </div>
                <div className='dateandprice'>
                        <div className='thedate'>
                            <CiCalendarDate/>
                            <h5>{e.link === null? "EventDate":e.link.eventDate}</h5>
                            {/* <h5>26 july 2023</h5> */}
                        </div>
                        <div className='theprice'>
                            <BiMoney/>
                            <h5>#{e.link === null? "EventPrice":e.link.eventPrice}</h5>
                            {/* <h5>#2000</h5> */}
                        </div>
                    </div>
                </div>
            </div>
                                        </>

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
                    
                </div>
                <div className="category-discription">
                    <div className='locationandeventname'>
                        {/* <h4>The curve Cohort 2 Graduation Day 2023.</h4> */}
                        <h4>{e.eventName}</h4>
                        {/* <h4>180 Freedom Way, Lekki Phase 1 Lagos State.</h4> */}
                        <h4>{e.eventVenue}</h4>

                        <div class="rating">
{[1, 2, 3, 4, 5].map((star) => (
                      <FaStar style={{fontSize:"18px", marginTop:"10px"}}
                      key={star}
                      className={star <= e.overallRating? 'star_selected' : 'starh'}
                      onClick={() => handleStarClick(star)}
                      />
                  ))}
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
    <ConfirmDelete setConfirmation = {setConfirmation} cancel = {false} request={true}/>
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