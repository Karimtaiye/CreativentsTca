import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'


const UserAuth = () => {
    const userLogin = useSelector(state => state.events.user)
    const userAuth = userLogin.token
    const location = useLocation();
    
  return (
    userAuth? <Outlet />: <Navigate to="/login" state={{ from : location }} replace />
  )
}

export default UserAuth