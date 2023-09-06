import { useState, useEffect } from 'react'
import{ AiOutlineMenu } from 'react-icons/ai'
import {TiDelete} from 'react-icons/ti'
import {NavLink} from "react-router-dom"
import devC from "../../image/devC.png"
import axios from 'axios'
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header (){
    const nav = useNavigate()
  const userOnLoggedIn = useSelector(state=>state.events.user)
const [searching, setSearching] = useState(false);
  const [bookingRefPop, setBookingRefpop] = useState(false)
  const [searchTerms, setSearchTerm] = useState("")
  const token = userOnLoggedIn.token
  const name = userOnLoggedIn.name
    const [popUp, setPopUp] =useState(false)

    const ShowPop = ()=>{
        setPopUp(!popUp)
    }

    const hidePop = ()=>{
        setPopUp(false)
    }

    const searchUrl = `https://creativents-on-boarding.onrender.com/api/searchbooking/search?searchTerm=${searchTerms}`

  const searchParameter = {
    searchparams: {
      bookingReference: searchTerms,       
    }
  }

    const SearchBar = () => {
        setSearching(true)
      axios.get(searchUrl, searchParameter)
      .then(res=>{
        console.log(res);
        setSearching(false)   
        nav(`/api/barcode/${res.data.data[0].bookingReference}`) 
        Dispatch(purchasedEventID(res.data.data._id))
      })
      .catch(err=>{
        setSearching(false)
        console.log('Error searching events:', err);
      }) 
      
    };
    
    useEffect(()=>{
    
    },[])

    return(
    
      <div className="header">
        <div className="topheader">
            <div className="one">
             <div className="image">
             <img src={devC} alt="Logo" style={{cursor:'pointer'}} onClick={()=>{
                token?nav('/homepage'):nav('/landingpage')
             }}/>
             </div>
             <h1 style={{marginTop:"1px", fontSize:"14px"}}>reativent</h1>
            </div>
            <div className="two">
                <ul>
                    {/* <NavLink to={'checkout'}> */}
                    <NavLink to={'/category'}> 
                    <li>Find Event</li>     
                     </NavLink>  
                    {/* </NavLink> */}

                    <NavLink to={'/about'}>
                    <li>About us</li>
                    </NavLink>

                    <NavLink to={'/login'}>
                    <li>Create Event</li>
                    </NavLink>
                    <li onClick={()=>{
                        setBookingRefpop(!bookingRefPop)
                    }}>Manage Booking</li>
                </ul>
            </div>
            <div className="three">
                {
                    !token?
                    <>
                    <button className="btn-one" onClick={()=>nav('/login')}>Log in</button>
                    <button className="btn-two" onClick={()=>nav('/signup')}>Sign up</button>
                    </>:
                    <h3 style={{width:"40px", height:"40px", background:"black", borderRadius:"50%",
                     color:"white", display:"flex", justifyContent:"center", alignItems:"center"}}>{name.charAt(0)}</h3>
                }
            </div>
            <div>
                <div className='menu-dash'>
                    <AiOutlineMenu className='menu' onClick={ShowPop}/>
                    </div>
            </div>

               {
                popUp?
                <section className='pop-up'>
                <div className='list'>
                    <NavLink to={'/login'}>
                    <h6>Log in</h6>
                    </NavLink>
                    <NavLink to={'/signup'}>
                    <h6>Sign up</h6>
                    </NavLink>
                    <NavLink to={'/about'}>
                    <h6>About us</h6>
                    </NavLink>
                    <NavLink to={'/login'}>
                    <h6>Create Event</h6>
                    </NavLink>
                    <li className='Book' onClick={()=>{
                        setBookingRefpop(!bookingRefPop)
                    }}>Manage Booking</li>
                </div>
                <TiDelete className='delete' onClick={hidePop}/>
            </section>: null
            }     
        </div>
        {
            bookingRefPop?
            <div className='BookingSharp'>
            <h1 className='Cancel_booking' onClick={()=>{
                setBookingRefpop(!bookingRefPop)
            }}>X</h1>

        <div className="search-ref">
                        <div className="searchRef-bar">
                            <input value={searchTerms} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Provide Your Booking Ref No" />
                            {/* <AiOutlineSearch className="searchin" /> */}
                        </div>

                        <div className="seeRef-result2">
                            <button style={{background:searching?"#193e7f8f":"#303482", width:"100%",
                             height:"100%",
                             border:"none", borderRadius:"0px 10px 10px 0px", color:"white",
                             }} className="see-result" onClick={SearchBar}>
                                {searching?"Loading":"Get"}
                                <AiOutlineArrowRight className="arrow" style={{fontSize:"16px"}}/>
                            </button>
                        </div>
                    </div>
        </div>: null
        }
      </div>
    )   
  }
  
  export default Header