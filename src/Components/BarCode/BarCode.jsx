import "./BarCode.css"
import "./BarCodeResponsive.css"
import {BiArrowBack} from "react-icons/bi"
const BarCode = () =>{
    return(
        <>
        <div className="BackCodeHolder">
            <div className="CodeHolder">
                <div className="BackLogoHolder">
                    <img src="./src/assets/Vent.png" alt="" className="CodeImage"/>
                    <BiArrowBack className="CodeIcon"/>
                </div>
                <div className="BackSectionAndSeatHolder">
                    <h2 className="CodeText">SECTION<br></br>BL -13</h2>
                    <h2 className="CodeText">SEAT<br></br>16</h2>
                </div>
                <div className="BackCodeHolderAndPartyHolder">
                    <div className="BackCode"></div>
                    <h2 className="Graduation">Graduation Party Day</h2>
                </div>
            </div>
        </div>
        </>
    )
}
export default BarCode