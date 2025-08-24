import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { FaSignOutAlt, FaUser, FaBars, FaTimes } from 'react-icons/fa'; // Import FaBars and FaTimes
import logo from '../../assets/logo.png';
import { NAVIGATION_LINKS, LOGIN_BUTTON } from '../../constants/navigationConstants';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import OptimizedImage from './OptimizedImage';
import {
  logoutUser,
  selectIsAuthenticated,
  selectUser,
  selectUserName,
  selectUserInitials,
  selectUserRole,
  selectIsLoading,
} from '../../redux/Slices/userSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state for mobile menu
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Redux selectors for authentication state
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userName = useSelector(selectUserName);
  const userInitials = useSelector(selectUserInitials);
  const userRole = useSelector(selectUserRole);
  const isLoading = useSelector(selectIsLoading);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen, isMobileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setIsProfileMenuOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/');
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getVisibleLinks = () => {
    return NAVIGATION_LINKS.filter(link => {
      if (link.path === '/statistics') {
        return isAuthenticated;
      }
      return true;
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6">
      <div className={`bg-white shadow-xl px-8 py-4 flex items-center justify-between transition-all duration-300 ${
        isMobileMenuOpen ? 'rounded-t-3xl rounded-b-none' : 'rounded-3xl'
      }`}>
        {/* LOGO */}
        <div className="flex items-center flex-shrink-0">
          <OptimizedImage
            src={logo}
            alt="BARNACLEAN"
            className="h-10 sm:h-12 md:h-14 object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => handleNavigation('/')}
            loading="eager"
          />
        </div>

        {/* NAV LINKS (Desktop) */}
        <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-6 text-base font-medium flex-1 ml-8">
          {getVisibleLinks().map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.path)}
              aria-label={`Maps to ${link.label} page`}
              aria-current={isActivePath(link.path) ? 'page' : undefined}
              className={`relative px-4 py-2 rounded-lg ${DESIGN_TOKENS.animations.transition.fast} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
                isActivePath(link.path)
                  ? 'text-blue-600 bg-blue-50 font-semibold shadow-sm'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Authentication Section (Desktop) */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2 ml-6">
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  aria-label="User profile menu"
                  aria-expanded={isProfileMenuOpen}
                  className={`flex items-center space-x-3 p-2 rounded-lg ${DESIGN_TOKENS.animations.transition.fast} focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50`}
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
                    {userInitials || <FaUser className="text-sm" />}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-gray-700 leading-tight">
                      {userName || user?.email?.split('@')[0] || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 leading-tight font-medium">
                      {userRole || 'Member'}
                    </span>
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => { handleNavigation('/profile'); }}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <CgProfile className="text-gray-500" />
                      <span>View Profile</span>
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={() => handleNavigation(LOGIN_BUTTON.path)}
                className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded-lg whitespace-nowrap"
              >
                {LOGIN_BUTTON.label}
              </button>
              <button
                onClick={() => handleNavigation('/signup')}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-base font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open mobile menu"
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" /> // 'X' icon when open
            ) : (
              <FaBars className="h-6 w-6" /> // Burger icon when closed
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden absolute left-0 right-0 top-full bg-white shadow-lg pb-4 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } ${isMobileMenuOpen ? 'block' : 'hidden'} rounded-b-3xl left-0 right-0 mx-4`}
      >
        <div className="flex flex-col space-y-2 py-4">
          {getVisibleLinks().map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.path)}
              aria-label={`Maps to ${link.label} page`}
              className={`w-full text-left px-4 py-2 rounded-lg ${DESIGN_TOKENS.animations.transition.fast} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
                isActivePath(link.path)
                  ? 'text-blue-600 bg-blue-50 font-semibold shadow-sm'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium'
              }`}
            >
              {link.label}
            </button>
          ))}
          <hr className="my-2 border-gray-200" />
          {isAuthenticated ? (
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavigation('/profile')}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-2">
                  <CgProfile className="text-gray-500" />
                  <span>View Profile</span>
                </div>
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                  <FaSignOutAlt className="text-red-500" />
                  <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavigation(LOGIN_BUTTON.path)}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              >
                {LOGIN_BUTTON.label}
              </button>
              <button
                onClick={() => handleNavigation('/signup')}
                className="w-full text-left px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;