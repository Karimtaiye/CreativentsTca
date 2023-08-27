
import devC4 from "../../image/devC4.png"
import {AiOutlineInstagram, AiOutlineTwitter, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
const Footer =()=>{
    const nav = useNavigate()
    return(
        <div className="footer">
            <div className="social-media">
                <div className='s-b-holder'>
                <div className="logo">
                <img src={devC4} onClick={()=>nav('/homepage')} alt=""></img>
                </div>
                <h1>reativent</h1>
                </div>

                <div className="social-image">
                    <AiOutlineInstagram className='all-social-media'/>
                    <AiOutlineTwitter className='all-social-media'/>
                    <AiFillLinkedin className='all-social-media'/>
                    <AiFillFacebook className='all-social-media'/>
                </div>
            </div>

            <div className="details">
                <ul>
                    <li>Payment Method</li>
                    <li>About Us</li>
                    <li>Featurs</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="date">
                <h3>© 2023 Creativent.ng. All Rights Reserved.</h3>
            </div>
        </div>
    )
}

export default Footer