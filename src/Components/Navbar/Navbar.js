import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navbarRef = useRef(null);
  const location = useLocation(); // Get current location

  useEffect(() => {
    // Fetch userRole from localStorage on mount
    const role = localStorage.getItem('userRole');
    setUserRole(role || ''); // Default to empty string if null
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const handleLinkClick = () => {
    setIsNavActive(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(''); // Reset state to reflect logged-out status
    window.location.href = '/login';
  };

  const renderNavLinks = () => {
    // Function to check if the current path matches the link
    const isActiveLink = (path) => location.pathname === path ? 'active' : '';

    // If no userRole (not logged in), show default links
    if (!userRole) {
      return (
        <>
          <li>
            <Link to="/" className={isActiveLink('/')} onClick={handleLinkClick}><b>Home</b></Link>
          </li>
          <li>
            <Link to="/salon" className={isActiveLink('/salon')} onClick={handleLinkClick}><b>Salon</b></Link>
          </li>
          <li>
            <Link to="/beauty" className={isActiveLink('/beauty')} onClick={handleLinkClick}><b>Beauty</b></Link>
          </li>
          <li>
            <Link to="/skincare" className={isActiveLink('/skincare')} onClick={handleLinkClick}><b>Skincare</b></Link>
          </li>
          <li>
            <Link to="/login" className={isActiveLink('/login')} onClick={handleLinkClick}><b>Login</b></Link>
          </li>
        </>
      );
    }

    // Render links based on userRole
    switch (userRole) {
      case 'Admin':
        return (
          <>
            <li>
              <Link to="/users" className={isActiveLink('/users')} onClick={handleLinkClick}>Users</Link>
            </li>
            <li>
              <Link to="/serviceProviders" className={isActiveLink('/serviceProviders')} onClick={handleLinkClick}>Providers</Link>
            </li>
            <li>
              <Link to="/bookingDetails" className={isActiveLink('/bookingDetails')} onClick={handleLinkClick}>Bookings</Link>
            </li>
            <li>
              <Link to="/revenue" className={isActiveLink('/revenue')} onClick={handleLinkClick}>Revenue</Link>
            </li>
            <li>
              <Link to="/approvals" className={isActiveLink('/approvals')} onClick={handleLinkClick}>Approvals</Link>
            </li>
            <li>
              <Link to="/complaints" className={isActiveLink('/complaints')} onClick={handleLinkClick}>Complaints</Link>
            </li>
            <li>
              <Link to="/login" onClick={() => { handleLogout(); handleLinkClick(); }}>
                <b style={{ color: 'red' }}>Logout</b>
              </Link>
            </li>
          </>
        );

      case 'ServiceProvider':
        return (
          <>
            <li>
              <Link to="/services" className={isActiveLink('/services')} onClick={handleLinkClick}>Add Service</Link>
            </li>
            <li>
              <Link to="/AddEmployee" className={isActiveLink('/AddEmployee')} onClick={handleLinkClick}>Emp Management</Link>
            </li>
            <li>
              <Link to="/SpBookingDetails" className={isActiveLink('/SpBookingDetails')} onClick={handleLinkClick}>Bookings</Link>
            </li>
            <li>
              <Link to="/SPpaymentDetails" className={isActiveLink('/SPpaymentDetails')} onClick={handleLinkClick}>Payments</Link>
            </li>
            <li>
              <Link to="/login" onClick={() => { handleLogout(); handleLinkClick(); }}>
                <b style={{ color: 'red' }}>Logout</b>
              </Link>
            </li>
          </>
        );

      case 'User':
        return (
          <>
            <li>
              <Link to="/" className={isActiveLink('/')} onClick={handleLinkClick}><b>Home</b></Link>
            </li>
            <li>
              <Link to="/salon" className={isActiveLink('/salon')} onClick={handleLinkClick}><b>Salon</b></Link>
            </li>
            <li>
              <Link to="/beauty" className={isActiveLink('/beauty')} onClick={handleLinkClick}><b>Beauty</b></Link>
            </li>
            <li>
              <Link to="/skincare" className={isActiveLink('/skincare')} onClick={handleLinkClick}><b>Skincare</b></Link>
            </li>
            <li>
              <Link to="/bookings" className={isActiveLink('/bookings')} onClick={handleLinkClick}><b>Bookings</b></Link>
            </li>
            {/* <li>
              <Link to="/Payments" className={isActiveLink('/Payments')} onClick={handleLinkClick}><b>Payments</b></Link>
            </li> */}
            <li>
              <Link to="/login" onClick={() => { handleLogout(); handleLinkClick(); }}>
                <b style={{ color: 'red' }}>Logout</b>
              </Link>
            </li>
          </>
        );

      default:
        return null; // Fallback (shouldn't reach here due to !userRole check)
    }
  };

  return (
    <nav
      className="navbar"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 10,
      }}
      ref={navbarRef}
    >
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: '#1abc9c', fontStyle: "Cursive" }}>BeautyBliss</h1>
        </Link>
      </div>
      <button className="navbar-toggle" onClick={toggleNav}>
        ☰
      </button>
      <ul className={`navbar-links ${isNavActive ? 'active' : ''}`}>
        {renderNavLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
