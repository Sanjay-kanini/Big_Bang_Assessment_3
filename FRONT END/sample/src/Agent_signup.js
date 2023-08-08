import React, { useState } from 'react';
import axios from 'axios';
import Agent_Navbar from './Agent_Navbar';
import Footer from './Footer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AgencySignup = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    tourCompanyName: '',
    tourCompanyAddress: '',
    phoneNo: '',
    imageFile: null,
  });

  const [warnEmail, setWarnEmail] = useState(false);
  const [warnPass, setWarnPass] = useState(false);
  const [warnConfirmPass, setWarnConfirmPass] = useState(false);

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      imageFile: event.target.files[0],
    }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!emailPattern.test(inputs.email)) {
      setWarnEmail(true);
      isValid = false;
    } else {
      setWarnEmail(false);
    }

    if (inputs.password.trim() === '') {
      setWarnPass(true);
      isValid = false;
    } else if (inputs.password.trim().length < 6) {
      setWarnPass(true);
      isValid = false;
    } else {
      setWarnPass(false);
    }

    if (inputs.confirmPassword.trim() === '') {
      setWarnConfirmPass(true);
      isValid = false;
    } else {
      setWarnConfirmPass(false);
    }

    if (inputs.tourCompanyName.trim() === '') {
      isValid = false;
    }

    if (inputs.tourCompanyAddress.trim() === '') {
      isValid = false;
    }

    return isValid;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('email_id', inputs.email);
    formData.append('password', inputs.password);
    formData.append('confirmPassword', inputs.confirmPassword);
    formData.append('tour_company_name', inputs.tourCompanyName);
    formData.append('tour_company_address', inputs.tourCompanyAddress);
    formData.append('phone_no', inputs.phoneNo);
    formData.append('imageFile', inputs.imageFile);

    try {
      const response = await axios.post('https://localhost:7250/api/Tour_Agency', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Signup Successful!');
      window.location.href = '/login';
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <Agent_Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          marginTop:'25px'
        }}
      >
        <div
          style={{
            width: '400px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>KaniniAgent Signup</h2>
            <form onSubmit={submitForm}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={inputs.email}
                  onChange={inputEvent}
                  required
                />
                {warnEmail && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      marginTop: '5px',
                    }}
                  >
                    Invalid email address.
                  </p>
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={inputs.password}
                  onChange={inputEvent}
                  required
                />
                {warnPass && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      marginTop: '5px',
                    }}
                  >
                    Password must be at least 6 characters.
                  </p>
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={inputEvent}
                  required
                />
                {warnConfirmPass && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      marginTop: '5px',
                    }}
                  >
                    Confirm password cannot be empty.
                  </p>
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                  type="text"
                  placeholder="Enter Tour Company Name"
                  name="tourCompanyName"
                  value={inputs.tourCompanyName}
                  onChange={inputEvent}
                  required
                />
                {inputs.tourCompanyName.trim() === '' && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      marginTop: '5px',
                    }}
                  >
                    Tour company name cannot be empty.
                  </p>
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <textarea
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                  placeholder="Enter Tour Company Address"
                  name="tourCompanyAddress"
                  value={inputs.tourCompanyAddress}
                  onChange={inputEvent}
                  required
                />
                {inputs.tourCompanyAddress.trim() === '' && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      marginTop: '5px',
                    }}
                  >
                    Tour company address cannot be empty.
                  </p>
                )}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                  type="tel"
                  placeholder="Enter Phone Number"
                  name="phoneNo"
                  value={inputs.phoneNo}
                  onChange={inputEvent}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#17a2b8',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgencySignup;
