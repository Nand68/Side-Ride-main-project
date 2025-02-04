import React from 'react';

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">SideRide</h3>
            <p className="text-gray-400 mb-4">
              Making your journey comfortable and memorable with reliable ride-sharing services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">VVP Engineering College, Rajkot</li>
              <li>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                  +123 456 7890
                </a>
              </li>
              <li>
                <a href="mailto:support@sideride.com" className="text-gray-400 hover:text-white transition-colors">
                  support@sideride.com
                </a>
              </li>
              <li className="text-gray-400">24/7 Support Available</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for updates and offers</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-gray-600 text-gray-200"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} SideRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;