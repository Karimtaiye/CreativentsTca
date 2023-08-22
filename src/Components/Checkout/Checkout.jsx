// import './Checkout.css'
// import './CheckoutMobile.css'
// import{CiLocationOn} from 'react-icons/ci'
// import{BiTimeFive} from 'react-icons/bi'
// import{BsCalendarDate} from 'react-icons/bs'
// import LogoC from "../../assets/LogoC.png"
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { eventData, checkoutTicketQty, checkoutTicketPrice } from '../Redux/State'
// import { useDispatch, useSelector } from 'react-redux'


// const Checkout = () =>{
// //     const Dispatch = useDispatch()
// //     const nav = useNavigate()
// //     const [ticketQty, setTicketQty] = useState(1)
// //     // const [checOutConfirmation, setChecOutConfirmation] = useState(false)
// //     const eventDetails = useSelector(state=>state.events.eventInfo)
// //     const [data, setData] = useState()
// //     const { id } = useParams()
// //     // console.log(id);
// //     const url = `https://creativents-on-boarding.onrender.com/api/events/${id}`
// //     useEffect(()=>{
// //     axios.get(url)
// //     .then(res=>{
// //         console.log(res.data.data);
// //         setData(res.data.data)
// //         Dispatch(eventData(res.data.data))
// //     })
// //     .catch(err=>{
// //         console.log(err)
// //     })
// //    },[])
// // //    console.log(data);
// // //    console.log(eventDetails);

// //     return(
// //         <>
// //         {
// //             !data? <h1 style={{color:"white", display:"flex", alignSelf:"center", justifySelf:"center"}}>Loading</h1>:
// //             <div className="checkoutcontainer">

// //             <div className="checkoutholder">

// //                 <div className="checkoutlogo">
// //                 <div className="checkoutimage">
// //                 <img src={LogoC} alt=""/>
// //                 <h2>reactivent</h2>
// //                 </div>
// //                 </div>

// //                 <div className='checkouteventimage'>
// //                     <div className='imagecheckout'>
                    
// //                         <img src={data.eventImages} alt="" />  {/* <div className='commentsection'>
// //                             <div className='todolistcomment'>
// //                                 <div className='userprofile'></div>
// //                                 <input className='comment' type="text" />
// //                                 <button className='send'>Send</button>
// //                             </div>
// //                             <div className='dropdown'></div>
// //                         </div> */}
// //                     </div>
              
// //                 </div>
                    
// //                     {/* <p>data.eventName</p> */}
// //                     <p>{data.eventName}</p>
// //                     <div className="checkouteventdetails">
// //                         <div className='checkoutvenue'>
// //                             <div className='checkoutdetails'>
// //                                 <BsCalendarDate/>
// //                                 <p>Friday, 11 August</p>
// //                             </div>
// //                             <div className='checkoutdetails'>
// //                                 <BiTimeFive/>
// //                                 <p>11:00 AM</p>
// //                             </div>
// //                             <div className='checkoutdetails'>
// //                                 <CiLocationOn/>
// //                                 <p>153 muyibi Street Olodi Apapa</p>
// //                             </div>
// //                         </div>
// //                         <div className='checkoutticket'>
// //                             <h2>Ticket Details</h2>

// //                             <div className='allticket'>
// //                                 <h2>Ticket Quantity</h2>
// //                                 <div className='chooseticket'>
// //                                     <button className='buttonticket'>+</button>

// //                                         <select onChange={(e)=>{
// //                                             setTicketQty(e.target.value)
// //                                             Dispatch(checkoutTicketQty(e.target.value))

// //                                             }}>
// //                                         <option value="">1</option>
// //                                         <option value="2">2</option>
// //                                         <option value="3">3</option>
// //                                         <option value="4">4</option>
// //                                         </select>

// //                                     <button className='buttonticket'>-</button>
// //                                     {
// //                                         // Dispatch(checkoutTicketPrice(data.eventPrice * ticketQty))
// //                                     }
// //                                     <h3>{data.eventPrice * ticketQty}</h3>
// //                                     {/* <h3>{data.eventPrice}</h3>
// //                                     <h3>{data.eventPrice * ticketQty}</h3> */}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className="checkoutdescription-checkout">
// //                         <div className="checkoutdescription">
// //                             <h1>Description</h1>
// //                             <p>The Hackathon Farewell Day is a fun and collaborative event where all members of the software program come together for a final hurrah. It's an opportunity to look back at the milestones we’ ve achieved, the challenges we overcame, and the memories we created during the program's lifetime.</p>
// //                         </div>

// //                         <button className='booknow' onClick={()=>{
// //                             // setChecOutConfirmation(true)
// //                             nav(`/api/tickets/${data._id}`)
// //                         }}>Book now</button>

// //                     </div>
// //             </div>
// //             {/* {
// //                 checOutConfirmation? */}
// //                 {/* <ConfirmCheckOut />
// //                 :null
// //             } */}
// //         </div>
// //         }
// //         </>

//     )
// }

// export default Checkout
import './Checkout.css'
import './CheckoutMobile.css'
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

const Checkout = () =>{
    const Dispatch = useDispatch()
    const nav = useNavigate()
    const [data, setData] = useState()
    const [msg, setMsg] = useState("Loading, Please wait...")
    const ticketPrice = useSelector((state)=>state.events.ticketPrice)
    const { id } = useParams()
    const [ticketQty, setTicketQty] = useState(1)
    const [ticketQtyy, setTicketQtyy] = useState(1)


    const url = `https://creativents-on-boarding.onrender.com/api/events/${id}`
    useEffect(()=>{
        axios.get(url)
        .then(res=>{
            console.log(res.data.data);
            Dispatch(eventData(res.data.data))
            setData(res.data.data)
            setTicketQtyy(res.data.data.availableTickets)

        })
        .catch(err=>{
            console.log(err)
            if(err.message === "Network Error"){
                setMsg("Unable to connect to the Internet")
            }
            else{
                
                setMsg("Error Creating Event")
              }
        })
    },[])
    // const price = data.eventPrice
    // Dispatch(checkoutTicketPrice(price))
   console.log(ticketPrice);
   console.log(ticketQtyy);
   const options = [];
   for (let i = 1; i <= ticketQtyy; i++) {
     options.push(<option key={i} value={i}>{i}</option>);
   }
  

    return(
        <>
       {
        !data? <div style={{width:"100%",
            height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <h1 style={{
            fontSize:"26px", color:"white", textAlign:"center"
        }}>{msg}</h1>
        <SpinnerDotted size={200} thickness={50} speed={100} color="#ffffff" />
        </div> :
        <div className="checkoutcontainer">

        <div className="checkoutholder">

            <div className="checkoutlogo">
            <div className="checkoutimage">
            <img src={LogoC} onClick={()=>nav('/homepage')} alt=""/>
            <h2>reactivent</h2>
            </div>
            </div>

            <div className='checkouteventimage'>
                <div className='imagecheckout'>
                    <img src={data.eventImages} alt="" />
                </div>
            {/* <div className='commentsection'> */}
                        {/* <div className='todolistcomment'>
                            <div className='userprofile'></div>
                            <input className='comment' type="text" />
                            <button className='send'>Send</button>
                        </div> */}
                        {/* <div className='dropdown'></div> */}
                    {/* </div> */}
            </div>
                
                {/* <p>{data.eventName}</p> */}
                <p>{data.eventName}</p>
                <div className="checkouteventdetails">
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
                                {/* <button className='buttonticket'>+</button> */}
                                <select onChange={(e)=>{
                                            setTicketQty(e.target.value)
                                            Dispatch(checkoutTicketQty(e.target.value))

                                            }}>
                                        {
                                            !data?<option value="1">1</option>:options  
                                        }
                                        {/* <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option> */}
                                        </select>
                                {/* <button className='buttonticket' onClick={decrementQuantity}>-</button> */}
                            </div>
                        </div>

                        <div className='quantity'>
                                <h2>Price</h2>
                                <h3>{data.eventPrice}</h3>
                            </div>

                            <div className='totalamount'>
                                <h2>Total</h2>
                                <h3>{data.eventPrice * ticketQty}</h3>
                                {/* {
                                    Dispatch(checkoutTicketPrice(data.eventPrice * ticketQty))
                                } */}
                            </div>
                    </div>
                </div>

                <div className="checkoutdescription-checkout">
                    <div className="checkoutdescription">
                        <h1>Description</h1>
                        <p>{data.eventDescription}.</p>
                    </div>

                   

                    <button className='booknow' onClick={()=>{
                            // setChecOutConfirmation(true)
                            nav(`/api/tickets/${data._id}`)
                            }}>
                                 {data.isSoldOut?"Sold Out":"Book now"}
                                </button>

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