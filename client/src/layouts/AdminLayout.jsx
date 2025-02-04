import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AdminLayout = () => {
  return (
    <>
    <NavbarAdmin/>
    <Outlet/>
    <ToastContainer/>
    </>
  )
}

export default AdminLayout