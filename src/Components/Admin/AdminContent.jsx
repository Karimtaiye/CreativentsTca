import React from 'react'
import { Routes, Route} from 'react-router-dom'
import AllUser from './AllUser'
import BlockedUsers from './BlockedUsers'
import GetAllReports from './GetAllReports'

function AdminContent() {
  return (
    <section className='Admin_ContentSection'>
    <div className='Admin_ContentSectionContainer'>
        {/* <BrowserRouter> */}
            <Routes>
                {/* <Route path='/' element={ <AllUser />} />
                <Route path='/' element={ <BlockedUsers />} /> */}
                <Route path='/' element={ <GetAllReports />} />
            </Routes>
        
        {/* </BrowserRouter> */}
 
  {/* <BlockedUsers /> */}
  {/* <GetAllReports />  */}
  </div>
  </section>
  )
}

export default AdminContent