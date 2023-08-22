// import {AiOutlineArrowDown} from 'react-icons/ai'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// // import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// function Category (){
//     const nav = useNavigate()
//     const [uploadedEvent, setUploadEvent] = useState([])
//     // const { image } = useImage();
//     const [imageRoll, setImageRoll] = useState(0)

//     const url = "https://creativents-on-boarding.onrender.com/api/events"
//     axios.get(url)
//     .then(res=>{
//         // console.log(res.data.data);
//         setUploadEvent(res.data.data)
//     })
//     .catch(err=>{
//         console.log(err)
//     })

//     const getEvent = () => {
        
//     }
//     // useEffect(()=>{
//     //     setInterval(() => {
//     //         setImageRoll(prev=>prev + 1) 
//     //      }, 500);
//     // }, [])
    
//     return(
//         <div className="our-category">

//            <div className="category-div">
//             <h2>Find your interest</h2>
//             <AiOutlineArrowDown className='arrow-down'/>
//             </div>
//            <div className='holder2'>
//             <div className='inner-holder2'>
            
//             <div className="category-containers">           

//                 {
//                     uploadedEvent.map((e)=>(
//                         <div className="main-category" key={e._id} onClick={()=>{
//                             nav(`/events/${e._id}`)
//                         }}>
//                     <div className="category-image" onClick={()=>setImageRoll(prev=>prev + 1)}>
//                         <img src={e.eventImages[imageRoll % e.eventImages.length]} alt="" />
//                     </div>
//                     <div className="category-discription">
//                         <p>{e.eventCategory}</p>
//                     </div>
//                     </div>
//                     ))
//                 }

//             </div>
//             </div>
//            </div>
            
           

//         </div>
//     )
// }

// export default Category

import {AiOutlineArrowDown} from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
// import {AiOutlineArrowDown} from 'react-icons/ai';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {CiMenuKebab} from 'react-icons/ci';
// import { ToastContainer, toast } from 'react-toastify';
// import 'c/dist/ReactToastify.css';
import {CiCalendarDate} from 'react-icons/ci'
import {BiMoney} from 'react-icons/bi'

function Category (){
    const nav = useNavigate()
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
    
       useEffect(()=>{
        eventUploaded()
       },[])
    // const [liked, setLiked] = useState (false)
    // const handleLiked = () =>{
    //     setLiked(!liked);
    //     if (!liked) {
    //         toast.success('You have liked this post!', {
    //           position: 'top-right',
    //           autoClose: 3000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: false,
    //           draggable: true,
    //           progress: undefined,
    //         })
    //       }
    // }
    return(
        <div>
        <div className="our-category">

           <div className="category-div">
            <h2>Find your interest</h2>
            <AiOutlineArrowDown className='arrow-down'/>
            </div>
           <div className='holder2'>
            <div className='inner-holder2'>
            
            <div className="category-containers">           

                
           {
            uploadedEvent.length === 0?
            <>
                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        <BsFillSuitHeartFill/>
                        </div>
                        <div className='love2'>
                        <CiMenuKebab/>
                        </div>
                    </div>
                    <div className="category-discription"></div>
                </div>

                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        <BsFillSuitHeartFill/>
                        </div>
                        <div className='love2'>
                        <CiMenuKebab/>
                        </div>
                    </div>
                    <div className="category-discription">
                       
                    </div>
                </div>

                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        <BsFillSuitHeartFill/>
                        </div>
                        <div className='love2'>
                        <CiMenuKebab/>
                        </div>
                    </div>
                    <div className="category-discription"></div>
                </div>

                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        <BsFillSuitHeartFill/>
                        </div>
                        <div className='love2'>
                        <CiMenuKebab/>
                        </div>
                    </div>
                    <div className="category-discription"></div>
                </div>
               
                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        <BsFillSuitHeartFill/>
                        </div>
                        <div className='love2'>
                        <CiMenuKebab/>
                        </div>
                    </div>
                    <div className="category-discription"></div>
                </div>
            </>:
            uploadedEvent.map((e)=>(
                <div className="main-category" onClick={()=>{
                    nav(`/api/events/${e._id}`)
                }}>
                <div className="category-image" key={e._id}>
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
                            <h5>₦{e.eventPrice}</h5>
                            {/* <h5>#2000</h5> */}
                        </div>
                    </div>
                </div>
            </div>

            ))
                    }
            

            </div>
            </div>
           </div>
           {/* <ToastContainer /> */}
            
        </div>
        </div>
    )
}

export default Category