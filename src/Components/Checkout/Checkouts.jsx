

import './Checkouts.css'
import './CheckoutMobiles.css'
import{CiLocationOn} from 'react-icons/ci'
import{BiTimeFive} from 'react-icons/bi'
import {AiOutlinePlus, AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import{BsCalendarDate} from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom'
import LogoC from "../../assets/LogoC.png"
import axios from 'axios'
import { eventData, checkoutTicketQty, checkoutTicketPrice } from '../Redux/State'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SpinnerDotted } from 'spinners-react'
import { FaStar } from 'react-icons/fa';
import { MdNetworkCheck } from 'react-icons/md'
import { PiSmileySad } from 'react-icons/pi'
import { purchasedEventID } from '../Redux/State'


const Checkout = () =>{
    const Dispatch = useDispatch()
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const nav = useNavigate()
    const [notification, setNotification] = useState("")
    const [data, setData] = useState()
    const [error, setError] = useState("")
    const [exist, setExist] = useState(false)
    const [msg, setMsg] = useState("Loading, Please wait...")
    const ticketPrice = useSelector((state)=>state.events.ticketPrice)
    const purchasedID = useSelector(state=>state.events.eventID)
    const { id } = useParams()
    const [ticketQty, setTicketQty] = useState(1)
    const [ticketQtyy, setTicketQtyy] = useState(1)
    const [network, setNetwork] = useState(false)
    const [like, setLike] = useState (0)
    const [disLike, setDisLike] = useState (0)
    const [todos, setTodos] = useState([])
    const [ratings, setRatings] = useState(0)
    const [input, setInput] = useState('')
    const [review, setreview] = useState([])
    const [bookmarked, setBookmarked] = useState(false)
    const token = userOnLoggedIn.token
    const userId = userOnLoggedIn.id
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const handleStarClick = (selectedRating) => {
        setRatings(selectedRating);
      };
      
      console.log(ratings);
      console.log(input);
      const reviewData = {
          rating:ratings,
          reviewText:input
      }
      
      const addReview = () => {
        setError("")
        axios.post(`https://creativents-on-boarding.onrender.com/api/events/${id}/review`, reviewData ,config)
          .then(res => {
            console.log(res);
            setInput("");
    
            // Append the new review to the existing reviews array
            const newReview = {
                _id: res.data._id,
                attendeeName: userOnLoggedIn.name,
                userPicture: userOnLoggedIn.profilePicture,
                timestamp: new Date().toLocaleString(),
                reviewText: input,
                rating: ratings
            };
            setData(prevData => ({
                ...prevData,
                reviews: [...prevData.reviews, newReview]
            }));
        })
        .catch(err => {
            console.log(err);
            if(err.response.data.message === "Unauthorized. You must purchase a ticket for this event to submit a review"){
            setError("You must purchase a ticket for this event to submit a review");
            }
            else if(err.response.data.message === "jwt expired"){
            nav('/login')
            }
            else if(err.message === "Network Error"){
                setError("Please check your Internet Connection")
            }
            else if(err.response.data.message === "jwt must be provided"){
                setError("You have to log in to pass review on this event")
            }
            else if(err.response.data.message === "Error submitting reviewevent validation failed: reviews.0.reviewText: Path `reviewText` is required."){
                setError("The review field is empty")
            }
            else if(err.response.data.message === "jwt malformed"){
                nav('/login')
                setError("Please login");
            }
            else {
                setError(err.response.data.message)
            }
        });
    };
    

const handleLike = () =>{
    setLike(like === 0 ? 1 : 1)
}

const handledisLike = () =>{
    setDisLike(disLike === 0 ? 1 : 1)
}

useEffect(() => {
    
  }, []);



    const url = `https://creativents-on-boarding.onrender.com/api/events/${id}`
    useEffect(()=>{
        axios.get(url)
        .then(res=>{
            console.log(res.data.data);
            Dispatch(eventData(res.data.data))
            Dispatch(checkoutTicketPrice(res.data.data.eventPrice))
            setData(res.data.data)
            setTicketQtyy(res.data.data.availableTickets)

        })
        .catch(err=>{
            console.log(err)
            if(err.message === "Network Error"){
                setMsg("Unable to connect to the Internet")
                setNetwork(true)
            }
            else if(err.response.data.message === "jwt expired"){
                nav('/login')
                }
            else if(err.response.data.message === "Event not found"){
                setMsg("Event doesn't exist")
                setExist(true)
            }
            else{
                
                setMsg(err.response.data.message)
              }
        })
    },[])
   
   console.log(ticketPrice);
   console.log(ticketQtyy);
   const options = [];
   for (let i = 1; i <= ticketQtyy; i++) {
     options.push(<option key={i} value={i}>{i}</option>);
   }
  

    return(
        <>
       {
        !data ? 
        <div style={{width:"100%",
            height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <h1 style={{
            fontSize:"26px", width:"95%", color:"white", textAlign:"center"
        }}>{msg}</h1>
        {
            network?<MdNetworkCheck className='Network_Icon' />:exist?<PiSmileySad className='exist' /> :<SpinnerDotted size={150} thickness={50} speed={100} color="#ffffff" />
        }
        {network || exist ?<button className='GoBackBtn' onClick={()=>{
            nav(token?'/homepage':'/landingpage')
        }}>Go Back</button>:null}
        </div> :
        <div className="checkoutcontainer">

        <div className="checkoutholder">

            <div className="checkoutlogo">
            <div className="checkoutimage">
            <img src={LogoC} onClick={()=>nav(token?'/homepage':'/landingpage')} alt=""/>

            </div>
            </div>

            <div className='checkouteventimage'>
                <div className='imagecheckout'>
                    <img src={data.eventImages} alt="" />
                </div>
 
            </div>
                
                <p>{data.eventName}</p>

                <div className="checkoutdescription-checkout">
                    <div className="checkoutdescription">
                        <h1>Description</h1>
                        <p>{data.eventDescription}.</p>
                    </div>
                    
                    
            
                </div>
                <div className="checkouteventdetails">
                    <div className='everydetailsholder'>
                    <div className='checkoutvenue'>
                        <div className='checkoutdetails'>
                            <BsCalendarDate/>
                            <p>{data.eventDate}</p>
                        </div>
                        <div className='checkoutdetails'>
                            <BiTimeFive/>
                            <p>{data.eventTime}</p>
                        </div>
                        <div className='checkoutdetails'>
                            <CiLocationOn/>
                            <p>{data.eventVenue}</p>
                        </div>
                    </div>
                    <div className='checkoutticket'>
                        <h2>Ticket Details</h2>

                        <div className='allticket'>
                            <h2>Ticket Quantity</h2>
                            <div className='chooseticket'>

                                <select onChange={(e)=>{
                                            setTicketQty(e.target.value)
                                            Dispatch(checkoutTicketQty(e.target.value))

                                            }}>
                                        {
                                            !data?<option value="1">1</option>:options  
                                        }
    
                                        </select>

                            </div>
                        </div>

                        <div className='quantity'>
                                <h2>Price</h2>
                                <h3>{data.eventPrice}</h3>
                            </div>

                            <div className='totalamount'>
                                <h2>Total</h2>
                                <h3>{data.eventPrice * ticketQty}</h3>
                             
                            </div>
                                        {
                                            console.log(data._id)
                                        }
                            <button disabled={data.isSoldOut?true:data.isToBeDeleted?true:false} style={{cursor:"pointer", background:data.isSoldOut?"#a56f03":data.isToBeDeleted?"#a56f03":null}} className='booknow' onClick={()=>{

                            nav(`/api/tickets/${data._id}`)
                            }}>
                            {data.isSoldOut?"Sold Out":data.isToBeDeleted?"Under Review":"Book now"}
                            </button>
                    </div>
                    </div>
                    
                   <div className='BookMarkReport'>
                   {
                        !bookmarked?
                        <>
                            <button className='BookMarkEvents' onClick={()=>{ 
                                setNotification("")
                            axios.put(`https://creativents-on-boarding.onrender.com/api/users/bookmarks/${id}`, null, config).then(res=>{
                              console.log(res)
                              setBookmarked(true)
                              setNotification("Event BookMarked Succesfully")
                            })
                            .catch(err=>{
                              console.log(err);
                              if(err.code === "ERR_NETWORK"){
                                setNotification("Please check your Internet Connection")
                              }
                              else if(err.response.data.messsage === "Event is already bookmarked"){
                                setNotification("Event is already bookmarked")
                              }
                              else if(err.response.data.message === "jwt expired"){
                                    nav('/login')
                              }
                              else if(err.response.data.message === "jwt must be provided"){
                                setNotification("Please login to perform this action")

                              }
                              else{
                                setNotification(err.response.data.message)
                              }
                            })
                          }}
                          >BookMark</button>
                        </>
                           :
                           bookmarked?
                            <button onClick={()=>{ 
                                setNotification("")
                                axios.put(`https://creativents-on-boarding.onrender.com/api/users/unbookmarks/${id}`, null, config).then(res=>{
                                  console.log(res)
                                  setBookmarked(false)
                              setNotification("Event UnBookMarked Succesfully")
                                })
                                .catch(err=>{
                                    console.log(err);
                                    if(err.response.data.messsage === "Event is already bookmarked"){
                                        setNotification("Event is already bookmarked")
                                      }
                                      else if(err.response.data.message === "jwt expired"){
                                            nav('/login')
                                      }
                                      else if(err.response.data.message === "jwt must be provided"){
                                        setNotification("Please login to perform this action")
        
                                      }
                                      else if(err.message === "Network Error"){
                                        setNotification("Please check your Internet Connection")
                                      }
                                      else{
                                        setNotification(err.response.data.message)
                                      }
                                })
                            }}
                            className='BookMarkEvents'>UnBookMark</button>:null
                    }

                    <button onClick={()=>nav(`/api/report/${data._id}`)} className='Report_Btn'>Report this event</button>
                   </div>
                   <span style={{color:"white", fontSize:"13px", color:"red"}}>{notification}</span>

                   


                <section className='sectionthree'>
                <article  className='Host_ProfileReviewOverAll'>
                    <div className='Rating_Part'>
                        <div className='Total_Review'>
                            <h1>Total Review</h1>
                            <h1 style={{fontSize:"40px"}}>{data.reviews.length}</h1>
                        </div>
                        <div className='Seperate_Line'></div>
                        <div className='Average_Review' style={{gap:"5px"}}>
                        <h1>Average Rating</h1>
                        <div style={{width:"100%", display:"flex", gap:"30px", flexDirection:"column", alignItems:"center"}}>
                            {/* <h1 style={{fontSize:"40px"}}>{data.overallRating.toFixed(1)}</h1> */}
                            <div className='starBoy'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar style={{fontSize:"30px"}}
                        key={star}
                        className={star <= data.overallRating ? 'star_selected' : 'star'}
                        onClick={() => handleStarClick(star)}
                        />
                    ))}
                    </div>
                        </div>
                        </div>
                    </div>
                    <div className='HostPart_Part'>
                    {/* <h1 style={{width:"100%"}}>Host</h1> */}
                        <div className='HostImage'>
                            <div className='HostProfilePic'>
                            <img src={data.createdBy.profilePicture} alt="" />
                            </div>
                            <div></div>
                        </div>
                        <div className='Hostprofile'>
                            <div style={{display:"flex", flexDirection:"column",gap:"3px"}}>
                            <h4 style={{color:"whitesmoke"}}>Host</h4>
                            <h5>{data.createdBy.firstname} {data.createdBy.lastname}</h5>
                            <h5>{data.createdBy.email}</h5>
                            <h5>{data.createdBy.followers.length}{data.createdBy.followers.length > 1? "Followers": "Follower"}</h5>
                            {/* <h5>{data.createdBy.following.length}</h5> */}
                            </div>
                            <button className='ViewProf_Btn' onClick={()=>{
                                Dispatch(purchasedEventID(data._id))
                                nav(`/host/${data.createdBy._id}`)
                            }}>View Profile</button>
                        </div>
                    </div>
                </article>

                <article  className='Host_ProfileReviewOverAllMobile'>

                <div className='HostPart_Part'>
                    {/* <h1 style={{width:"100%"}}>Host</h1> */}
                        <div className='HostImage'>
                            <div className='HostProfilePic'>
                            <img src={data.createdBy.profilePicture} alt="" />
                            </div>
                            <div></div>
                        </div>
                        <div className='Hostprofile'>
                            <div style={{display:"flex", flexDirection:"column",gap:"3px"}}>
                            <h4 style={{color:"whitesmoke"}}>Host</h4>
                            <h5>{data.createdBy.firstname} {data.createdBy.lastname}</h5>
                            <h5>{data.createdBy.email}</h5>
                            <h5>{data.createdBy.followers.length} {data.createdBy.followers.length > 1? "Followers": "Follower"}</h5>
                            </div>
                            <button className='ViewProf_Btn' onClick={()=>{
                                Dispatch(purchasedEventID(data._id))
                                nav(`/host/${data.createdBy._id}`)
                            }}>View Profile</button>
                        </div>
                    </div>
                    <div className='Rating_Part'>
                        <div className='Total_Review'>
                            <h1>Total Review</h1>
                            <h1 style={{fontSize:"30px", fontWeight:"normal"}}>{data.reviews.length}</h1>
                        </div>
                        <div className='Seperate_Line'></div>
                        <div className='Average_Review' style={{gap:"5px"}}>
                        <h1>Average Rating</h1>
                        <div style={{width:"100%", display:"flex",  gap:"20px", flexDirection:"column", alignItems:"center"}}>
                            {/* <h1 style={{fontSize:"30px", fontWeight:"normal"}}>{data.overallRating.toFixed(1)}</h1> */}
                            <div className='starBoy'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar style={{fontSize:"20px"}}
                        key={star}
                        className={star <= data.overallRating ? 'star_selected' : 'star'}
                        onClick={() => handleStarClick(star)}
                        />
                    ))}
                    </div>
                        </div>
                        </div>
                    </div>
                
                </article>
                <div style={{height:"20vh"}} className='commentsectionrating'>
                    <h3>Reviews</h3>
                    <input type="message" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <span style={{color:"red", fontSize:"14px"}}>{error}</span>
                </div>
                <div style={{height:"12vh"}} className='submitratings'>
                <div className='starBoy'>
                    {userId === data.createdBy._id?
                    [1, 2, 3, 4, 5].map((star) => (
                        <FaStar style={{cursor:"pointer"}}
                        key={star}
                        // className={star <= ratings ? 'star_selected' : 'star'}
                        onClick={() => handleStarClick(star)}
                        />
                    ))
                    :[1, 2, 3, 4, 5].map((star) => (
                        <FaStar style={{cursor:"pointer"}}
                        key={star}
                        className={star <= ratings ? 'star_selected' : 'star'}
                        onClick={() => handleStarClick(star)}
                        />
                    ))}
                    </div>
                    
                    <button onClick={addReview} >Submit</button>
                </div>
                
                    {
                    !data?null:
                        data.reviews.map((e)=>(
    
    
                            <div className='Reviews_Submitted' key={e._Id}>
                        <div className='Review_Image'>
                            <div className='imageRev'>
                                <img src={e.userPicture} alt="" />
                            </div>
                            <div className='UserRev_Data'>
                                <h3>{e.attendeeName}</h3>
                                {/* <h4>Total Spend</h4> */}
                            </div>
                        </div>
                        <div className='Review_Comment'>
                            <div className='Rv_Stars'>
                            <div>
                            {
                            [1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} style={{display:userId === data.createdBy._id?"none":null}}
                            className={star <= e.rating ? 'star_selected' : 'star'}
                            />))}
                            </div>
                            <h5>{e.timestamp}</h5>
                            </div>
                            <div className='Rv_Comments'>
                                <h5>{e.reviewText}</h5>
                            </div>
                        </div>
                    </div>
                        ))
                    }
                
             </section>


      
                </div>
        </div>
        <div className="directiontodifferentpage">
            <div className="Homedirection">
                <AiFillHome className="directionmain"/>
                <h5>Home</h5>
            </div>

            <div className="Homedirection">
                <MdCreateNewFolder className="directionmain"/>
                <h5>Create</h5>
            </div>
            <div className="Homedirection">
                <BsFillCheckSquareFill className="directionmain"/>
                <h5>Save</h5>
            </div>
          </div>

         
    </div>
       }
        </>
    )
}

export default Checkout
