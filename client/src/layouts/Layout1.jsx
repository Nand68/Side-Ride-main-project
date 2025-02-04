import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar2 from '../components/Navbar2'

const Layout1 = () => {
  return (
    <>
    <Navbar2/>
    <Outlet/>
    <ToastContainer/>
    </>
  )
}

export default Layout1