import React from 'react'
import AdminLogout from './AdminLogout'
import { Link } from 'react-router-dom'

const NavbarAdmin = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
        <div className="text-4xl font-bold mb-4 md:mb-0">
          <span className="text-yellow-500 ">Side</span>
          <span className="text-white">Ride</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:gap-8 gap-4">
          <Link 
            to="/admin/dashboard" 
            className="text-lg font-semibold hover:text-orange-500 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/complaintlist" 
            className="text-lg font-semibold hover:text-orange-500 transition-colors duration-200"
          >
            Complaints
          </Link>
          <AdminLogout />
        </div>
      </div>
    </nav>
  )
}

export default NavbarAdmin