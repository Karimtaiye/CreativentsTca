  
import "./About.css"
import Header from "../LandingPage/Header"
import Footer from "../LandingPage/Footer" 
import './AboutMobile.css'
import {AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill} from 'react-icons/bs'
const About =()=>{
   
    return(
 
  <>
  <Header />
  <div className="aboutPageHolder">
  <section className="aboutPage">
  <h1 className="aboutUs">ABOUT US</h1>
  <h3 className="aboutCreativent">
  Creativent is a platform with a wide range of services that satisfies<br></br>
  customers demands with easy and secure payment options, we <br></br>
  are ready to give you the best experience as an event enthusiasts<br></br>
  or attendee 
  </h3>
 
 </section>
 <h3 className="aboutAllMiddleText">Creative corporate event ideas </h3>
 <div className="aboutUsPictureHolder">

 <div className="aboutUsPictureHolderLeft">
   
    <h3 className="aboutUsPictureHolderLeftText">Don’t Miss Out !!! </h3>
 </div>
  <div className="aboutUsPictureHolderRight">
    <h2 className="aboutTextFirst">Hosts </h2>
    <h2 className="aboutTextSecond">Get the Best from Creativents </h2>
    <h3 className="aboutTextThird">
    
            Creativent offers good services for event organizers
            and attendees at almost no cost. Event organizers
            can create their own event page and add custom 
            ticket/registration types to sell to their guests
            while event attendees can find events, register
            for events and purchase tickets seamlessly. 
    </h3>
  </div>
 </div>
    <h3 className="aboutAllMiddleText">Discover More  </h3>
 <div className="aboutUsSecondpictureHolder">

    <div className="aboutUsSecondpictureHolderLeft"><h3 className="aboutUsSecondpictureHolderLeftText">Buy Tickets </h3></div>
    <div className="aboutUsSecondpictureHolderRight"><h3 className="aboutUsSecondpictureHolderRightText">Create Events</h3></div>
 </div>
 </div>
  <Footer />
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
export default About




