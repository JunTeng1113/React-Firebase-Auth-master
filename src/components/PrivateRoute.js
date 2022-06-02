import React from "react"
import { Route, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute() {
  const { currentUser } = useAuth() // 有登入就會有資料，沒有資料就跳轉到登入畫面
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
