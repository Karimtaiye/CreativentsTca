import { useState } from 'react'
import{ AiOutlineMenu } from 'react-icons/ai'
import {TiDelete} from 'react-icons/ti'
import {NavLink} from "react-router-dom"
import devC from "../../image/devC.png"
import { useNavigate } from 'react-router-dom'
function Header (){
    const nav = useNavigate()
    const [popUp, setPopUp] =useState(false)

    const ShowPop = ()=>{
        setPopUp(!popUp)
    }

    const hidePop = ()=>{
        setPopUp(false)
    }

    return(
    
      <div className="header">
        <div className="topheader">
            <div className="one">
             <div className="image">
             <img src={devC} alt="Logo" style={{cursor:'pointer'}} onClick={()=>nav('/landingpage')}/>
             </div>
             <h1 style={{marginTop:"1px"}}>reativent</h1>
            </div>
            <div className="two">
                <ul>
                    {/* <NavLink to={'checkout'}> */}
                    {/* <NavLink to={'/category'}> */}
                    <li>Find Event</li>     
                    {/* </NavLink>   */}
                    {/* </NavLink> */}

                    <NavLink to={'/about'}>
                    <li>About us</li>
                    </NavLink>

                    <NavLink to={'/login'}>
                    <li>Create Event</li>
                    </NavLink>
                </ul>
            </div>
            <div className="three">
                <button className="btn-one" onClick={()=>nav('/login')}>Log in</button>
                <button className="btn-two" onClick={()=>nav('/signup')}>Sign up</button>
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
                    {/* <NavLink to={'/category'}>
                    <h6>Find Event</h6>
                    </NavLink> */}
                    <NavLink to={'/about'}>
                    <h6>About us</h6>
                    </NavLink>
                    <NavLink to={'/login'}>
                    <h6>Create Event</h6>
                    </NavLink>
                </div>
                <TiDelete className='delete' onClick={hidePop}/>
            </section>: null
            }     
        </div>

      </div>
    )   
  }
  
  export default Header