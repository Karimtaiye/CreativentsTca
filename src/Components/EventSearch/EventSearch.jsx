import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventSearch.css'
import { MdLocationPin } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

function EventSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const nav = useNavigate()
  const [searchResults, setSearchResults] = useState([]);
  
  
  const url = `https://creativents-on-boarding.onrender.com/api/event/search?searchTerm=${searchTerm}`

    const searchParameter = {
      searchparams: {
        eventName: searchTerm,   
        eventCategory: searchTerm,
        eventPrice: searchTerm,    
        eventLocation: searchTerm, 
        eventVenue: searchTerm,    
        eventDate: searchTerm,     
        eventTime: searchTerm,     
      }
    }
  

  const SearchBar = () => {
    axios.get(url, searchParameter)
    .then(res=>{
      console.log(res);
      setSearchResults(res.data.data); 
    })
    .catch(err=>{
      console.log('Error searching events:', err);
    }) 
    
  };

  useEffect(()=>{
    if (searchTerm !== '') {
      SearchBar();
    }

  },[searchTerm])

  return (
    <div className='Search_Container'>
      <div className='SearchResult_Container'>
      <input className='SearchBar_Input'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search events by name, category, time, date, venue, location, price"
      />
      <div className='Search_Results'>

      {
        searchResults.map((e)=>(
          <div className='Upcoming_EventsDetail' onClick={()=>{
            nav(`/api/events/${e._id}`)
        }}>
          {/* <div className='upper-Header'>name</div> */}
          <div className='upper-Header'>{e.eventName}</div>
  
          <div className='innupper-header'>
            <div className='Upcoming_EventImages'>
              {/* <img src="" alt="" /> */}
              <img src={e.eventImages} alt="" />
            </div>
            <div className='Upcoming_EventDescs'>
             
              <div className='Upcoming_LocationDivs'>
              <MdLocationPin className='Upcoming_Locations'/>
              <span className='span'>{e.eventVenue}</span>
              {/* <span className='span'>venue</span> */}
              </div>
              {/* <span className='span3'>date</span> */}
              <span className='span3'>{e.eventDate}</span>
              <div className='buttoncontroler'>
                <button className='btn1'>Book now</button>
                <button className='btn2'>Book Mark</button>
              </div>
            </div>
            </div>
        </div>
        ))
      }
            {/* <div className='Results_Object'>
              <div className='Searched_Details'>

              </div>
            </div> */}
      </div>
      </div>
    </div>
  );
}

export default EventSearch;
