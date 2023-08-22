import React from 'react'
import {MdDateRange} from "react-icons/md"
import {LuTicket} from "react-icons/lu"
function Tickets({src, eventName, eventVenue, eventDate, eventPrice}) {
  return (
    <div className="My_Tickets" style={{marginTop:"35px"}}>
                        <div className="My_TicketDetails">
                            <div className="My_TicketImage">
                                <img src={src} alt="" />
                            </div>
                            <div className="My_EventDetails">
                                <div className="Events_Desc">
                                    <p>{eventName}</p>
                                    <p>{eventVenue}</p>
                                    <div className="Date_Time">
                              <div>
                              <MdDateRange style={{fontSize:"13px", color:"#102255"}}/> <span style={{fontSize:"13px",color:"#102255"}}>{eventDate}</span>
                              </div>
                              <div>
                              <LuTicket style={{fontSize:"13px", color:"#102255"}}/> <span style={{fontSize:"13px",color:"#102255"}}>{eventPrice}</span>
                              </div>
                               </div>
                                </div>
                                <div classname="SavedEvent_DateTime">
        
                                </div>
                            </div>
                            <div classname="My_EventIcons">
                                
                            </div>
                        </div>
                        <div className="My_TicketOptions">
                            <span className="Delete_Ticket">Delete</span>
                            <span className="Update_Ticket">update</span>
                        </div>
                    </div>
  )
}

export default Tickets