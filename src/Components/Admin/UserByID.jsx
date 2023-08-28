import React from 'react'

function UserByID() {
  return (
    <>
    
    <div className='Content_Title'>
                  <h4>User (UserName)</h4>
                </div>
                <div className='Admin_ContentManager'>
                  <section className='Admin_AllUsers'>
                        <div className='User_ById'>

                      <div className='User_ByIdImage_Profile'>
                        {/* {
                          !e.profilePicture?<div className='AllUser_ProfileName'><h1>{e.firstname.charAt(0).toUpperCase()}{e.lastname.charAt(0).toUpperCase()}</h1> </div>
                          :<img src={e.profilePicture} alt="" />
                        } */}
                      </div>

                      <div style={{justifyContent:"center", gap:"15px"}} className='User_ByIdData_Profile'>
                          <div style={{display:"flex", flexDirection:"column",width:"90%", height:"50%", gap:"7px"}}>
                          <h5>Name:</h5>
                          <h5> Email:</h5>
                          <h5>isVerified:</h5>
                          <h5>Events:</h5>
                          <h5>Tickets:</h5>
                          <h5>Reports:</h5>
                          </div>
                      <button className='block_UserById' >Block</button>
                      <button className='delete_UserById' >Delete</button>
                      </div>
                    </div>

                  </section>
                </div>
    </>
  )
}

export default UserByID