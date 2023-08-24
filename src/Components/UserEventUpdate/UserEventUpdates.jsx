
import { useRef, useState, useEffect } from "react"
import './UserEventUpdating.css'
import './UserEventUpdatingResponsive.css'
import axios from "axios"
import {AiOutlinePlus} from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import LogoC from "../../assets/LogoC.png"
import { eventData } from "../Redux/State"
import { useParams, useNavigate } from "react-router-dom"
import { GiConfirmed } from 'react-icons/gi'
import { BiSolidError } from 'react-icons/bi'
import { SpinnerInfinity } from 'spinners-react'



import React from 'react'

export default function UserEventUpdates() {




    const nav = useNavigate()
    const [visible, setVisible] = useState(false)
    const { eventID } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState("")
    const Dispatch = useDispatch()
    const inputRef =useRef(null);
    const userInitEventData = useSelector(state=>state.events.eventInfo)
    const initialData = userInitEventData.filter((e)=>e._id === eventID)
    console.log(initialData);
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const upload = useRef(null);
    const [eventName, setEventName] = useState (initialData[0].eventName)
    const [eventDescription, setEventDescription] = useState (initialData[0].eventDescription)
    const [eventPrice, setEventPrice] = useState (initialData[0].eventPrice)
    const [eventLocation, setEventLocation] = useState (initialData[0].eventLocation)
    const [eventVenue, setEventVenue] = useState (initialData[0].eventVenue)
    const [availableTickets, setAvailableTickets] = useState (initialData[0].availableTickets)
    const [eventCategory, setEventCategory] = useState (initialData[0].eventCategory)
    const [eventDate, setEventDate] = useState (initialData[0].eventDate)
    const [eventTime, setEventTime] = useState (initialData[0].eventTime)
    const [eventImages, setEventImages] = useState ("")
    const [image, setImage] = useState ("")
    const [display, setDisplay] = useState(true)
    const [imagecreate, setImageUpload] = useState ("")

    
    const url = `https://creativents-on-boarding.onrender.com/api/update/${eventID}`

    const token = userOnLoggedIn.token
    const name = userOnLoggedIn.name
    const profile = userOnLoggedIn.profilePicture
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    };

    const File = (e)=>{
        const files = e.target.files[0];
        setImageUpload(files)
        setEventImages(files); 
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
    const removedisplay = ()=>{
    setDisplay(false)
    }

    const states = [
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
  
  const sortedStates =states.sort()
    
    // const data = {eventName, eventDescription,eventPrice, eventLocation, eventVenue, eventCategory, availableTickets, eventDate, eventTime, eventImages}
    const UpdateEvent = (e) => {
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
        setLoading(true)
        e.preventDefault()
        // setImageUpload(image)


        // console.log(data);
        axios.put(url, formData, config)
        .then(res=>{
            console.log(res) 
            console.log(eventImages);
            setLoading(false)
            Dispatch(eventData([res.data.data])) 
            setVisible(true) 
            setTimeout(() => {
                setVisible(false);
                nav('/homepage'); 
              }, 5000)    
              if (res){
                console.log("response sent")
                setMsg("Event Updated Successfully")
            }else{
                console.log('problems sending ')
            }
        })
        .catch(err=>{
            console.log(err);
            console.log(eventImages);
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
                setMsg("Please Upload Image for update")
            }
            else{
                
                setMsg("Error Updating Event")
              }
        })

        
    }
    console.log(userInitEventData)
    
    useEffect(() => {

    }, [nav]);

  return (
            <>
        <form onSubmit={UpdateEvent} className="CreateMain">
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
                <input type="price" value={eventPrice} onChange={(e)=>{setEventPrice(e.target.value)}}/>
            </div>
            </div>
          </div>

          <div className="imageUpload" onClick={handleimageCreate}>
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
         <label  htmlFor="upload"></label>
         <input id="upload" type="file" ref={upload} multiple onChange={File} style={{display:"none"}} />
          </div>
          <div className="holderseight">
          <h4>Location</h4>
          <select type="text" value={eventLocation} onChange={(e)=>{setEventLocation(e.target.value)}}>
          {
                sortedStates.map((e)=>(
                    <option value={e}>{e}</option>
                ))
               
            }
          </select>
          </div>
          
          <div className="createpart">
          <button style={{background:loading?"rgb(187, 130, 16)":null}} className="create" disabled={loading} type="submit">{
            loading? "Updating":
            "Update"
          }</button>
         
          </div>

          {
            visible ?
           <div className="Pop_UpParent">
             <div className="Update_PopUpMsg">
            <h2>{msg}</h2>
           {
             error?<BiSolidError style={{fontSize:"100px", color:"red"}}/> :         
             <GiConfirmed style={{fontSize:"100px", color:"green"}}/> 
           }
            {/* <button className="Canceled_Btn" onClick={()=>nav('/homepage')}>Go Back</button> */}
        </div>
           </div>
            :null 
          }
        </form>
        {/* <Category image={imagecreate} /> */}
        </>
  )
}











// function UserEventUpdating() {
//     const nav = useNavigate()
//     const [visible, setVisible] = useState(false)
//     const { eventID } = useParams()
//     const Dispatch = useDispatch()
//     const inputRef =useRef(null);
//     const userInitEventData = useSelector(state=>state.events.eventInfo)
//     const userOnLoggedIn = useSelector(state=>state.events.user)
//     const upload = useRef(null);
//     const [eventName, setEventName] = useState ("")
//     const [eventDescription, setEventDescription] = useState ("")
//     const [eventPrice, setEventPrice] = useState ("")
//     const [eventLocation, setEventLocation] = useState ("")
//     const [eventVenue, setEventVenue] = useState ("")
//     const [availableTickets, setAvailableTickets] = useState (0)
//     const [eventCategory, setEventCategory] = useState ("")
//     const [eventDate, setEventDate] = useState ("")
//     const [eventTime, setEventTime] = useState ("")
//     const [eventImages, setEventImages] = useState ([])
//     const [image, setImage] = useState ("")
//     const [display, setDisplay] = useState(true)
//     const [imagecreate, setImageUpload] = useState ("")

    
//     const url = `https://creativents-on-boarding.onrender.com/api/update/${eventID}`

//     const token = userOnLoggedIn.token
//     const config = {
//       headers: {
//         // 'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`
//       },
//     };

//     const File = (e)=>{
//         const files = e.target.files[0];
//         setEventImages(files);
//     }
//     const handleCreateButtonClick = (e) => {
        // e.preventDefault()
        // setImageUpload(image)

        // const formData = new FormData()
        // formData.append("eventName", eventName)
        // formData.append("eventDescription", eventDescription)
        // formData.append("eventPrice", eventPrice)
        // formData.append("eventLocation", eventLocation)
        // formData.append("eventVenue", eventVenue)
        // formData.append("availableTickets", availableTickets)
        // formData.append("eventCategory", eventCategory)
        // formData.append("eventDate", eventDate)
        // formData.append("eventTime", eventTime)
        // formData.append('eventImages', eventImages);
        // // formData.append('eventImages', eventImages);
        // const data = {eventName, eventDescription,eventPrice, eventLocation, eventVenue, eventCategory, availableTickets, eventDate, eventTime, eventImages}

        // axios.put(url, data, config)
//         .then(res=>{
//             console.log(res) 
//             Dispatch(eventData(res.data.data)) 
//             setVisible(true)     
//             if (res){
//                 console.log("response sent")
//             }else{
//                 console.log('problems sending ')
//             }
//         })
//         .catch(err=>{
//             console.log(err);
//         })

//         console.log(userInitEventData)

    

//         const handleimageClick =()=>{
//           inputRef.current.click();
//          }
        
//         const handleimageChange =(event)=>{
//           const file =event.target.files[0];
//           console.log(file);
//          setImage(event.target.files[0]);
//         }


//         const handleimageCreate =()=>{
//             upload.current.click();
//         }

//         useEffect(() => {
//             const timer = setTimeout(() => {
//               setVisible(true);
//               nav(`/api/getUserWithLinks/${id}`); 
//             }, 3000)
        
//             return () => clearTimeout(timer);
//           }, [nav]);
    

//     return(
//         <>
//         <div className="CreateMain">
//           <div className="createheader">
//             <div className="image4">
//             <img src={LogoC} alt=""></img>
//             <h1>reaivent</h1>
//             </div>

//             <div className="profile" onClick={handleimageClick}>
//                 {image ?(
//                     <div className="circle" ><img src={URL.createObjectURL(image)}alt="" style={{width: "100%", height: "100%", borderRadius: "40px"}}/></div>

//                 ):(
//                     <div className="circle"></div>
//                 )
//             }
                
//                 <h1>mary</h1>
//                 <input type="file" ref={inputRef} onChange={handleimageChange} style={{display:"none"}}/>
//             </div>
//           </div>

//           <form onSubmit={handleCreateButtonClick}>
//                     <div className='eventname'>

//             <div className="eventnameinput">
//                 <h4>Event Name</h4>
//                 <input type="text" value={eventName} onChange={(e)=>{setEventName(e.target.value)}}/>
//             </div>

//             <div className="eventdiscription">
//                 <h4>Event Description</h4>
//                 <input type="text" value={eventDescription} onChange={(e)=>{setEventDescription(e.target.value)}}/>
//             </div> 

//             </div>


//             <div className="timedate">
//             <div className="datetimecategory">

//                 <div className="holdersone">
//                     <h4>Date</h4>
//                     <input type="date" value={eventDate} onChange={(e)=>{setEventDate(e.target.value)}}/>
//                 </div>

//                 <div className="holderstwo">
//                 <h4>Available Tickets</h4>
//                 <input type="number" id="quantity" name="quantity" min="1" max="5" 
//                 value={availableTickets} onChange={(e)=>{setAvailableTickets(e.target.value)}}
//                 ></input>
//                 </div>
                
//                 <div className="holdersthree">
//                 <h4>Time</h4>
//                 <input type="time" value={eventTime} onChange={(e)=>{setEventTime(e.target.value)}}/>
//                 </div>
//             </div>

//             <div className="Venuecategory">

//             <div className="holdersfour">
//                 <h4>Venue</h4>
//                 <input type="text" value={eventVenue} onChange={(e)=>{setEventVenue(e.target.value)}}/>
//             </div>

//             <div className="holdersfive">
//                 <h4>Category</h4>
//                 <select name="cars" id="cars" value={eventCategory} onChange={(e)=>{setEventCategory(e.target.value)}}>
//                 <option value="Select">Select</option>
//                 <option value="Music Event">Music Event</option>
//                 <option value="Festival Event">Festival Event</option>
//                 <option value="Sport Event">Sport Event</option>
//                 <option value="Wedding Event">Wedding Event</option>
//                 </select>
//             </div>

//             <div className="holderssix">
//                 <h4>Price</h4>
//                 <input type="price" value={eventPrice} onChange={(e)=>{setEventPrice(e.target.value)}}/>
//             </div>
//             </div>
//             </div>

//             <div className="imageUpload" onClick={handleimageCreate}>
//             {
//                 imagecreate ?(      
//             <div className="putimage">
//                 <img src={URL.createObjectURL(imagecreate)} alt="" style={{width: "100%", height: "100%" ,borderRadius: "10px"}}/>
//                 {display && (
//                     <AiOutlinePlus onClick={removedisplay}/>
//                 )}
            
//             </div>
//                 ):(    
//                     <div className="putimage">
//                     <AiOutlinePlus onClick={removedisplay}/>
//                     </div>
//                 )
//             }

//             <input type="file" ref={upload}  multiple onChange={File} style={{display:"none"}} />
//             </div>
//             <h5>Location</h5>
//             <input type="text" value={eventLocation} onChange={(e)=>{setEventLocation(e.target.value)}}/>
//             <div className="createpart">
//             <button className="create" type="submit">Create</button>
//             </div>
//           </form>
//           {
//             visible ?
//             <div className="Update_PopUpMsg">
//             <h2>Event Updated Successfully</h2>
//             <button className="Canceled_Btn" onClick={()=>nav(`/api/getUserWithLinks/${id}`)}>Go Back</button>
//         </div>:null 
//           }
//         </div>
//         {/* <Category image={imagecreate} /> */}
//         </>
//     )
// }
// }
// export default UserEventUpdating