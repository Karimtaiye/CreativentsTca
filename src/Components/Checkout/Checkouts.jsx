

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
import {AiFillStar, AiFillDislike, AiFillLike} from 'react-icons/ai'
import Todo from '../CreateEvent/RateTodo'
import { FaStar } from 'react-icons/fa';
import { MdNetworkCheck } from 'react-icons/md'


const Checkouts = () =>{
    const Dispatch = useDispatch()
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const nav = useNavigate()
    const [data, setData] = useState()
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("Loading, Please wait...")
    const ticketPrice = useSelector((state)=>state.events.ticketPrice)
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
    axios.post(`https://creativents-on-boarding.onrender.com/api/events/${id}/review`, reviewData ,config)
      .then(res => {
        console.log(res);
        setInput("")
        // setreview(res.data)
    })
    .catch(err => {
        console.log('Error fetching data:', err);
        setError(err.response.data.message)
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
            else{
                
                setMsg("Error Creating Event")
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
        !data ? <div style={{width:"100%",
            height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <h1 style={{
            fontSize:"26px", color:"white", textAlign:"center"
        }}>{msg}</h1>
        {
            network?<MdNetworkCheck className='Network_Icon' />:<SpinnerDotted size={200} thickness={50} speed={100} color="#ffffff" />
        }
        </div> :
        <div className="checkoutcontainer">

        <div className="checkoutholder">

            <div className="checkoutlogo">
            <div className="checkoutimage">
            <img src={LogoC} onClick={()=>nav('/homepage')} alt=""/>

            </div>
            </div>

            <div className='checkouteventimage'>
                <div className='imagecheckout'>
                    <img src={data.eventImages} alt="" />
                </div>
 
            </div>
                
                <p>{data.eventName}</p>
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

                            <button disabled={data.isSoldOut?true:false} style={{cursor:"pointer", background:data.isSoldOut?"#a56f03":null}} className='booknow' onClick={()=>{

                            nav(`/api/tickets/${data._id}`)
                            }}>
                            {data.isSoldOut?"Sold Out":"Book now"}
                            </button>
                    </div>
                    </div>
                    
                   <div className='BookMarkReport'>
                   {
                        !bookmarked?
                        <button className='BookMarkEvents' onClick={()=>{ 
                            axios.put(`https://creativents-on-boarding.onrender.com/api/users/bookmarks/${id}`, null, config).then(res=>{
                              console.log(res)
                              setBookmarked(true)
                            })
                            .catch(err=>{
                              console.log(err);
                            })
                          }}
                           >BookMark</button>:
                            bookmarked?
                            <button onClick={()=>{ 
                                axios.put(`https://creativents-on-boarding.onrender.com/api/users/unbookmarks/${id}`, null, config).then(res=>{
                                  console.log(res)
                                  setBookmarked(false)
                                })
                                .catch(err=>{
                                  console.log(err);
                                })
                              }}
                              className='BookMarkEvents'>UnBookMark</button>:null
                    }

                    <button onClick={()=>nav(`/api/report/${data._id}`)} className='Report_Btn'>Report this event</button>
                   </div>

                    <div className="checkoutdescription-checkout">
                    <div className="checkoutdescription">
                        <h1>Description</h1>
                        <p>{data.eventDescription}.</p>
                    </div>
                    
                    <section className='sectionthree'>
                <div className='commentsectionrating'>
                    <h3>Comment</h3>
                    <input type="message" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <span>{error}</span>
                </div>
                <div className='submitratings'>
                <div className='starBoy'>
                    {[1, 2, 3, 4, 5].map((star) => (
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
                                <h4>Total Spend</h4>
                            </div>
                        </div>
                        <div className='Review_Comment'>
                            <div className='Rv_Stars'>
                            <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star}
                            className={star <= ratings ? 'star_selected' : 'star'}
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

export default Checkouts
