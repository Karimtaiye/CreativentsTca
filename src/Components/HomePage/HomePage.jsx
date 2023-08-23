import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './HomePage.css'
import './HomepageMobileResponsive.css'
import { BiSearch } from 'react-icons/bi'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { SlOptionsVertical } from 'react-icons/sl'
import { BiArrowBack } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import LogoC from "../../assets/LogoC.png"
import Cat1 from "../../assets/Cat1.png"
import Cat2 from "../../assets/Cat2.png"
import Cat3 from "../../assets/Cat3.png"
import Cat4 from "../../assets/Cat4.png"
import Footer from '../LandingPage/Footer'
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {CiMenuKebab} from 'react-icons/ci';
import {CiCalendarDate} from 'react-icons/ci'
import {BiMoney} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import HomeImage from '../../assets/HomeImage.png'
import {BsBookmarkHeart} from 'react-icons/bs'




function HomePage() {
        const [uploadedEvent, setUploadEvent] = useState([])
        // const [imageRoll, setImageRoll] = useState(0)

        const url = "https://creativents-on-boarding.onrender.com/api/events"
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
       const carousel = uploadedEvent.filter((e)=>e.eventImages)
       console.log(carousel);
    
       useEffect(()=>{
        eventUploaded()
       },[])

  const userOnLoggedIn = useSelector(state=>state.events.user)
  const [popUp, setPopUp] = useState(false)
  const [settingPopUp, setSettingPopUp] = useState(false)
  // const userSignUpData = useSelector(state=>state.events.userRes)
  const nav = useNavigate()
  console.log(userOnLoggedIn);
  const id = userOnLoggedIn.id
  const profile = userOnLoggedIn.profilePicture

  const signOut = () => {
    // axios.get("https://creativents-on-boarding.onrender.com/api/allusers")
    // .then(res=>{
    //   console.log(res.data.data[0]._id)
    //   console.log(res.data.data[0].token)
    //   Dispatch(userResData(res.data.data[0].token))
    //   const id = res.data.data[1]._id
      console.log(id);
      nav(`/api/logout/${id}`)
    // })
  }

  const changeUserPassword = () => {
  //   // axios.get("https://creativents-on-boarding.onrender.com/api/allusers")
  //   // .then(res=>{
  //   //   console.log(res.data.data[1]._id)
  //   //   console.log(res.data.data[0].token)
  //   //   Dispatch(userResData(res.data.data[1].token))
  //   //   const id2 = res.data.data[1]._id
      console.log(id);
      nav(`/api/changepasswordlogged/${id}`)
  //   // })
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
        name:"Wedding",
        image:Cat4
    },
    {
      name:"Wedding",
      image:Cat4
  }
]



  return (
    <div className='HomePage'>
    <section className='HomePage_Header'>
      <div className='HomePage_HeaderWrapper'>
        <div className='HeaderLogo'>
        <img src={LogoC} alt="" />
        </div>
        <BiSearch className='Search_Icons'/>
        <input type='text' placeholder='Search for events' className='Search_Bar'/>
        <div style={{display:popUp?"none":null}} className='Pages_Profile'>
          
          <nav className='Header_Pages'>
            <ul>
              <NavLink to={'/upload'}>
              <li>Create Event</li>
              </NavLink>
              {/* <li>Find Event</li> */}
              <NavLink style={{color:"white"}} to={'/about'}>
              <li>About Us</li>
              </NavLink>
            </ul>
          </nav>
        </div>
        <div style={{display:popUp?"none":null}} className='Header_Profile'  >
          <p className='muri'>{userOnLoggedIn.name}</p>
          <div className='Profile_Image' onMouseOver={ShowPopUp} >
            <img src={profile} alt="" />

          </div>
        </div>
      </div>
    </section>
    {
      popUp?<div className='PopUp_Desktop' onMouseLeave={hidePopUp}>
        
            <ul>
            <div style={{marginLeft:"15px", marginBottom:"10px"}} className='Profile_Image'>
            <img src={profile} alt="" />
            <p style={{fontSize:"13px", color:"rgb(255, 178, 29)", textDecoration:"underline"}}>{userOnLoggedIn.name}</p>
          </div>
              <li  onClick={()=>nav('/upload')}>Create Event</li>
              <NavLink style={{color:"white"}} to={'/about'}>
              <li>About Us</li>
              </NavLink>
              {/* <NavLink to={'/saved'}>
              <li>My Tickets</li>
              </NavLink> */}
              {/* <li onClick={()=>nav('/saved')}>Saved</li> */}
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
              <li onClick={changeUserProfilePicture}>Change Profile Picture</li>
              <li>Dark Mode</li>
              <li onClick={checkUserEventProfile}>My Events</li>
            </ul>
      </div>:null
    }
     
    <section className='HomePage_Main'>
      <div className='HomePage_Events'>
        <img src={HomeImage} alt="" />
      </div>
      <div className='Home_EventDesc'>
        <h2>Sunday, September 31st 2023</h2>
        <h1>Pastor Frank 7th Spiritual Journey Session</h1>
      </div>
    </section>

    <section className='Header_Category'>
      <div className='Header_CategoryContent'>
        <h4>Categories</h4> 
        {/* <span className='CatArrow'><TbMathGreater  /></span>  */}
      </div>
      <div className='Header_CategoryContent_Cards'> 
      {
        category.map((e,ind)=>(
          <div className='Category_card'  key={ind}>
            <img src={e.image} alt="" />  
          <h4 style={{color:'white'}}>{e.name}</h4>

          </div>
 
        ))
      } 
      </div>
    </section>

    <h4 className='up' style={{marginBottom:"3vh", display:"flex", alignSelf:"flex-start", marginLeft:"5%"}}>Upcoming Events</h4>
    <section className='Upcoming_Events'>
      <div className='Upcoming_EventsWrapper'>
      {
      uploadedEvent.map((e)=>(
        <div className='Upcoming_EventsDetails'>
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
              <button className='btn1' key={e._id} onClick={ () =>{
                nav(`/api/events/${e._id}`)
              }}>Book now</button>
              <BsBookmarkHeart className='bookmark'/>
            </div>
          </div>
          </div>
        </div>
       
      ))
    }

      </div>
    </section>

    <section className='Home_Tickets'>
        <div className='Ticket_Header'>
          <div className='Ticket_Line'></div>
          <h4>Tickets</h4>
          <div className='Ticket_Line'></div>
        </div>

        <div className='Event_Tickets' style={{justifyContent:"center"}}>
        {
            uploadedEvent.map((e)=>(
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

            ))
           }

        </div>
    </section>
    <div className="directiontodifferentpage">
            <div className="Homedirection">
                <AiFillHome onClick={()=>nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
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

  </div>
  )
}

export default HomePage