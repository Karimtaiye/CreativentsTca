import React, { useState } from 'react'
import './UpdateProfile.css'
import './UpdateMedia.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { MdCreateNewFolder } from 'react-icons/md'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { userStoreData } from '../Redux/State'
import { BiArrowBack } from 'react-icons/bi'
// import { userProfile } from '../Redux/State'

function UpdateProfile() {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const Dispatch = useDispatch()
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const initUpdates = useSelector(state=>state.events.userInitUpdate)
    const initFirstName = initUpdates.firstname
    const initLastName = initUpdates.lastname
    const initEmail = initUpdates.email
    const [update, setUpdate] = useState(false)
    const { id } = useParams()
    const [updatesucc, setUpdatesucc] = useState("")
    const [profilePicture, setProfilePicture] = useState([])
    const [firstname, setFirstName] = useState(initFirstName)
    const [lastname, setLastname] = useState(initLastName)
    const [email, setEmail] = useState(initEmail)
    const [profileName, setProfileName] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)

    const token = userOnLoggedIn.token
    const profile = userOnLoggedIn.profilePicture
    const uploadProfile = (e) => {
        const File = e.target.files[0]
        setProfilePicture(File)
        setSelectedImage(URL.createObjectURL(File));
    }
    const data = {firstname, lastname, email, username:profileName}
    const formData = new FormData()
    formData.append("profilePicture", profilePicture)
    
    const url = `https://creativents-on-boarding.onrender.com/api/add-profile-image/${id}`
    const url2 = 'https://creativents-on-boarding.onrender.com/api/updateuser'
    const addProfilePicture = () => {
        setUpdate(true)
        axios.put(url, formData, {
            headers : {
                'Content-Type': 'multipart/form-data',
                 Authorization: `Bearer ${token}`
            }
        } )
        .then(res=>{
            console.log(res)
            setLoading(false)
            setUpdate(false)
            setTimeout(() => {
                setVisible(true)    
            }, 5000)
            nav('/homepage')
            setUpdatesucc("Profile Picture updated ")
            
            Dispatch(userStoreData({
                email:res.data.data.email, 
                id:res.data.data._id,
                token:res.data.data.token,
                name:res.data.data.firstname,
                login:res.data.data.islogin,
                profilePicture: res.data.data.profilePicture
            }))
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
            setUpdate(false)
            setTimeout(() => {
            setVisible(true);
            }, 3000)
            // setVisible(false);
            if(err.message === "Network Error"){
                setVisible(true)
                setTimeout(() => {
                    setVisible(false);
                    setUpdatesucc("Please check your Internet Connection")
                    }, 3000)
            }
            else if(err.response.data.error === "no profile picture added"){
                setTimeout(() => {
                    setVisible(true);
                    setUpdatesucc("No profile picture added")
                    }, 3000)
            }
            else{        
                setUpdatesucc("Cannot Update Profile")
              }
        })
        
    }
    const UpdateProfile = () => {
        // setLoading(true)s
        axios.put(url2, data, {
            headers : {
                // 'Content-Type': 'multipart/form-data',
                 Authorization: `Bearer ${token}`
            }
        } )
        .then(res=>{
            console.log(res)
            setVisible(false);
            setLoading(false)
            setTimeout(() => {
                setVisible(true)    
                nav('/homepage')
            }, 5000)
            if (res){
              setUpdatesucc("Profile Update Successfully")
              console.log("response sent")
          }else{
              console.log('problems sending ')
          }
            Dispatch(userStoreData({
                email:res.data.data.email, 
                id:res.data.data._id,
                token:res.data.data.token,
                name:res.data.data.firstname,
                login:res.data.data.islogin,
                profilePicture: res.data.data.profilePicture
            }))
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
            setVisible(true);
            setTimeout(() => {
            setVisible(false);
              }, 3000)
            if(err.message === "Network Error"){
                setUpdatesucc("Please check your Internet Connection")
            }
          
            else{        
                setUpdatesucc("Cannot Update Profile")
              }
        })
        
    }
    console.log(profilePicture);
    return (
    <>
        
            <div className='Update_UserProfile'>
        <section className='Update_UserProfileWrapper'>
            <div className='Update_UserProfileWrapper_Container'>
            <div className='Update_Header'>
                <BiArrowBack className='back_ArrowLogin'  onClick={()=>nav('/homepage')}/>
                <h3>Update Account</h3>
            </div>
            <div className='Line_Break'></div>
            <div className='Update_Body'>
            <section className='Profile_PicturePart'>
            <div className='Profile_PictureUpdate'>
                {selectedImage ? (
                <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ) : (
                <img src={profile} alt="" />
                )}
            </div>
            <input style={{ display: 'none' }} type="file" id='Upload' onChange={uploadProfile} />
            <label htmlFor="Upload" className='image_Upload'>Upload image</label>
            <label  style={{ paddingInline: "45px", paddingBlock: "10px", background:update?"rgb(124, 86, 10)" :"rgb(255, 178, 29)" }} className='image_Upload' onClick={addProfilePicture}>{update?"Saving":"Save Image"}</label>
            </section>
                <section className='Profile_DetailsPart'>
                    <label>First Name</label>
                    <input style={{color:"white", paddingInline:"10px"}} type="text" value={firstname}  onChange={(e)=>setFirstName(e.target.value)}/>
                    <label>Last Name</label>
                    <input style={{color:"white", paddingInline:"10px"}} type="text" value={lastname}  onChange={(e)=>setLastname(e.target.value)}/>
                    <label>Email</label>
                    <input style={{color:"white", paddingInline:"10px"}} type="text" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                     <label>Profile Name</label>
                    <input style={{color:"white", paddingInline:"10px"}} type="text"   onChange={(e)=>setProfileName(e.target.value)}/>
                    <div className='Update_Buttons'>
                    <button className='Cancel_Btn'onClick={()=>nav('/homepage')}>Cancel</button>
                    <button style={{background:loading?"rgb(126, 87, 10)":null}} className='Update_Btn' onClick={UpdateProfile}>{loading?"Uploading":"Save"}</button>
                    </div>
                </section>
            </div>
            </div>

            <div className="directiontodifferentpage">
            <div className="Homedirection">
                <AiFillHome onClick={()=>nav('/homepage')}  className="directionmain"/>
                <h5>Home</h5>
            </div>

            <div className="Homedirection">
                <MdCreateNewFolder onClick={()=>nav('/upload')} className="directionmain"/>
                <h5>Create</h5>
            </div>
            <div className="Homedirection">
                <BsFillCheckSquareFill onClick={()=>nav(`/api/getUserWithLinks/${id}`)} className="directionmain"/>
                <h5>My Events</h5>
            </div>
          </div>
        </section>

       {
        visible? <div className='ProfilePopUp'>
            <h4>{updatesucc}</h4>
        </div>:null
       }
    </div>
        
    </>
  )
}

export default UpdateProfile