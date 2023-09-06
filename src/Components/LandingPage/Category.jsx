
import {AiOutlineArrowDown} from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import {CiCalendarDate} from 'react-icons/ci'
import {BiMoney} from 'react-icons/bi'
import { BiArrowBack } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { getSearchResult } from '../Redux/State';
import { useDispatch, useSelector } from 'react-redux';
function Category (){
    // const Dispatch = useDispatch()
    // const searchResults = useSelector(state=>state.events.homeSearchResult)
    // const searchWord = useSelector(state=>state.events.searchTerm)
    const nav = useNavigate()
        const [uploadedEvent, setUploadEvent] = useState([])
    
    //  console.log(searchResults);
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

    return(
        <div>
            
        <div className="our-category">

        <BiArrowBack style={{ color:"white", display:"flex",alignSelf:"flex-start", marginLeft:"50px", position:"absolute", top:"5%", fontSize:"20px", cursor:"pointer"}} onClick={()=>{
            nav('/landingpage')
            // Dispatch(getSearchResult({homeSearchResult:[]}))
            }}/>
           <div className="category-div">

            <h2>Find your interest</h2>
            <AiOutlineArrowDown className='arrow-down'/>
            </div>
           <div className='holder2'>
            <div className='inner-holder2'>
            
            <div className="category-containers">           
                {
            uploadedEvent.map((e)=>(
                <div className="main-category" onClick={()=>{
                    nav(`/api/events/${e._id}`)
                }}>
                <div className="category-image" key={e._id}>
                <img src={e.eventImages} alt="" />
            
                </div>
                <div className="category-discription">
                    <div className='locationandeventname'>
                        {/* <h4>The curve Cohort 2 Graduation Day 2023.</h4> */}
                        <h4>{e.eventName}</h4>
                        {/* <h4>180 Freedom Way, Lekki Phase 1 Lagos State.</h4> */}
                        <h4>{e.eventVenue}</h4>

                        <div class="rating">
{[1, 2, 3, 4, 5].map((star) => (
                        <FaStar style={{fontSize:"18px", marginTop:"10px"}}
                        key={star}
                        className={star <= e.overallRating? 'star_selected' : 'starh'}
                        onClick={() => handleStarClick(star)}
                        />
                    ))}
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
        {/* <Footer /> */}
        </div>
    )
}

export default Category