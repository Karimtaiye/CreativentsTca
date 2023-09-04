import './SignUp.css'
import React, { useEffect, useState } from 'react'
import { BiShow, BiHide, BiArrowBack } from 'react-icons/bi'
import './SignUpMobile.css'
import axios from'axios'
import { useNavigate } from 'react-router-dom'
import { userStoreData } from '../Redux/State'
import { useDispatch, useSelector } from 'react-redux'
import LogoC from "../../assets/LogoC.png"
import { SpinnerDotted } from 'spinners-react'
 

function SignUp() {
  // const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const emailRegex = /^\s*[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}\s*$/;
  // const nameRegex = /^[a-zA-Z]+$/;
  const nameRegex = /^[a-zA-Z\s]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const nav = useNavigate()
  const Dispatch = useDispatch()
  const userDatas = useSelector(state=>state.events.user)
  const [firstname, setFirstName] = useState("")
  const [lastname, setlastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState({error:false, type:"", msg:""})
  const [username, setusername] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [errorMsg2, setErrorMsg2] = useState("")
  const [host, setHost] = useState(false)
  const[loading, setLoading] = useState(false)
  const[ischecked, setischecked] = useState(false)
  const [empty, setEmpty] = useState(false)

  const url = "https://creativents-on-boarding.onrender.com/api/signup"

  const userData = {firstname:firstname.trim(), lastname:lastname.trim(), password:password.trim(), email:email.trim().toLowerCase(), confirmPassword:confirmPassword.trim()}

  const signUpUser = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setErrorMsg2("")
    setErrorMsg("")
    
     if(!emailRegex.test(email)){
      setError({error:true, type:"email", msg:"Please input valid email"})
      setLoading(false)
    }

    else if(!nameRegex.test(firstname)){
     setError({error:true, type:"firstname", msg:"Input your first name with letters only"})
     setLoading(false)

   }
    else if(!nameRegex.test(lastname)){
      setError({error:true, type:"lastname", msg:"Input your last name with letters only"})
      setLoading(false)

    }
    else if(!passwordRegex.test(password)){
      setError({error:true, type:"password", msg:"Password must contain at least 8 characters, including a lowercase letter, an uppercase letter, and a digit"})
      setLoading(false)

    }
    else if(password !== confirmPassword){
      setError({error:true, type:"confirmpassword", msg:"password does not match"})
      setLoading(false)

    }
    else if(ischecked){
      setLoading(false)

    }
    else {
      axios.post(url,userData)
        .then(res=> {
          setLoading(false)
            console.log("Successful",res)
            Dispatch(userStoreData({email:res.data.data.email, id:res.data.data._id, token:res.data.data.token}))
            const verifyToken = res.data.expireLink
            console.log(verifyToken, res.data.data._id)
            console.log(res.data.expireLink);

            nav('/api/verify');
      })
        .catch((err) => {
            console.log("Error", err);
            setLoading(false)
            if(err.message === "Network Error"){
           setErrorMsg("Please check your Internet Connection")
            console.log("error");
          }
          else if(err.response.data.message === `User with this Email: ${email.trim().toLowerCase()} already exist.`){
            setErrorMsg("Email has been registered ")
          }
          else{
            setErrorMsg(err.response.data.message)
          }

        })
      }
    
      console.log(userDatas);
  }


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

              <input type="text" className='signUpInputs' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
              {
                error.type === "email" ?<h5 style={{marginTop:"4px"}}>{error.msg}</h5>: null
              }
              <div className='names'>
              <article>

              <input type="text" className='UserName'  value={firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder='First Name'/>
              {
                error.type === "firstname" ?<h5>{error.msg}</h5>: null
              }
              </article>

              <article>

              <input type="text" className='UserName' value={lastname} onChange={(e)=>setlastName(e.target.value)} placeholder='Last Name'/>
              {
              error.type === "lastname"?<h5>{error.msg}</h5>: null
              }
              </article>
              </div>

              <input type="password" className='signUpInputs' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
              {
                error.type === "password" ?<h5 style={{width:"90%"}}>{error.msg}</h5>: null
              }
  
              <input type="password" value={confirmPassword} className='signUpInputs' onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm your password'/>
              {/* {
                host?null:
                <>
                  <span style={{fontSize:"12px", color:"#FCA702", width:"90%"}}>{errorMsg}</span> <span style={{fontSize:"12px", color:"#FCA702", width:"90%"}}>{errorMsg2}</span>
                </>
              } */}
              {
                error.type === "confirmpassword"?<h5>{error.msg}</h5>: null
              }

              {
                <h5>{errorMsg}</h5>
              }
               
              <div className='auth_Action_signUp'>
              <div className='reg_Host'>
              <input type="checkbox" style={{cursor:"pointer"}} checked={ischecked}  onChange={()=>setischecked(!ischecked)}
           /> Agree to Terms and conditions
              </div>
              <button className='SignUp_Btn' style={{backgroundColor:loading?"rgb(182, 132, 32)":!ischecked?"rgb(182, 132, 32)":null}} disabled={loading || !ischecked}>{loading?<SpinnerDotted size={40} thickness={50} speed={100} color="#ffffff" />:"Sign up"}</button>
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