import React from "react"
import { Route, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute() {
  const auth = useAuth();
  const { currentUser } = useAuth()
  console.log(`PrivateRoute:`)
  console.log(auth)
  console.log(currentUser)
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
