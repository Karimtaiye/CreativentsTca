import "./SavedTickets.css"
import "./SavedTicketsMobile.css"
import {AiOutlineHeart} from "react-icons/ai"
import {BsBookmark, BsCart3, BsFillSuitHeartFill,BsBookmarkFill} from "react-icons/bs"
import {GiHamburgerMenu} from "react-icons/gi"
import {MdDateRange} from "react-icons/md"
import {LuTicket} from "react-icons/lu"
import {RiDeleteBin5Line} from "react-icons/ri"
import { useSelector } from 'react-redux'
// import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import LogoC from "../../assets/LogoC.png"



const SavedTickets =()=>{
    const [detail, setDetail] = useState(false);
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const userName = userOnLoggedIn.name
  const userId = userOnLoggedIn.id
  const userEmail = userOnLoggedIn.email
  const userProfilePicture = userOnLoggedIn.profilePicture

    const DetailPop = () =>{
         setDetail(!detail)
    }

    const url = "https://creativents-on-boarding.onrender.com/api/allusers"
    const getUserInfo = () => {
        axios.get(url)
    .then(res=>{
        console.log(res)
        if(res){
            console.log("request sent")
        }
        else{
            console.log("error sending request");
        }
    })
    }
    useEffect(()=>{
        getUserInfo()
    },[])
console.log(userOnLoggedIn)
    return(
        <>
        <main className="MainDetailHolder">
            <nav className="NavDetailHolder">
                <div className="DetailLogoHolder">
                    <img src="" alt="Vent" className="DetailLogo" />
                </div>
                <div className="DetailNavIcon">
                    <div className="Saved">
                    <h3 className="DetailSaved">Saved</h3>
                    <AiOutlineHeart className="ReactHeart"/>
                    </div>
                    <div className="Book">
                    <h3 className="DetailBook">BookMark</h3>
                   <BsBookmark className="ReactBook"/>
                    </div>
                  <div className="Cart">
                  <h3 className="DetailCart">MyCart</h3>
                  <BsCart3 className="ReactCart"/>
                  </div>
                </div>
                <div className="DetailProfile">
                    <div className="DetailCircle">
                        <img src={userProfilePicture} alt="" />
                    </div>
                    <h3 className="DetailName">Profile</h3>
                    <GiHamburgerMenu className="DetailMenu" 
                    onClick={DetailPop}
                    />
                </div>
               </nav>
              {
                detail? <div className="DetailPopUp">
                <span className="DetailSpan" onClick={DetailPop}>x</span>
                <div className="DetailProfilee">
                     <div className="DetailCirclee"></div>
                     <h3 className="DetailNamee">Profile</h3>
                     </div>
                     <div className="Cartt">
                   <h3 className="DetailCartt">MyCart</h3>
                   <BsCart3 className="ReactCartt"/>
                   </div>
                   <div className="Bookk">
                     <h3 className="DetailBookk">BookMark</h3>
                    <BsBookmark className="ReactBookk"/>
                     </div>
                     <div className="Savedd">
                     <h3 className="DetailSavedd">Saved</h3>
                     <AiOutlineHeart className="ReactHeartt"/>
                     </div>
                </div>:null
              }
            <section className="DetailTextHolder">
                <div className="DetailText">
                    <h1 className="DetailWelcome">Welcome Back {userName}!!</h1>
                    <h2 className="DetailPurchased">You have purchased (8) tickets in total</h2>
                </div>
            </section>
            <div className="MainTicketHolder">
            <div className="TicketHolder">

                <div className="TicketText">
                    <h2 className="SavedTickets">BookMark Tickets</h2>
                </div>
                <div className="Bookmarked_Tickets">
                    <div className="My_Tickets">
                        <div className="My_TicketDetails">
                            <div className="My_TicketImage">

                            </div>
                            <div className="My_EventDetails">
                                <div className="Events_Desc">
                                    <p>Health Care Africa 2023 Show</p>
                                    <p>Sheraton Hotel, Ikeja GRA.</p>
                                </div>
                                <div classname="SavedEvent_DateTime">
                               <div className="Date_Time">
                               <MdDateRange style={{fontSize:"13px"}}/> <span style={{fontSize:"13px"}}>Date and Time</span>
                               </div>
                                <LuTicket style={{fontSize:"13px"}}/> <span style={{fontSize:"13px"}}>Price in Naira</span>
                                </div>
                            </div>
                            <div classname="My_EventIcons">
                                
                            </div>
                        </div>
                        <div className="My_TicketOptions">
                            <span className="Delete_Ticket">Delete</span>
                            <span className="Update_Ticket">update</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </main>
            <div>
            {/* <Footer/> */}
            </div>
            </>
           
    )
}
export default SavedTickets
