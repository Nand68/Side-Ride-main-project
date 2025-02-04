import React, { useState } from 'react';
import { Menu, X, Home, Car, UserCircle, Clock, MapPin, MessageSquare, Search } from 'lucide-react';
import Logout from './Logout';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ href, icon: Icon, children }) => (
    <a
      href={href}
      className="flex items-center space-x-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-200"
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </a>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-4xl font-bold mb-4 md:mb-0">
          <span className="text-yellow-500">Side</span>
          <span className="text-white">Ride</span>
        </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/dashboard" icon={Search}>
              Search
            </NavLink>
            <NavLink href="/offer" icon={Car}>
              Create Ride
            </NavLink>
            <NavLink href="/profile" icon={UserCircle}>
              My Profile
            </NavLink>
            <NavLink href="/history" icon={Clock}>
              My Bookings
            </NavLink>
            <NavLink href="/myrides" icon={MapPin}>
              My Offered Rides
            </NavLink>
            <NavLink href="/complaintregister" icon={MessageSquare}>
              Support
            </NavLink>
            <div className="pl-4 border-l border-white/20">
              <Logout />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-1">
            <NavLink href="/dashboard" icon={Home}>
              Home
            </NavLink>
            <NavLink href="/offer" icon={Car}>
              Create Ride
            </NavLink>
            <NavLink href="/profile" icon={UserCircle}>
              My Profile
            </NavLink>
            <NavLink href="/history" icon={Clock}>
              My Bookings
            </NavLink>
            <NavLink href="/myrides" icon={MapPin}>
              My Offered Rides
            </NavLink>
            <NavLink href="/complaintregister" icon={MessageSquare}>
              Support
            </NavLink>
            <div className="pt-4 border-t border-white/20">
              <Logout />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
