
import {AiOutlineArrowDown} from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {CiMenuKebab} from 'react-icons/ci';
import {CiCalendarDate} from 'react-icons/ci'
import {BiMoney} from 'react-icons/bi'
import { BiArrowBack } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { useSelector } from 'react-redux';
function Category (){
    const searchResults = useSelector(state=>state.events.homeSearchResult)
    const searchWord = useSelector(state=>state.events.searchTerm)
    const nav = useNavigate()
        const [uploadedEvent, setUploadEvent] = useState([])
    
     console.log(searchResults);
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
            {searchResults?<BiArrowBack className='back_ArrowLogin'  onClick={()=>nav('/')}/>:
            null}
        <div className="our-category">

           <div className="category-div">
            <h2>{searchResults.length === 0?"Find your interest":searchWord === ""? "Find your interest":`Search results for "${searchWord}"`}</h2>
            <AiOutlineArrowDown className='arrow-down'/>
            </div>
           <div className='holder2'>
            <div className='inner-holder2'>
            
            <div className="category-containers">           

                
             {
                searchResults.length === 0?
                uploadedEvent.length === 0?
            <>
                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        {/* <BsFillSuitHeartFill/> */}
                        </div>
                        <div className='love2'>
                        {/* <CiMenuKebab/> */}
                        </div>
                    </div>
                    <div className="category-discription"></div>
                </div>

                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        {/* <BsFillSuitHeartFill/> */}
                        </div>
                        <div className='love2'>
                        {/* <CiMenuKebab/> */}
                        </div>
                    </div>
                    <div className="category-discription">
                       
                    </div>
                </div>

                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        {/* <BsFillSuitHeartFill/> */}
                        </div>
                        <div className='love2'>
                        {/* <CiMenuKebab/> */}
                        </div>
                    </div>
                    <div className="category-discription"></div>
                </div>

                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        {/* <BsFillSuitHeartFill/> */}
                        </div>
                        <div className='love2'>
                        {/* <CiMenuKebab/> */}
                        </div>
                    </div>
                    <div className="category-discription"></div>
                </div>
               
                <div className="main-category">
                    <div className="category-image">
                    <div className='love'>
                        {/* <BsFillSuitHeartFill/> */}
                        </div>
                        <div className='love2'>
                        {/* <CiMenuKebab/> */}
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

            )):
            searchResults.map((e)=>(
                <div className="main-category" onClick={()=>{
                    nav(`/api/events/${e._id}`)
                }}>
                <div className="category-image" key={e._id}>
                <img src={e.eventImages} alt="" />
                    <div className='love'>
                    {/* onClick={handleLiked} :liked ? */}
                    {/* <BsFillSuitHeartFill style={{color:
                     "lightgrey"}}/> */}
                    </div>
                    <div className='love2'>
                    {/* <CiMenuKebab/> */}
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
        {/* <Footer /> */}
        </div>
    )
}

export default Category