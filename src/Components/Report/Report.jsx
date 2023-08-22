
import { useState } from "react"
import   "./Report.css"
const Report = () => {
    const [holder, setHolder] =useState(true)
    const [report, setReport] =useState(false)

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
                 Our Community Guidelines will describe the sort of content we prohibit on<br></br>
                    Creativent. If you suspect an event may be in violation, you can report it to us so<br></br>
                    We can investigate.
                 </div>
                </div>
                <div className="TheOrganizer">
                    <div className="TheOrganizerOne">
                       <div className="OurDomainText">
                       If you have a question about an event, need to reolve dispute, or would<br></br>
                        like to request a refund, we encourage   you to first contact the organize<br></br>
                        directly.
                       </div>
                    </div>
                    <div className="TheOrganizerTwo">
                        <div className="OurDomainText">
                            If you or someone else is in imminent danger as a result of an event <br></br>listing,
                            please contact your law enforcement agency for assistance.
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
                              <span className="CancelSpann" onClick={cancel}>x</span>
                          </div>
                      </div>
                     <div className="ItsHoldingAllOfThem">
                     <div className="ResonForReport">
                          <div className="ReasonText">
                          <h2>Reason For Report</h2>
                          </div>
                         <div className="Fradulent">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Fraudulent or Unauthorized Event</label>
                         </div>
                         <div className="Harmful">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Harmful Content</label>
                         </div>
                         <div className="Illegal">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Illegal or Regulated Content </label>
                         </div>
                         <div className="Spam">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Spam</label>
                         </div>
                         <div className="Sex">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Sexually Explicit Content</label>
                         </div>
                         <div className="Hateful">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Hateful Content</label>
                         </div>
                         <div className="Violence">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Violence or Extremism</label>
                         </div>
                         <div className="Canceled">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Canceled Event</label>
                         </div>
                         <div className="Request">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Request a Refund</label>
                         </div>
                         <div className="Copyright">
                         <input type="radio" id="name"/>
                          <label htmlFor="name">Copyright or Trademark Infringement</label>
                         </div>
                      </div>
                      <div className="YourEmail">
                          <input type="email"  placeholder="Your Email*" className="ReportEmail"/>
                      </div>
                      <div className="ReportDescription">
                          <input type="text" placeholder="Description*" className="ReportDes"/>
                      </div>
                      <div className="SubmitAndGoBack">
                          <button className="ReportButton">Submit Report</button>
                          <h3 className="GoBackText" onClick={Goback}>Go back</h3>
                      </div>
                     </div>
                  </div>:null
            }
        </div>
        </>
    )
}
export default Report