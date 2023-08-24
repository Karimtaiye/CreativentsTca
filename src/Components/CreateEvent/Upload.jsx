import React, { useRef, useState, useEffect } from "react"
import './Upload.css'
import './UploadMobile.css'
import axios from "axios"
import {AiOutlinePlus} from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { eventData } from "../Redux/State"
import LogoC from "../../assets/LogoC.png"
import { useNavigate } from "react-router-dom"
import { GiConfirmed } from 'react-icons/gi'
import { BiSolidError } from 'react-icons/bi'
import { SpinnerInfinity } from 'spinners-react'
import { AiFillHome } from 'react-icons/ai'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { MdCreateNewFolder } from 'react-icons/md'
function Upload() {
    const nav = useNavigate()
    const Dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState("")
    const [visible, setVisible] = useState(false)
    const inputRef =useRef(null);
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const userInitEventData = useSelector(state=>state.events.eventInfo)
    const upload = useRef(null);
    const [eventName, setEventName] =useState ("")
    const [eventDescription, setEventDescription] =useState ("")
    const [eventPrice, setEventPrice] =useState ("")
    const [eventLocation, setEventLocation] =useState ("")
    const [eventVenue, setEventVenue] =useState ("")
    const [availableTickets, setAvailableTickets] =useState (0)
    const [eventCategory, setEventCategory] =useState ("")
    const [eventDate, setEventDate] =useState ("")
    const [eventTime, setEventTime] =useState ("")
    const [eventImages, setEventImages] =useState ("")

    
    const [image, setImage] =useState ("")
    const [display, setDisplay] =useState(true)
    const [imagecreate, setImageUpload] = useState ("")

    
    const url = "https://creativents-on-boarding.onrender.com/api/events"

    const token = userOnLoggedIn.token
    const name = userOnLoggedIn.name
    const profile = userOnLoggedIn.profilePicture
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`
      },
    };

    // const handleImage = (event) => {
    //     const file = event.target.files[0];
    //     setProfile({ ...profile, schoolImage: file });
    // //   };

    const File = (e)=>{
        const files = e.target.files[0];
        setImageUpload(files)
        setEventImages(files);
       
    }
    
    const CreateEvent = (e) => {
        setLoading(true)
        e.preventDefault()
        setImageUpload(image)

        const formData = new FormData()
        formData.append("eventName", eventName)
        formData.append("eventDescription", eventDescription)
        formData.append("eventPrice", eventPrice)
        formData.append("eventLocation", eventLocation)
        formData.append("eventVenue", eventVenue)
        formData.append("availableTickets", availableTickets)
        formData.append("eventCategory", eventCategory)
        formData.append("eventDate", eventDate)
        formData.append("eventTime", eventTime)
        formData.append('eventImages', eventImages);

        axios.post(url, formData, config)
        .then(res=>{
            console.log(res.data.data)     
            setLoading(false)
            Dispatch(eventData(res.data.data)) 
            setVisible(true);

              setTimeout(() => {
                  setVisible(false);
                  nav('/homepage'); 
                }, 5000)
            if (res){
                console.log("response sent")
                setMsg("Event Created Successfully")
            }else{
                console.log('problems sending ')
            }
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
            setError(true)
            setVisible(true);
            setTimeout(() => {
            setVisible(false);
              }, 3000)
            if(err.message === "Network Error"){
                setMsg("Please check your Internet Connection")
            }
            else{
                
                setMsg("Error Creating Event")
              }
        })

    console.log(userInitEventData)

    }
    
    const removedisplay = ()=>{
        setDisplay(false)
    }

         const handleimageClick =()=>{
          inputRef.current.click();
         }
        
        const handleimageChange =(event)=>{
          const file =event.target.files[0];
          console.log(file);
         setImage(event.target.files[0]);
        }

        const handleimageCreate =()=>{
            upload.current.click();
        }

        // const handleimageCreateUpload =(event)=>{
        //     const set =event.target.files[0];
        //     console.log(set);
        //     setImageUpload(event.target.files[0])
        // }

   
        useEffect(() => {

          }, [nav]);

    return(
        <>
        <div className="CreateMain">
          <div className="createheader">
            <div className="imageee">
            <img src={LogoC} alt="" onClick={()=>nav('/homepage')}></img>
            </div>

            <div className="profile">
                {/* {image ?(
                    <div className="circle" ><img src={URL.createObjectURL(image)}alt="" style={{width: "100%", height: "100%", borderRadius: "40px"}}/></div>

                ):(
                    )
                }
            */}
                <h2 style={{marginRight:"5px"}}>{name}</h2>
            <div className="circleimage">
                <img src={profile} alt="" />
                
            </div>
            </div>
          </div>

          <div className='eventname'>

            <div className="eventnameinput">
                <h4>Event Name</h4>
                <input type="text" value={eventName} onChange={(e)=>{setEventName(e.target.value)}}/>
            </div>

            <div className="eventdiscription">
                <h4>Event Description</h4>
                <input type="text" value={eventDescription} onChange={(e)=>{setEventDescription(e.target.value)}}/>
            </div> 

          </div>


          <div className="timedate">
            <div className="datetimecategory">

                <div className="holdersone">
                    <h4>Date</h4>
                    <input type="date" value={eventDate} onChange={(e)=>{setEventDate(e.target.value)}}/>
                </div>

                <div className="holderstwo">
                <h4>Available Tickets</h4>
                <input type="number" id="quantity" name="quantity" 
                value={availableTickets} onChange={(e)=>{setAvailableTickets(e.target.value)}}
                ></input>
                </div>
                
                <div className="holdersthree">
                <h4>Time</h4>
                <input type="time" value={eventTime} onChange={(e)=>{setEventTime(e.target.value)}}/>
                </div>
            </div>

            <div className="Venuecategory">

            <div className="holdersfour">
                <h4>Venue</h4>
                <input type="text" value={eventVenue} onChange={(e)=>{setEventVenue(e.target.value)}}/>
            </div>

            <div className="holdersfive">
                <h4>Category</h4>
                <select name="cars" id="cars" value={eventCategory} onChange={(e)=>{setEventCategory(e.target.value)}}>
                <option>Select</option>
                <option value="Music Event">Music Event</option>
                <option value="Festival Event">Festival Event</option>
                <option value="Sport Event">Sport Event</option>
                <option value="Wedding Event">Wedding Event</option>
                </select>
            </div>

            <div className="holderssix">
                <h4>Price</h4>
                <input type="price" value={eventPrice} onChange={(e)=>{setEventPrice(e.target.value)}}/>
            </div>
            </div>
          </div>

          <div className="imageUpload" >
            {
                imagecreate ?(      
               <div className="putimage">
                <img src={URL.createObjectURL(imagecreate)} alt="" style={{width: "100%", height: "100%" ,borderRadius: "10px"}}/>
                {display && (
                    <AiOutlinePlus onClick={removedisplay}/>
                )}
               
              </div>
                ):(    
                    <div className="putimage">
                     <AiOutlinePlus onClick={removedisplay}/>
                     </div>
                )
            }
         <label onClick={handleimageCreate} htmlFor="upload"></label>
         <input id="upload" type="file" ref={upload} multiple onChange={File} style={{display:"none"}} />
          </div>
          <div className="holderseight">
          <h4>Location</h4>
          <input type="text" value={eventLocation} onChange={(e)=>{setEventLocation(e.target.value)}}/>
          </div>
          
          <div className="createpart">
          <button className="create" disabled={loading} onClick={CreateEvent}>{
            loading? <SpinnerInfinity size={80} thickness={100} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0.44)" />:
            "Create"
          }</button>
         
          </div>

          {
            visible ?
            <div className="Update_PopUpMsg">
            <h2>{msg}</h2>
           {
             error?<BiSolidError style={{fontSize:"100px", color:"red"}}/> :         
             <GiConfirmed style={{fontSize:"100px", color:"green"}}/> 
           }
            {/* <button className="Canceled_Btn" onClick={()=>nav('/homepage')}>Go Back</button> */}
        </div>:null  
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
        </div>
        {/* <Category image={imagecreate} /> */}
        </>
    )
}

export default Upload

