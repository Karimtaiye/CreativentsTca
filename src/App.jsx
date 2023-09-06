import React from 'react'
import './App.css'
import './Media.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import LogIn from './Components/Auth/LogIn'
import SignUp from './Components/Auth/SignUp'
import LogOut from './Components/LogOut/LogOut'
import MainPage from './Components/LandingPage/MainPage'
import HomePage from './Components/HomePage/HomePage'
import About from './Components/About/About'
import NewPassword from './Components/NewPassword/NewPassword'
import EmailVerification from './Components/EmailLink/EmailVerification'
import CheckPassword from './Components/NewPassword/CheckPassword'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import Upload from './Components/CreateEvent/Upload'
import UpdateProfile from './Components/UpdateProfile/UpdateProfile'
import Explore from './Components/Explore/Explore'
import Checkouts from './Components/Checkout/Checkouts'
import UserDashBoard from './Components/UserDashBoard/UserDashBoard'
import UserEventUpdates from './Components/UserEventUpdate/UserEventUpdates'
import ConfirmDelete from './Components/UserDashBoard/ConfirmDelete'
import ConfirmCheckOut from './Components/Checkout/ConfirmCheckOut'
import Rate from './Components/Rate/Rate'
import EventSearch from './Components/EventSearch/EventSearch'
import Report from './Components/Report/Report'
import Analytics from './Components/Analytics/Analytics'
import BarCode from './Components/BarCode/BarCode'
import Admin from './Components/Admin/Admin'
import Category from './Components/LandingPage/Category'
import Reciept from './Components/Reciept/Reciept'
import Host from './Components/HostPage/Host'
import Categoryt from './Components/LandingPage/Categoryt'

function App() {
  
  return (
    <>
      <HashRouter>
        {/* <Header /> */}
          <Routes>
              
              <Route path ='/login' element = {<LogIn />} />
              <Route path ='/signup' element = {<SignUp />} />
              <Route path ="/api/logout/:id" element = {<LogOut />} />
              <Route path ="/" element = {<Explore />} />
              <Route path ='/landingpage' element = {<MainPage />} />
              <Route path ='/category' element = {<Category />} />
              <Route path ='/homepage' element = {<HomePage />} />
              <Route path ="/api/event/search" element = {<EventSearch  />} />
              <Route path ='/upload' element = {<Upload />} />
              <Route path ='/api/add-profile-image/:id' element = {<UpdateProfile />} />
              <Route path ='/about' element = {<About />} />
              <Route path ='/forgotpassword' element = {<ForgotPassword />} />
              <Route path ='/api/changepassword/:id/:token' element = {<NewPassword />} /> 
              <Route path="/api/verify" element={<EmailVerification />} />
              <Route path="/checkpassword" element={<CheckPassword />} />
              <Route path="/api/getUserWithLinks/:id" element={<UserDashBoard />} />
              <Route path="/api/update/:eventID" element={<UserEventUpdates />} />
              <Route path="/api/Delete/:eventID" element={<ConfirmDelete />} />
              <Route path="/api/events/:id" element={<Checkouts />} />
              <Route path="/api/tickets/:id" element={<ConfirmCheckOut />} />
              <Route path ='/categoryt' element = {<Categoryt />} />

              <Route path="/api/changepasswordlogged/:id" element={<ChangePassword />} />
              <Route path="/api/rate" element={<Rate />} />
              <Route path="/api/report/:eventID" element={<Report />} />
              <Route path="/api/analytics" element={<Analytics />} />
              <Route path="/api/barcode/:id" element={<BarCode />} />
              <Route path="/adminDashboard/*" element={<Admin />} />
              <Route path="/reciept" element={<Reciept />} />
              <Route path="/host/:id" element={<Host/>} />
              {/* <Route path="/shot" element={<Shot/>} /> */}
            
          </Routes>
      </HashRouter>
    </>
  )
}

export default App