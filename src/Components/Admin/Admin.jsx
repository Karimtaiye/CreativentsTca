import React, { useEffect, useState } from 'react'
import './Admin.css'
import './AdminResponsive.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import AdminNav from './AdminNav'
import AdminContent from './AdminContent'

function Admin() {

  return (
    <div className='Admin_MainContaner'>
      <div className='Admin_MainContanerWrapper'>
            <AdminNav />
     
            <AdminContent />
      </div>
    </div>
  )
}

export default Admin