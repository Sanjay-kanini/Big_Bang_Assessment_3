import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#222',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    position: '',
    bottom: 0,
    width: '100%',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const sectionStyle = {
    flex: '1 1 33%',
    padding: '0 10px',
    marginBottom: '20px',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const sectionLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '5px',
  };

  const socialIconsStyle = {
    fontSize: '24px',
    marginRight: '10px',
    color: '#fff',
    textDecoration: 'none',
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px',
  };

  const subscribeButtonStyle = {
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <footer style={footerStyle}>
      <div className="container" style={containerStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Quick Links</h3>
          <a href="#" style={sectionLinkStyle}>Home</a>
          <a href="#tour" style={sectionLinkStyle}>Tours</a>
          <a href="#" style={sectionLinkStyle}>Destinations</a>
          <a href="#aboutus" style={sectionLinkStyle}>About Us</a>
          <a href="#" style={sectionLinkStyle}>Contact</a>
        </div>
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Follow Us</h3>
          <a href="https://www.facebook.com/gtholidays" style={socialIconsStyle}>
            <i className="bi bi-facebook"></i>
          </a>
          <a href="" style={socialIconsStyle}>
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://www.instagram.com/p/CtsuxXxyCBj/?img_index=1" style={socialIconsStyle}>
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.youtube.com/c/GTHolidaysLtd" style={socialIconsStyle}>
            <i className="bi bi-pinterest"></i>
          </a>
        </div>
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Subscribe</h3>
          <p>Subscribe to our newsletter for updates:</p>
          <input type="email" placeholder="Enter your email" style={inputStyle} />
          <button type="button" style={subscribeButtonStyle}>Subscribe</button>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p>&copy; 2023 Your Travel Agency. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
