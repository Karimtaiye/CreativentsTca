import React from 'react'
import './Reciept.css'
import './RecieptMobile.css'
import {BsArrowLeftShort} from 'react-icons/bs'

function Reciept() {
  return (
    <div className="code-container">
           <div className="code-holder">
                <div className='top-code'>
                    <BsArrowLeftShort/>
                </div>
                <div className='Codeheaderdiscription'>
                    <h1>Order for <span>Introduction to SQL</span></h1>
                    <div className='code-raper'>
                    <div className='dateandtimecode'>
                    <p>free order#22637372632 on</p> 
                    <p>Aug 24,2023</p>
                    </div>
                    
                    <div className='dateandtimecode2'>
                        <h4>Event information:</h4>
                        <p>sunday August 27,2023 11:00pm</p>
                    </div>
                    </div>
                </div>

                <div className='second-section'>
                    <div className='rightdescription'>
                        <button className='idrantwo'>View Links</button>
                        <button>Cancle Order</button>
                        <button>Contact the organizer</button>
                        <h5>Report this event</h5>
                    </div>

                    <div className='leftdecription'>
                        <div className='headercommondiscription'>
                            <h2>General Admission</h2>
                        </div>
                        <h4>Contact information</h4>
                        <div className='information'>
                            <div className='dis'>
                               <label>First Name</label> 
                               <h5>Frank</h5>
                            </div>

                            <div className='dis'>
                            <label>Last Name</label> 
                               <h5>Seniorboss</h5>
                            </div>

                            <div className='dis'>
                            <label>Email</label> 
                               <h5>Frank@gmail.com</h5>
                            </div>

                            <div className='dis'>
                            <label>Delivery Method</label> 
                               <h5>eTicket</h5>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
  )
}        
export default Reciept