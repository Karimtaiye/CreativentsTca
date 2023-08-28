import React from 'react'
import { Routes, Route} from 'react-router-dom'
import AllUser from './AllUser'
import BlockedUsers from './BlockedUsers'
import GetAllReports from './GetAllReports'
import ActiveUsers from './ActiveUsers'
import GetAllPending from './GetAllPending'
import AllEvents from './AllEvents'
import AllPromoted from './AllPromoted'
import UserByID from './UserByID'
import EventsByID from './EventsByID'
import ReportsByID from './ReportsByID'

function AdminContent() {
  return (
    <section className='Admin_ContentSection'>
    <div className='Admin_ContentSectionContainer'>
        {/* <BrowserRouter> */}
            <Routes>
                <Route path='/allUser' element={ <AllUser />} />
                <Route path='/allBlocked' element={ <BlockedUsers />} /> 
                <Route path='/allReports' element={ <GetAllReports />} /> 
                <Route path='/allActive' element={ <ActiveUsers />} /> 
                <Route path='/allPending' element={ <GetAllPending />} /> 
                <Route path='/allEvents' element={ <AllEvents />} /> 
                <Route path='/allPromoted' element={ <AllPromoted />} /> 
                <Route path='/userbyID' element={ <UserByID />} /> 
                <Route path='/eventbyID' element={ <EventsByID />} /> 
                <Route path='/reportbyID' element={ <ReportsByID />} /> 
            </Routes>
        
        {/* </BrowserRouter> */}
 
  {/* <BlockedUsers /> */}
  {/* <GetAllReports />  */}
  </div>
  </section>
  )
}

export default AdminContent