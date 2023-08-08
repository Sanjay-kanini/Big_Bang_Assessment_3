import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const CustomNavDropdownTitle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleDropdown} style={{ fontSize: '20px', cursor: 'pointer' }}>
      <img
        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        alt=""
        style={{ width: '30px', height: '30px', marginRight: '5px' }}
      />
    </div>
  );
};

const Agent_Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token') !== null;
  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Navbar.Brand href="#home">
        <img
          src="https://res.cloudinary.com/zoominfo-com/image/upload/w_120,h_120,c_fit/kanini.com"
          width="130"
          height="45"
          className="d-inline-block align-top"
          alt=""
          style={{ marginLeft: '65px' }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link
            to="/user_home"
            className="nav-link"
            style={{
              fontSize: '20px',
              color: 'black',
              textDecorationLine: 'none',
              margin: '0 10px',
              marginLeft:'700px',
              marginTop:'20px'
            }}
          >
            Home
          </Link>
          <Link
            to="/my_tours"
            className="nav-link"
            style={{
              fontSize: '20px',
              color: 'black',
              textDecorationLine: 'none',
              margin: '0 10px',
              marginLeft:'30px',
              marginTop:'20px'
            }}
          >
            My Tours
          </Link>
          <Link
            to="/user_home"
            className="nav-link"
            style={{
              fontSize: '20px',
              color: 'black',
              textDecorationLine: 'none',
              margin: '0 10px',
              marginLeft:'30px',
              marginTop:'20px'
            }}
          >
            Contact US
          </Link>
          {isLoggedIn ? (
            <NavDropdown
              id="basic-nav-dropdown"
              title={<CustomNavDropdownTitle />}
              alignRight
              style={{
                fontSize: '20px',
                marginLeft: '10px',
                marginTop: '20px',
              }}
            >
              <NavDropdown.Item onClick={() => navigate('/user_profile')}>
                My profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/agent_signup')}>
                Agency
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown
              id="basic-nav-dropdown"
              title={<CustomNavDropdownTitle />}
              alignRight
              style={{
                fontSize: '20px',
                marginLeft: '10px',
                marginTop: '10px',
              }}
            >
              <NavDropdown.Item onClick={() => navigate('/login')}>
                User Login
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/login')}>
                Agent Login
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/admin_login')}>
               Admin Login
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Agent_Navbar;
