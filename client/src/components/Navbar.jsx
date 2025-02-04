import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-700 shadow-lg fixed w-full top-0 z-50">
      <div className="flex justify-between items-center w-full h-16 px-8 text-white">
        {/* Logo with Enhanced Animation and Font */}
        <div className="text-4xl font-bold mb-4 md:mb-0">
          <span className="text-yellow-500">Side</span>
          <span className="text-white">Ride</span>
        </div>

        {/* Navigation Links with Enhanced Styling */}
        <div className="flex items-center space-x-6">
          <a
            href="/"
            className="text-md font-medium hover:bg-white/20 text-white rounded-lg px-5 py-2 
                       transition-all duration-300 ease-in-out transform hover:scale-105 
                       border border-white/10 hover:border-white/30"
          >
            Home
          </a>
          <a
            href="/login"
            className="text-md font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg 
                       px-5 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 
                       border border-white/20 hover:border-white/40"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;