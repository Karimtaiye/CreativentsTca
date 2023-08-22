import "./Analytics.css"
import "./AnalyticsResponsive.css"
// import {CgShapeZigzag} from "react-icons/cg"
const Analytics = () => {
    return(
       <>
       <div className="AnalyticsMainHolder">
        <div className="AnalyticsHolder">
            <div className="AnalyticsLogo">
              <div className="AnalyLogo">
                <img src="./src/assets/Vent.png" alt="" className="AnaLogo" />
              </div>
              <div className="AnalyProfile">
                <h3 className="AnalyText">Muna</h3>
                <div className="ProfileAnaly"></div>
              </div>
            </div>
            <div className="AnalyticsTop">
              <div  className="AnalyticsOverallAndButton">
                <h3 className="OverallText">Overall Sales<br></br>₦354,506.23</h3>
                <button className="OverallButton">This month</button>
              </div>
              <div className="AnalyticsPitogram">
                <p className="AnalyGreen"> 350k<hr className="AnalyticsBr"></hr></p>
                <p className="AnalyBlue">300k<hr className="AnalyticsBr"></hr></p>
                <p className="AnalyYellow">250k<hr className="AnalyticsBr"></hr></p>
                <p className="AnalyBlack">150k<hr className="AnalyticsBr"></hr></p>
                <p className="AnalyWhite">1000k<hr className="AnalyticsBr"></hr></p>
              </div>
              <div className="AnalyticsWeekHolder">
                <div className="AnalyticsWeek">
                  <p className="Weeks">Week1</p>
                  <p className="Weeks">Week2</p>
                  <p className="Weeks">Week3</p>
                  <p className="Weeks">Week4</p>
                  <p className="Weeks">Week5</p>
                </div>
              </div>
            </div>
            <div className="AnalyticsBottom">
              <div className="AnalyticsBottomButton">
                <button className="OverallButtonb">This year</button>
              </div>
              <div className="AnalyticsBottomChart">
                <div className="AnalyticsPercent">
                  <p className="TextPercent">100%</p>
                  <p className="TextPercent">90%</p>
                  <p className="TextPercent">80%</p>
                  <p className="TextPercent">70%</p>
                  <p className="TextPercent">60%</p>
                  <p className="TextPercent">50%</p>
                  <p className="TextPercent">40%</p>
                  <p className="TextPercent">30%</p>
                  <p className="TextPercent">20%</p>
                  <p className="TextPercent">10%</p>
                </div>
               <div className="ThisOneIsHoldingThem">
               <div className="AnalyticsData">
                <div className="AnalyticsLineBreak">
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                <hr className="AnalyticsBrrr"></hr>
                </div>
                <div className="Bar1"></div>
                <div className="Bar2"></div>
                <div className="Bar3"></div>
                <div className="Bar4"></div>
                <div className="Bar5"></div>
                <div className="Bar6"></div>
                <div className="Bar7"></div>
                <div className="Bar8"></div>
                <div className="Bar9"></div>
                <div className="Bar10"></div>
                <div className="Bar11"></div>
                <div className="Bar12"></div>
                </div>
                <div className="AnalyticsMonths">
                  <p className="TextMonths">JAN</p>
                  <p className="TextMonths">FEB</p>
                  <p className="TextMonths">MAR</p>
                  <p className="TextMonths">APR</p>
                  <p className="TextMonths">MAY</p>
                  <p className="TextMonths">JUN</p>
                  <p className="TextMonths">JUY</p>
                  <p className="TextMonths">AUG</p>
                  <p className="TextMonths">SEP</p>
                  <p className="TextMonths">OCT</p>
                  <p className="TextMonths">NOV</p>
                  <p className="TextMonths">DEC</p>
                </div>
               </div>
              </div>
            </div>
        </div>
       </div>
       </>
    )
}
export default Analytics