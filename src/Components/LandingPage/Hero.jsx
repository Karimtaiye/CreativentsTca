import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import event2 from "../../assets/event2.jpg"
import party from "../../assets/party.webp"
import event3 from "../../assets/event3.jpg"
import shutter3 from "../../assets/shutter3.jpg"
import axios from 'axios';

function Hero() {
    const imageChange = [party, event3, event2, shutter3];
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % imageChange.length);
        }, 5000); // Adjust the interval time for a slower slide effect (e.g., 5000ms for 5 seconds)

        return () => clearInterval(interval);
    }, []);

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

const searchUrl = `https://creativents-on-boarding.onrender.com/api/event/search?searchTerm=${searchTerm}`

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
  axios.get(searchUrl, searchParameter)
  .then(res=>{
    console.log(res);
    setSearchResults(res.data.data); 
  })
  .catch(err=>{
    console.log('Error searching events:', err);
  }) 
  
};

useEffect(()=>{
//   if (searchTerm !== '') {
//     SearchBar();
//   }

//   setInterval(() => {
//     setCountpro((prev)=>prev += 1)
//   }, 4000);

},[searchTerm])
console.log(searchResults)

    return (
        <div>
            <div className="hero-section">
                <img
                    src={imageChange[imageIndex]}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="event-result">
                    <div className="discription">
                        <h1>DON'T MISS THE UPCOMING EVENT</h1>
                        <h2>Explore what's happening, where and when</h2>
                    </div>

                    <div className="search-event">
                        <div className="search-bar">
                            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search Event" />
                            <AiOutlineSearch className="searchin" />
                        </div>

                        <div className="see-result2">
                            <button className="see-result" onClick={SearchBar}>
                                See result
                                <AiOutlineArrowRight className="arrow" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
