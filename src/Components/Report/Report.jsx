
import { useState } from "react"
import   "./Report.css"
import   "./ReportMobile.css"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {BiSolidError } from 'react-icons/bi'
import {GiConfirmed } from 'react-icons/gi'

const Report = () => {

    const [holder, setHolder] =useState(true)
    const nav = useNavigate()
    const [report, setReport] =useState(false)
    const [description, setDescription] =useState("")
    const [error, setError] =useState(false)
    const [msg, setMsg] =useState("")
    const [subMsg, setsubMsg] =useState("")
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const [reason, setReason] = useState('')
    const [reportAlert, setReportAlert] = useState(false)
    const { eventID } = useParams()
    const [loading, setLoading] = useState(false)

    const token = userOnLoggedIn.token
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }

      const EventReportReason = (e) => {
        setReason(e.target.value)
        console.log(reason);
      }

      const reportData = {
        targetType : "event",
        targetId : eventID,
        reason,
        description:description
      }


    const url = "https://creativents-on-boarding.onrender.com/api/report"

    const Submit_Report = () => {
        setLoading(true)
        axios.post(url, reportData, config)
        .then(res=>{
            console.log(res)
            setMsg("Report Sent Successfully")
            setsubMsg("You 'll get Feedback soon!")
            setReportAlert(true);
            setError(false)
            setLoading(false)
            setTimeout(() => {
            setReportAlert(false);
                // nav('/homepage'); 
              }, 5000)
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
            setError(true)
            setReportAlert(true)
            setTimeout(() => {
                setReportAlert(false);
                // nav('/homepage'); 
              }, 5000)
            if(err.message === "Network Error"){
                setMsg("No internet Connection")
                setsubMsg("")
            }
            else if(err.response && err.response.data.message === "jwt expired"){
                setMsg("No internet Connection")
                setsubMsg("")
            }
            else if(err.response.data.error === "Report validation failed: reason: Path `reason` is required., description: Path `description` is required."){
                setMsg("Reasons and Input field are empty")
                setsubMsg("Pls fill out these parts")
            }
            else if(err.response.data.message === "jwt expired"){
                nav('/login')
            }
            else if(err.response.data.message === "jwt must be provided"){
                setMsg("You have to log in to report this event");
            }
            else {
                setMsg("Failed to send Report")
                setsubMsg("Please try again later")
            }
        })
    }

    const Clickstart = () =>{
        setHolder(false)
        setReport(true)
    }

    const Goback = () =>{
        setHolder(true)
        setReport(false)
    }
    const cancel = () =>{
        setHolder(false)
        setReport(false)
        nav(`/api/events/${eventID}`)
    }
    return(
        <>
        <div className="ReportHolder">
         
           {
                holder?
                <div className="Report">
                <div className="ReportEvent">
                    <div className="ReportTextHolder">
                        <h2 className="ReportH2">Report This Event</h2>
                    </div>
                    <div className="ReportCancelHolder">
                        <span className="CancelSpan" onClick={cancel}>x</span>
                    </div>
                </div>
                <div className="OurDomain">
                 <div className="OurDomainText">
                 <span>Our Community Guidelines will describe the sort of content we prohibit on<br></br>
                    Creativent. If you suspect an event may be in violation, you can report it to us so<br></br>
                    We can investigate.</span>
                 </div>
                </div>
                <div className="TheOrganizer">
                    <div className="TheOrganizerOne">
                       <div className="OurDomainText">
                      <span>
                      If you have a question about an event, need to reolve dispute, or would<br></br>
                        like to request a refund, we encourage   you to first contact the organize<br></br>
                        directly.
                      </span>
                       </div>
                    </div>
                    <div className="TheOrganizerTwo">
                        <div className="OurDomainText">
                            <span>
                            If you or someone else is in imminent danger as a result of an event <br></br>listing,
                            please contact your law enforcement agency for assistance.
                            </span>
                        </div>
                     
                    </div>
                    <div className="StartReport">
                    <button className="StartButt" onClick={Clickstart}>Start Report</button>
                     
                    </div>
                </div>
               
            </div>:null
            }
            {
                report?
                <div className="Reportt">
                      <div className="ReportEventt">
                      <div className="ReportTextHolderr">
                              <h2 className="ReportH22">Report This Event</h2>
                          </div>
                          <div className="ReportCancelHolderr">
                              <span className="CancelSpann" style={{cursor:"pointer"}} onClick={cancel}>x</span>
                          </div>
                      </div>
                     <div className="ItsHoldingAllOfThem">
                     <div className="ResonForReport">
                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Fraudulent or Unauthorized Event"
                        onChange={EventReportReason}
                        checked={reason === 'Fraudulent or Unauthorized Event'}
                        />
                        Fraudulent or Unauthorized Event
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Harmful Content"
                        onChange={EventReportReason}
                        checked={reason === 'Harmful Content'}
                        />
                        Harmful Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Illegal or Regulated Content"
                        onChange={EventReportReason}
                        checked={reason === 'Illegal or Regulated Content'}
                        />
                        Illegal or Regulated Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Sexually Explicit Content"
                        onChange={EventReportReason}
                        checked={reason === 'Sexually Explicit Content'}
                        />
                        Sexually Explicit Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input
                        type="radio"
                        name="reportReason"
                        value="Hateful Content"
                        onChange={EventReportReason}
                        checked={reason === 'Hateful Content'}
                        />
                        Hateful Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input
                        type="radio"
                        name="reportReason"
                        value="Violence or Extremism"
                        onChange={EventReportReason}
                        checked={reason === 'Violence or Extremism'}
                        />
                        Violence or Extremism
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input
                        type="radio"
                        name="reportReason"
                        value="Canceled Event"
                        onChange={EventReportReason}
                        checked={reason === 'Canceled Event'}
                        />
                        Canceled Event
                    </label>
                    </div>
                    
                    </div>
    
                      <textarea name="description" rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)} className="ReportDes" placeholder="Enter your description here...">
                         
                        </textarea>
                      <div className="SubmitAndGoBack">
                          <button className="ReportButton" style={{background:loading?"#031831":null, cursor:loading?"not-allowed":null}} disabled={loading} onClick={Submit_Report}>Submit Report</button>
                          <h3 className="GoBackText" onClick={Goback}>Go back</h3>
                      </div>
                     </div>
                  </div>:null
            }

        </div>
       {
        reportAlert?
        <div className="popUpReport">
        <div>
            <h3>{msg}</h3>
            <h4>{subMsg}</h4>
            <h4></h4>
            {
         error?<BiSolidError style={{fontSize:"100px", color:"red"}}/> :         
         <GiConfirmed style={{fontSize:"100px", color:"green"}}/> 
        }
        </div>
    </div>:null
       }
        </>
    )
}
export default Report