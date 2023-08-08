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
    //  admin nav
    
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token') !== null;
  const handleLogout = () => {
    localStorage.removeItem('tour_owner_id');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src="https://res.cloudinary.com/zoominfo-com/image/upload/w_120,h_120,c_fit/kanini.com"
            width="130"
            height="45"
            className="d-inline-block align-top"
            alt=""
            style={{ marginLeft: '45px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link
              to="/admin_home"
              className="nav-link"
              style={{
                fontSize: '20px',
                color: 'black',
                textDecorationLine: 'none',
                margin: '0 10px',
                marginLeft:'600px',
                marginTop:'20px'
              }}
            >
              Home
            </Link>
            <Link
              to="/manage_agenices"
              className="nav-link"
              style={{
                fontSize: '20px',
                color: 'black',
                textDecorationLine: 'none',
                margin: '0 10px',
                marginLeft:'40px',
                marginTop:'20px'
              }}
            >
              Manage Agencies
            </Link>
            <Nav.Link
              href="#"
              style={{
                fontSize: '20px',
                color: 'black',
                margin: '0 10px',
                marginTop: '17px',
                textDecorationLine: 'none',
                marginLeft:'40px',
                marginTop:'20px'
              }}
            >
              Update Tour
            </Nav.Link>
            {isLoggedIn ? (
              <NavDropdown
                id="basic-nav-dropdown"
                title={<CustomNavDropdownTitle />}
                alignRight
                style={{
                  fontSize: '20px',
                  margin: '0 10px',
                  marginTop: '10px',
                  marginLeft:'40px',
                  marginTop:'20px'
                }}
              >
                <NavDropdown.Item onClick={() => navigate('/user_login')}>
                  View Tours
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/user_login')}>
                  My Profile
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
                  margin: '0 10px',
                  marginTop: '10px',
                }}
              >
                <NavDropdown.Item onClick={() => navigate('/user_login')}>
                  Login
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Agent_Navbar;