import React from "react"
import { Navigate, useLocation } from "react-router-dom"


export const PrivateRoute = ({children}) => {
    const location = useLocation()
    const authToken = sessionStorage.getItem("auth_Token")
    
    return authToken ? children : <Navigate to="/login" state={{ from: location }} replace />
}