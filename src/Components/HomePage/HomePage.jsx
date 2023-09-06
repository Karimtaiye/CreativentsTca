import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './HomePage.css'
import './HomepageMobileResponsive.css'
import { BiSearch } from 'react-icons/bi'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import LogoC from "../../assets/LogoC.png"
import Cat1 from "../../assets/Cat1.png"
import Cat2 from "../../assets/Cat2.png"
import Cat3 from "../../assets/Cat3.png"
import Cat4 from "../../assets/Cat4.png"
import { SpinnerCircularSplit } from 'spinners-react'
import promote from "../../assets/promote.jpg"
import promote2 from "../../assets/promote2.jpg"
import promote3 from "../../assets/promote3.jpg"
import Footer from '../LandingPage/Footer'
import {FaStar} from 'react-icons/fa';
import {CiCalendarDate} from 'react-icons/ci'
import {BiMoney} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill, BsBookmark, BsFillBookmarkCheckFill} from 'react-icons/bs'
import { themeContext } from '../Context/Shop'
import { useContext } from 'react'
import { promoteEvent, promoteEventID } from '../Redux/State'


function HomePage() {
        const Dispatch = useDispatch()
        const {themes, ChangeTheme} = useContext(themeContext)
        const [promotedEvents, setPromotedEvents] = useState([])
        const [followingsEvents, setFollowingsEvents] = useState([])
        const [promoteError, setPromoteError] = useState(false)
        const [searchError, setSearchError] = useState(false)
        const [searchErrormsg, setSearchErrormsg] = useState("")
        const [countpro, setCountpro] = useState(0)
        const [shouldExecute, setShouldExecute] = useState(true);
        const eventIsPromoted = useSelector(state=>state.events.promotion)
        const PromotedID = useSelector(state=>state.events.promotedID)
        const [uploadedEvent, setUploadEvent] = useState([])
        const [deactivate, setDeactivate] = useState(false)
        const [seemoreBtn, setSeemoreBtn] = useState(false)
        const [promoteLoading, setpromoteLoading] = useState(false)
         const userOnLoggedIn = useSelector(state=>state.events.user)
        const url = "https://creativents-on-boarding.onrender.com/api/events" 
        const promoteUrl = "https://creativents-on-boarding.onrender.com/api/promoted" 
        const followingUrl = "https://creativents-on-boarding.onrender.com/api/getEventsByFollowing" 

        console.log(eventIsPromoted);
        console.log(PromotedID);

        const getPromotedEvents = () => {
          axios.get(promoteUrl)
        .then(res=>{
          console.log(res)
          setPromotedEvents(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
      }

        const token = userOnLoggedIn.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        
       const eventUploaded = () => {
        axios.get(url)
        .then(res=>{
            console.log(res.data.data);
            setUploadEvent(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
       }

       const getFollowingEvents = () => {
        axios.get(followingUrl, config)
      .then(res=>{
        console.log("Followers", res)
        setFollowingsEvents(res.data.data)
      })
      .catch(err=>{
        console.log("Followers", err)
      })
    }

       useEffect(()=>{
        eventUploaded()
        getPromotedEvents()
        getFollowingEvents()
       },[])

       const isPromoted = promotedEvents.map((e)=>e.eventImages)
       const isPromotedName = promotedEvents.map((e)=>e.eventName)
       const isPromotedTime = promotedEvents.map((e)=>e.eventTime)
       const isPromotedDate = promotedEvents.map((e)=>e.eventDate)
       const isPromotedVen = promotedEvents.map((e)=>e.eventVenue)
       
  const [popUp, setPopUp] = useState(false)
  const [settingPopUp, setSettingPopUp] = useState(false)
  const [search, setSearch] = useState(false)
  
  const promoteImages = [promote, promote2, promote3] 

  const nav = useNavigate()
  console.log(userOnLoggedIn);
  const id = userOnLoggedIn.id
  const profile = userOnLoggedIn.profilePicture
  const admin = userOnLoggedIn.admin

  const signOut = () => {
      console.log(id);
      nav(`/api/logout/${id}`)
  }

  const changeUserPassword = () => {
      console.log(id);
      nav(`/api/changepasswordlogged/${id}`)
  }

  const changeUserProfilePicture = () => {
    console.log(id);
    nav(`/api/add-profile-image/${id}`)
  }

  const checkUserEventProfile = () => {
    console.log(id);
    nav(`/api/getUserWithLinks/${id}`)
  }
  
    const ShowPopUp = () => {
      setPopUp(!popUp)
    }

    const hidePopUp = () => {
      setPopUp(!popUp)
    }

    const showSettings = () => {
      setSettingPopUp(!settingPopUp)
      setPopUp(!popUp)
    }

    const hideSettings = () => {
      setSettingPopUp(!settingPopUp)
      setPopUp(true)

    }
   
  const category = [
    {
    name:"Music",
    image:Cat1
    },
    {
      name:"Sport",
      image:Cat2
    },
    {
      name:"Festival",
      image:Cat3
    },
    {
        name:"Fashion Exhibition",
        image:Cat4
    },
    {
      name:"Tech Exhibition",
      image:Cat4
    },
    {
      name:"Health Event",
      image:Cat4
    },
    {
      name:"Art Theatre",
      image:Cat4
    }
]

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

const searchUrl = `https://creativents-on-boarding.onrender.com/api/event/search?searchTerm=${searchTerm}`

  const searchParameter = {
    searchparams: {
      eventName: searchTerm,   
      eventCategory: searchTerm,
      eventPrice: searchTerm,    
      eventLocation: searchTerm, 
      eventVenue: searchTerm,    
      eventDate: searchTerm,     
      eventTime: searchTerm,     
    }
  }

const SearchBar = () => {
  setSearchErrormsg("")
  axios.get(searchUrl, searchParameter)
  .then(res=>{
    console.log(res);
    setSearchResults(res.data.data); 
    setSearchError(false)
  })
  .catch(err=>{
    console.log('Error searching events:', err);
    if (err.message === "Network Error") {
      setSearchError(true)
      setSearchErrormsg("No Internet Connection")
    }
    else {
      setSearchError(err.response.data.message)
      setSearchError(true)
    }
  }) 
  
}

const seemore = uploadedEvent.slice(0, 9)

const executeCodeEvery4Seconds = () => {
  setCountpro(prev=> prev +=1)

  if (shouldExecute) {
    setTimeout(executeCodeEvery4Seconds, 4000);
  }
}




useEffect(()=>{
  if (searchTerm !== '') {
    SearchBar();
  }

},[searchTerm])
console.log(searchResults)

useEffect(()=>{
  setTimeout(() => {
    Dispatch(promoteEvent(deactivate))
  }, 45000);
  executeCodeEvery4Seconds();

  return () => {
    setShouldExecute(false);
  };

},[])



  return (
    <div className='HomePage' style={{background:themes?"white":"rgb(8, 2, 47)"}}>
    <section className='HomePage_Header'>
      <div className='HomePage_HeaderWrapper'>
        <div className='HeaderLogo'>
        <img src={LogoC} alt="" />
        </div>
        <BiSearch className='Search_Icons'/>
        <input type='text'  onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search for events' onFocus={()=>{
            setSearch(true)
        }}
        onBlur={() => {
          setSearch(false)
        }} value={searchTerm === "eventPrice"? +(searchTerm):searchTerm} className='Search_Bar'/>
        
        <div style={{display:popUp?"none":settingPopUp?"none":null}} className='Pages_Profile'>
          
          <nav className='Header_Pages'>
            <ul>
              <NavLink style={{color:"white"}} to={'/upload'}>
              <li>Create Event</li>
              </NavLink>
              {/* <NavLink style={{color:"white"}}> */}
              <li onClick={()=>{
                nav(`/api/getUserWithLinks/${id}`)
              }}>My Event</li>
              {/* </NavLink> */}
              <NavLink style={{color:"white"}} to={'/about'}>
              <li>About Us</li>
              </NavLink>
            </ul>
          </nav>
        </div>
        <div style={{display:popUp?"none":settingPopUp?"none":null}} className='Header_Profile'  >
          <p style={{fontSize:"12px"}} className='muri'>{userOnLoggedIn.name}</p>
          <div className='Profile_Image' onClick={ShowPopUp} >
            <img src={profile} alt="" />

          </div>
        </div>
      </div>
    </section>
    {
      popUp?<div className='PopUp_Desktop' >
           <BiArrowBack style={{fontSize:"19px", left:"10%", position:"absolute", cursor:"pointer", marginTop:"19px", display:"flex", justifySelf:"flex-start"}} onClick={hidePopUp}/>
            <ul>
            <div style={{marginLeft:"15px", marginBottom:"10px"}} className='Profile_Image'>
            <img src={profile} alt="" />
            <p style={{fontSize:"13px", color:"rgb(255, 178, 29)", textDecoration:"underline"}}>{userOnLoggedIn.name}</p>
          </div>
              <li  onClick={()=>nav('/upload')}>Create Event</li>
              <NavLink style={{color:"white"}} to={'/about'}>
              <li>About Us</li>
              </NavLink>

              <li onClick={showSettings}>Settings</li>
              <li onClick={signOut}>Log out</li>
            </ul>
      </div>:null
    }

{
      settingPopUp?<div className='SettingsPopUp_Desktop' onMouseLeave={hidePopUp}>
        <BiArrowBack style={{fontSize:"19px", left:"10%", position:"absolute", cursor:"pointer", marginTop:"19px", display:"flex", justifySelf:"flex-start"}} onClick={hideSettings}/>
            <ul>
              <li onClick={changeUserPassword}>Change Password</li>
              <li onClick={changeUserProfilePicture}>Update Profile</li>
              <li onClick={ChangeTheme}>{themes?"Dark Mode":"Light Mode"}</li>
              <li onClick={checkUserEventProfile}>My Events</li>
              {
                admin?<li onClick={()=>nav('/adminDashboard')}>Admin DashBoard</li>:null
              }
            </ul>
      </div>:null
    }
     
   {
    !searchTerm?
     <section className='HomePage_Main'>
    <div className='HomePage_Events'>
      <img src={isPromoted[countpro % isPromoted.length]} alt="" />
    </div>
    <div style={{width:"90%",display:"flex", flexDirection:"column", justifyContent:"flex-start"}} className='Home_EventDesc'>
      <h4 style={{fontSize:"19px", marginBlock:"2px"}}>{isPromotedName[countpro % isPromotedName.length]}</h4>
      <h4 style={{fontSize:"18px", marginBlock:"2px"}}>{isPromotedDate[countpro % isPromotedDate.length]}  ---  {isPromotedTime[countpro % isPromotedTime.length]} {}</h4>
      <h3 style={{fontSize:"18px", marginBlock:"2px"}}>{isPromotedVen[countpro % isPromotedVen.length]}</h3>
    </div>
  </section>: null
   }

   {
    !searchTerm?
    <section className='Header_Category'>
    <div className='Header_CategoryContent'>
      <h4>Categories</h4> 
    </div>
    <div className='Header_CategoryContent_Cards'> 
    {
      category.map((e,ind)=>(
        <div className='Category_card'style={{cursor:"pointer"}} onClick={()=>
        {
          setSearchTerm(e.name)
        }}  key={ind}>
          <img src={e.image} alt="" />  
        <h4 style={{color:'white'}}>{e.name}</h4>

        </div>

      ))
    } 
    </div>
  </section>:null
   }

    <h4 className='up' style={{marginBottom:"3vh", display:"flex", alignSelf:"flex-start", marginLeft:"5%", animation:"slideInUp",animationDuration:"0.8s"}}>{searchTerm?`Searched Results for "${searchTerm}"`:"Upcoming Events"}</h4>
    <section className='Upcoming_Events'>
      <div className='Upcoming_EventsWrapper'>
      {
        searchResults.length === 0?
        promotedEvents.length === 0?
        <>
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
        <div className='upper-Header'></div>
      
        <div className='innupper-header'>
          <div className='Upcoming_EventImage'>
            <img src="" alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
           
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span className='span'></span>
            </div>
            <span className='span3'></span>
            <div className='buttoncontroler'>
              <button className='btn1'>Book now</button>
              </div>
              </div>
            </div>
            </div>
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
        <div className='upper-Header'></div>
      
        <div className='innupper-header'>
          <div className='Upcoming_EventImage'>
            <img src="" alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
           
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span className='span'></span>
            </div>
            <span className='span3'></span>
            <div className='buttoncontroler'>
              <button className='btn1'>Book now</button>
              </div>
              </div>
            </div>
            </div>
          <div className='Upcoming_EventsDetails' style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
        <div className='upper-Header'></div>
      
        <div className='innupper-header'>
          <div className='Upcoming_EventImage'>
            <img src="" alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
           
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span className='span'></span>
            </div>
            <span className='span3'></span>
            <div className='buttoncontroler'>
              <button className='btn1'>Book now</button>
              </div>
              </div>
            </div>
            </div>
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
        <div className='upper-Header'></div>
      
        <div className='innupper-header'>
          <div className='Upcoming_EventImage'>
            <img src="" alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
           
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span className='span'></span>
            </div>
            <span className='span3'></span>
            <div className='buttoncontroler'>
              <button className='btn1'>Book now</button>
              </div>
              </div>
            </div>
            </div>
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
        <div className='upper-Header'></div>
      
        <div className='innupper-header'>
          <div className='Upcoming_EventImage'>
            <img src="" alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
           
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span className='span'></span>
            </div>
            <span className='span3'></span>
            <div className='buttoncontroler'>
              <button className='btn1'>Book now</button>
              </div>
              </div>
            </div>
            </div>
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  >
        <div className='upper-Header'></div>
      
        <div className='innupper-header'>
          <div className='Upcoming_EventImage'>
            <img src="" alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
           
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span className='span'></span>
            </div>
            <span className='span3'></span>
            <div className='buttoncontroler'>
              <button className='btn1'>Book now</button>
              </div>
              </div>
            </div>
            </div>
        </>:searchResults.length === 0 && searchTerm?
        <h1 style={{width:"100%", height:"70vh", display:"flex", justifyContent:"center", fontSize:"30px"}}>No Search Result</h1>
        :searchTerm?uploadedEvent.map((e)=>(
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s", cursor:"pointer"}}  key={e._id}>
          <div className='upper-Header'>{e.eventName}</div>
        
          <div className='innupper-header'>
            <div className='Upcoming_EventImage'>
              <img src={e.eventImages} alt="" />
            </div>
            <div className='Upcoming_EventDesc'>
            
              <div className='Upcoming_LocationDiv'>
                <div className='upcomingevent-holder'> 
              <MdLocationPin className='Upcoming_Location'/>
              <span className='span'>{e.eventVenue}</span>
              </div>

              <h5 className='span3'>{e.eventDate}</h5>

              </div>
              <div className='buttoncontroler'>
                <h6>{e.eventLocation}</h6>
                <h6>{e.eventTime}</h6>
                <h6>&#8358;{e.eventPrice}</h6>
                
                <button className='btn1' key={e._id} onClick={ () =>{
                  nav(`/api/events/${e._id}`)
                }}>Book now</button>
   
                
     
              </div>
            </div>
            </div>
          </div>
        ))
        :promotedEvents.map((e)=>(
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  key={e._id}>
          <div className='upper-Header'>{e.eventName}</div>
        
          <div className='innupper-header'>
            <div className='Upcoming_EventImage'>
              <img src={e.eventImages} alt="" />
            </div>
            <div className='Upcoming_EventDesc'>
            
              <div className='Upcoming_LocationDiv'>
                <div className='upcomingevent-holder'> 
              <MdLocationPin className='Upcoming_Location'/>
              <span className='span'>{e.eventVenue}</span>
              </div>

              <h5 className='span3'>{e.eventDate}</h5>

              </div>
              <div className='buttoncontroler'>
                <h6>{e.eventLocation}</h6>
                <h6>{e.eventTime}</h6>
                <h6>&#8358;{e.eventPrice}</h6>
                
                <button className='btn1' key={e._id} onClick={ () =>{
                  nav(`/api/events/${e._id}`)
                }}>Book now</button>
   
              </div>
            </div>
            </div>
          </div>
        ))
        :
        searchResults.map((e)=>(
          <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  key={e._id}>
          <div className='upper-Header'>{e.eventName}</div>
        
          <div className='innupper-header'>
            <div className='Upcoming_EventImage'>
              <img src={e.eventImages} alt="" />
            </div>
            <div className='Upcoming_EventDesc'>
            
              <div className='Upcoming_LocationDiv'>
                <div className='upcomingevent-holder'> 
              <MdLocationPin className='Upcoming_Location'/>
              <span className='span'>{e.eventVenue}</span>
              </div>

              <h5 className='span3'>{e.eventDate}</h5>

              </div>
              <div className='buttoncontroler'>
                <h6>{e.eventLocation}</h6>
                <h6>{e.eventTime}</h6>
                <h6>&#8358;{e.eventPrice}</h6>
                
                <button className='btn1' key={e._id} onClick={ () =>{
                  nav(`/api/events/${e._id}`)
                }}>Book now</button>
     
              </div>
            </div>
            </div>
          </div>
        ))
        

      }
       {
        !searchTerm?
        followingsEvents.map((e)=>(
           <div className='Upcoming_EventsDetails'  style={{animation:"slideInUp",animationDuration:"0.8s"}}  key={e._id}>
          <div className='upper-Header'>{e.eventName}</div>
        
          <div className='innupper-header'>
            <div className='Upcoming_EventImage'>
              <img src={e.eventImages} alt="" />
            </div>
            <div className='Upcoming_EventDesc'>
            
              <div className='Upcoming_LocationDiv'>
                <div className='upcomingevent-holder'> 
              <MdLocationPin className='Upcoming_Location'/>
              <span className='span'>{e.eventVenue}</span>
              </div>

              <h5 className='span3'>{e.eventDate}</h5>

              </div>
              <div className='buttoncontroler'>
                <h6>{e.eventLocation}</h6>
                <h6>{e.eventTime}</h6>
                <h6>&#8358;{e.eventPrice}</h6>
                
                <button className='btn1' key={e._id} onClick={ () =>{
                  nav(`/api/events/${e._id}`)
                }}>Book now</button>
     
              </div>
            </div>
            </div>
          </div>
        )):null
      }
      </div>
    </section>
   
    <section className='Home_Tickets'>
        <div className='Ticket_Header'>
          <div className='Ticket_Line'></div>
          <h4>Events</h4>
          <div className='Ticket_Line'></div>
        </div>

        <div className='Event_Tickets'>
        {   seemoreBtn?
            uploadedEvent.map((e)=>(
              <div style={{animation:"slideInUp",animationDuration:"0.8s",  cursor:"pointer"}} className="main-category" key={e._id} onClick={()=>{
                  nav(`/api/events/${e._id}`)
              }}>
              <div className="category-image" >
              <img src={e.eventImages} alt="" />
                  <div className='love'>
                  {/* onClick={handleLiked} :liked ? */}
                  {/* <BsFillSuitHeartFill style={{color:
                   "lightgrey"}}/> */}
                  </div>
                  <div className='love2'>
                  {/* <CiMenuKebab/> */}
                  </div>
                  
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
                      <div  className='thedate'>
                          <CiCalendarDate style={{color:"#FCA702"}}/>
                          <h5 style={{color:"#FCA702"}}>{e.eventDate}</h5>
                          {/* <h5>26 july 2023</h5> */}
                      </div>
                      <div className='theprice'>
                          <BiMoney style={{color:"#FCA702"}}/>
                          <h5 style={{color:"#FCA702"}} >&#8358;{e.eventPrice}</h5>
                          {/* <h5>#2000</h5> */}
                      </div>
                  </div>
              </div>
          </div>

          )):
            seemore.map((e)=>(
                <div style={{animation:"slideInUp",animationDuration:"0.8s",  cursor:"pointer"}} className="main-category" key={e._id} onClick={()=>{
                    nav(`/api/events/${e._id}`)
                }}>
                <div className="category-image" >
                <img src={e.eventImages} alt="" />
                    <div className='love'>
                    {/* onClick={handleLiked} :liked ? */}
                    {/* <BsFillSuitHeartFill style={{color:
                     "lightgrey"}}/> */}
                    </div>
                    <div className='love2'>
                    {/* <CiMenuKebab/> */}
                    </div>
                    
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
                        <div  className='thedate'>
                            <CiCalendarDate style={{color:"#FCA702"}}/>
                            <h5 style={{color:"#FCA702"}}>{e.eventDate}</h5>
                            {/* <h5>26 july 2023</h5> */}
                        </div>
                        <div className='theprice'>
                            <BiMoney style={{color:"#FCA702"}}/>
                            <h5 style={{color:"#FCA702"}} >&#8358;{e.eventPrice}</h5>
                            {/* <h5>#2000</h5> */}
                        </div>
                    </div>
                </div>
            </div>

            ))
           }
           {
            uploadedEvent.length !== 0 && seemore.length !== 0?
            <div className='seeMore_Holder'>
           <button className='seeMore_Btn' onClick={()=>{
            setSeemoreBtn(!seemoreBtn)
           }}>{seemore?"See More":"See Less"}</button>
           </div>:null
           }

        </div>
    </section>
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

    <Footer />

   {
    eventIsPromoted?
    // setTimeout(() => {
      <div className=' Promoted_PopUp'>
      <div className='Promoted_PopUpDiv'>
        <img src={promoteImages[countpro % promoteImages.length]} alt="" />
        <div className='Position_Promote'>
        <h1 style={{fontFamily:"cursive", color:"#FCA702", fontSize:"40px"}}>Want more?</h1>
        <h2>Promote Your Event</h2>
        <h2 style={{ fontSize:"30px"}}>@</h2>
        <h1>&#8358;3,000</h1>
        <div className='Promote_PopUpBtns'>
        <button style={{background:promoteLoading?"#0d034d":null}} disabled={promoteLoading} className='Promote_Btn' onClick={()=>{
           const refVal = "Creativents"+ Math.random() * 1000;
           window.Korapay.initialize({
             key: "pk_test_1QYXY85UpKezdtEXEGbhpnTxRx5ef2aQ4hsA46g7",
             reference: `${refVal}`,
             amount: 3000, 
             currency: "NGN",
             customer: {
               // name: user.name,
               name: userOnLoggedIn.name,
               email: userOnLoggedIn.email
               // name: user.email,
             },
             notification_url: "https://example.com/webhook",
             onClose: function () { 
             },
              onSuccess: function () { 
                setpromoteLoading(true)
                axios.post(`https://creativents-on-boarding.onrender.com/api/events/promote/${PromotedID}`,null, config)
                .then(res=>{
                  setpromoteLoading(false)
                  console.log(res)
                  setPromoteError(false)
                  Dispatch(promoteEvent(deactivate))
                  Dispatch(promoteEventID({promotedID:""}))
                })
                .catch(err=>{
                  setpromoteLoading(false)
                  setPromoteError(true)
                  console.log(err)
                })
             }, 
             onFailed: function () { 
             },
           });
       
          
        }}>{promoteLoading?<SpinnerCircularSplit style={{animation:"slideInUp",animationDuration:"0.5s"}} size={30} thickness={150} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0.44)" />:
         "Promote"}</button>
        <button className='Interest_Btn' onClick={()=>{
          Dispatch(promoteEvent(deactivate))
          Dispatch(promoteEventID({promotedID:""}))
        }}>Not Interested</button>
        </div>
        </div>
      </div>
    </div>
    // }, 3000)
    :null
   }

  </div>
  )
}

export default HomePage
