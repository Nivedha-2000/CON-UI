import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Pages/Login/Login';
export default function Auth({authenticate}) {

    let navigate = useNavigate();

    const checkAuth = () => {
        authenticate()
        navigate('dashboard')
    }
  return (
    <div>
        <Login checkAuth={checkAuth} />
    </div>
  )
}
