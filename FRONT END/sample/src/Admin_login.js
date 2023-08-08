import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Navbar from './Admin_Navbar';
import Footer from './Footer';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [email_id, setEmailId] = useState('');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const ProceedLoginusingAPI = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const inputobj = {
          email_id: email_id,
          password: password,
        };

        const response = await fetch('https://localhost:7250/api/Token/Admin', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(inputobj),
        });

        if (response.ok) {
          const resp = await response.text();
          localStorage.setItem('role', 'admin');
          localStorage.setItem('token', resp);
          alert('Login Successful, Welcome Admin');
          navigate('/admin_home');
        } else {
          setEmailError('Invalid email or password');
          setPasswordError('Invalid email or password');
        }
      } catch (err) {
        console.error('Error:', err);
        setEmailError('An error occurred. Please try again.');
        setPasswordError('An error occurred. Please try again.');
      }
    }
  };

  const validate = () => {
    let isValid = true;

    if (email_id.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  return (
    <div>
      <Admin_Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <form onSubmit={ProceedLoginusingAPI} style={formStyle}>
          <h2 style={titleStyle}> Kanini Admin Login</h2>
          <div style={formGroupStyle}>
            <label style={labelStyle}>User Name <span style={requiredStyle}>*</span></label>
            <input
              value={email_id}
              onChange={(e) => setEmailId(e.target.value)}
              style={inputStyle}
              placeholder="Enter User Name"
            />
            <div style={errorStyle}>{emailError}</div>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password <span style={requiredStyle}>*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter Password"
            />
            <div style={errorStyle}>{passwordError}</div>
          </div>
          <div style={formButtonStyle}>
            <button type="submit" style={loginButtonStyle}>
              Login
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

// Inline Styles
const formStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '20px',
  marginTop:'-150px',
  width: '400px', // Increase the width for a larger form
};

const titleStyle = {
  textAlign: 'center',
};

const formGroupStyle = {
  marginBottom: '15px', // Increase the margin for more spacing between form groups
};

const labelStyle = {
  marginBottom: '5px',
  display: 'block',
};

const inputStyle = {
  width: '100%',
  padding: '10px', // Increase the padding for larger input fields
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const requiredStyle = {
  color: 'red',
};

const errorStyle = {
  fontSize: '14px',
  color: 'red',
  marginTop: '5px', // Add some margin to the error message
};

const formButtonStyle = {
  textAlign: 'center',
};

const loginButtonStyle = {
  width: '100%',
  backgroundColor: '#17a2b8',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
