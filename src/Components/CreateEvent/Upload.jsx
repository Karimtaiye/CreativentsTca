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
import { promoteEvent } from "../Redux/State"
import { promoteEventID } from "../Redux/State"


function Upload() {
    const nav = useNavigate()
    const Dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState("")
    const [visible, setVisible] = useState(false)
    const inputRef =useRef(null);
    const [promote, setPromote] = useState(false)
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
    const [empty, setEmpty] = useState(false)
    const [image, setImage] =useState ("")
    const [display, setDisplay] =useState(true)
    const [imagecreate, setImageUpload] = useState ("")
    const [activate, setActivate] = useState(true)

    const states = [
        " States",
        "Adamawa State",
        "Bauchi State",
        "Benue State",
        "Borno State",
        "Gombe State",
        "Jigawa State",
        "Kaduna State",
        "Kano State",
        "Katsina State",
        "Kebbi State",
        "Kogi State",
        "Kwara State",
        "Nasarawa State",
        "Niger State",
        "Plateau State",
        "Sokoto State",
        "Taraba State",
        "Yobe State",
        "Zamfara State",
        "Ekiti State",
        "Lagos State",
        "Ogun State",
        "Ondo State",
        "Osun State",
        "Oyo State",
        "Edo State",
        "Delta State",
        "Abia State",,
        "Anambra State",
        "Akwa Ibom State",
        "Bayelsa State",
        "Cross River State",
        "Ebonyi State",
        "Enugu State",
        "Imo State",
        "Rivers State",
    ]
    const pattern = /^[0-9]+$/
    const sortedStates =states.sort()

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
    useEffect(()=>{
        if(eventName === "") {
            setEmpty(true)
        }
        else if(eventCategory === "") {
            setEmpty(true)
        }
        else if(eventDate === "") {
            setEmpty(true)
        }
        else if(eventDescription === "") {
            setEmpty(true)
        }
        else if(eventTime === "") {
            setEmpty(true)
        }
        else if(eventVenue === "") {
            setEmpty(true)
        }
        else if(eventLocation === "") {
            setEmpty(true)
        }
        else if(availableTickets === 0) {
            setEmpty(true)
        }
        else if(eventPrice === null) {
            setEmpty(true)
        }
        else if(!pattern.test(eventPrice)) {
            setMsg("Event price must be a number")
        }
        else {
            setEmpty(false)
        }
    },[eventName, eventPrice, availableTickets, eventLocation, eventVenue, eventTime, eventDescription, eventDate, eventCategory])

    const File = (e)=>{
        const files = e.target.files[0];
        setImageUpload(files)
        setEventImages(files);
       
    }
    
    const CreateEvent = (e) => {
        setLoading(true)
        e.preventDefault()
        // setImageUpload(files)

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
            Dispatch(eventData(res.data.data)) 
            setLoading(false)
            setVisible(true);
            setError(false)
            Dispatch(promoteEventID(res.data.data._id))
            console.log(res.data.data._id)
            Dispatch(promoteEvent(activate))
            console.log(activate);
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
            else if(err.response.data.error === "Cannot read property 'secure_url' of null"){
                setMsg("Please Select Image for Upload")
            }
            else if(err.response.data.error === `event validation failed: availableTickets: Path ${availableTickets} (${availableTickets}) is less than minimum allowed value (0).`){
                setMsg("hehe")
            }
            else{
                
                setMsg("Error Creating Event")
              }
              
        })

    console.log(userInitEventData)

    }
    
    const removedisplay = ()=>{
        setDisplay(true)
    }

        //  const handleimageClick =()=>{
        //   inputRef.current.click();
        //  }
        
        // const handleimageChange =(event)=>{
        //   const file =event.target.files[0];
        //   console.log(file);
        //  setImage(event.target.files[0]);
        // }

        const handleimageCreate =()=>{
            upload.current.click();
        }

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
                <input type="number"  id="quantity" name="quantity" 
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
                <option value="Fashion Exhibition">Fashion Exhibition</option>
                <option value="Tech Exhibition">Tech Exhibition</option>
                <option value="Health Event">Health Event</option>
                <option value="Education">Education</option>
                <option value="Leisure">Leisure</option>
                <option value="Others">Others</option>
                </select>
            </div>

            <div className="holderssix">
                <h4>Price</h4>
                <input type="number" min="0" value={eventPrice} onChange={(e)=>{setEventPrice(e.target.value)}}/>
            </div>
            </div>
          </div>

          <div className="imageUpload" >
            {
                imagecreate ?(      
               <div className="putimage">
                <img src={URL.createObjectURL(imagecreate)} alt="" style={{maxWidth: "100%", height: "auto  " ,borderRadius: "10px"}}/>
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
         <input id="upload" type="file" ref={upload} accept="image/*" onChange={File} style={{display:"none"}} />
          </div>
          <div className="holderseight">
          <h4>Location</h4>
          <select type="text" value={eventLocation} onChange={(e)=>{setEventLocation(e.target.value)}} >

            {
                sortedStates.map((e)=>(
                    <option value={e}>{e}</option>
                ))
               
            }

          </select>
          </div>
          
          <div className="createpart">
          <button style={{background:empty?"#865d0b":null}} className="create" disabled={loading?true:empty?true:null} onClick={CreateEvent}>{
            loading? <SpinnerInfinity style={{animation:"slideInUp",animationDuration:"0.8s"}} size={80} thickness={100} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0.44)" />:
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

