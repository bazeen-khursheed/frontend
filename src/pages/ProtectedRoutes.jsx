import React from 'react'
import Login from './Login'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    let token = localStorage.getItem("token")
    if (!token){
        return  <Navigate to={"/login"}/>
    } else{
       return children
    }
    
}

export default ProtectedRoutes
