import './SignUp.css'
import React, { useEffect, useState } from 'react'
import { BiShow, BiHide, BiArrowBack } from 'react-icons/bi'
import './SignUpMobile.css'
import axios from'axios'
import { useNavigate } from 'react-router-dom'
import { userStoreData } from '../Redux/State'
import { useDispatch, useSelector } from 'react-redux'
import LogoC from "../../assets/LogoC.png"
    
function SignUp() {
  const nav = useNavigate()
  const Dispatch = useDispatch()
  const userDatas = useSelector(state=>state.events.user)
  const [firstname, setFirstName] = useState("")
  const [lastname, setlastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  // const [errorMsg, setErrorMsg] = useState("")
  const [username, setusername] = useState("")
  // const [DOB, setDOB] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [errorMsg2, setErrorMsg2] = useState("")
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfimPasswordShow] = useState(false)
  const [host, setHost] = useState(false)
  const[loading, setLoading] = useState(false)

  const url = "https://creativents-on-boarding.onrender.com/api/signup"

  const userData = {firstname, lastname, password, email, confirmPassword}

  const signUpUser = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")
    setErrorMsg2("")
    // if(!email){
    //   setErrorMsg({error:true, type:"email", msg:"Please input your Email"})
    // }
    // else if(!firstname){
    //   setErrorMsg({error:true, type:"firstname", msg:"Please input your First Name"})
    // }
    // else if(!lastname){
    //   setErrorMsg({error:true, type:"lastname", msg:"Please input your Last Name"})
    // }
    // else if(!password){
    //   setErrorMsg({error:true, type:"password", msg:"Please input your Password"})
    // }
    // else if(password !== confirmPassword){
    //   setErrorMsg({error:true, type:"confirmpassword", msg:"password does not match"})
    // }
    // else if(!username){
    //   setErrorMsg({error:true, type:"host", msg:"Please input your Host Username"})
    // }
    // else {
      axios.post(url,userData)
        .then(res=> {
            console.log("Successful",res)
            Dispatch(userStoreData({email:res.data.data.email, id:res.data.data._id, token:res.data.data.token}))
            const verifyToken = res.data.expireLink
            console.log(verifyToken, res.data.data._id)
            console.log(res.data.expireLink);
            // const verifyId = res.data.data.id
            // nav("/api/verify/:token")
            nav('/api/verify');
      })
        .catch((err) => {
            console.log("Error", err);
            setLoading(false)
            setErrorMsg(err.response.data.error )
            setErrorMsg2(err.response.data.message )
            // console.log(errorMsg);
        });
    
      console.log(userDatas);
  }
  //     axios.post(url,userData)
  //       .then(res=> {
  //           console.log("Successful",res)
  //           const verifyToken = res.data.token
  //           console.log(verifyToken)
  //           Dispatch(userResData(res))
  //           // const verifyId = res.data.data.id
  //           nav('/verify')
  //       })
  //       .catch((err) => {
  //           console.log("Error", err);
  //       });
  //   }

  // }
  // console.log(userSignUpData);



  return (
    <div className='SignUp'>
        <section className='input_SignUp'>
          <div className='SignUp_logo'>
            <BiArrowBack className='back_Arrow' onClick={()=>nav('/login')}/>
            <img src={LogoC} alt="" onClick={()=>nav('/landingpage')} style={{cursor:"pointer"}}/>
            <span>Sign In</span>
          </div>
          <div className='user_Auth_signUp'>
            <h1>Sign <span> Up</span> with us!</h1>
            <form className='SignUp_Auth'  onSubmit={signUpUser}>
              {/* <label className='SignUp_Labels'>Email</label> */}
              <input type="text" className='signUpInputs' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
              <div className='names'>
              <article>
              {/* <label>FirstName</label> */}
              <input type="text" className='UserName'  value={firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder='First Name'/>
              {/* {
                errorMsg.type === "firstname" ?<h5>{errorMsg.msg}</h5>: null
              } */}
              </article>
              {/* <input className='dateOfBirth' type="date" value={DOB} onChange={(e)=>setDOB(e.target.value)}/> */}
              <article>
              {/* <label>LastName</label> */}
              <input type="text" className='UserName' value={lastname} onChange={(e)=>setlastName(e.target.value)} placeholder='Last Name'/>
              {/* {
              errorMsg.type === "lastname"?<h5>{errorMsg.msg}</h5>: null
              } */}
              </article>
              </div>
              {/* <label className='SignUp_Labels'>Password</label> */}
              <input type={passwordShow?"password":"text"} className='signUpInputs' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
              {/* {
                errorMsg.type === "password" ?<h5>{errorMsg.msg}</h5>: null
              } */}
                   {/* {
                   passwordShow? <BiShow  className='password_Visibility_SignUp' onClick={()=>setPasswordShow(!passwordShow)}/>
                   :<BiHide  className='password_Visibility_SignUp' onClick={()=>setPasswordShow(!passwordShow)}/>
                   } */}
              {/* <label className='SignUp_Labels'>Confirm Password</label> */}
              <input type={confirmPasswordShow?"password":"text"} value={confirmPassword} className='signUpInputs' onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm your password'/>
              {
                host?null:
                <>
                  <span style={{fontSize:"12px", color:"#FCA702", width:"90%"}}>{errorMsg}</span> <span style={{fontSize:"12px", color:"#FCA702", width:"90%"}}>{errorMsg2}</span>
                </>
              }
              {/* {
                errorMsg.type === "confirmpassword"?<h5>{errorMsg.msg}</h5>: null
              } */}
                   {/* {
                   confirmPasswordShow? <BiShow  className='Cpassword_Visibility_SignUp' onClick={()=>setConfimPasswordShow(!confirmPasswordShow)}/>
                   :<BiHide  className='Cpassword_Visibility_SignUp' onClick={()=>setConfimPasswordShow(!confirmPasswordShow)}/>
                   } */}
              {
                host?
                <>
                  {/* <label className='SignUp_Labels'>Profile Name</label> */}
                    <input type="text" className='signUpInputs' value={username} onChange={(e)=>setusername(e.target.value)} placeholder='Profile Name'/>
                    <span style={{fontSize:"12px", color:"#FCA702", width:"90%"}}>{errorMsg}</span> <span style={{fontSize:"12px", color:"#FCA702", width:"90%"}}>{errorMsg2}</span>
                    {/* {
                errorMsg.type === "host"?<h5>{errorMsg.msg}</h5>: null
                    } */}
                </>: null
              }
              <div className='auth_Action_signUp'>
              <div className='reg_Host'>
              <input type="checkbox" style={{cursor:"pointer"}}  onClick={()=>setHost(!host)}/ > Register as a Host
              </div>
              <button className='SignUp_Btn' style={{backgroundColor:loading?"rgb(182, 132, 32)":null}} disabled={loading  }>{loading?"Registering":"Sign up"}</button>
              <p>Already have an account? <a style={{cursor:"pointer"}} onClick={()=>nav('/login')}>Log in</a></p>
              </div>
            </form>
          </div>
        </section>
        <section className='image_LogIn'>
        </section>
     </div>
  )
}

export default SignUp