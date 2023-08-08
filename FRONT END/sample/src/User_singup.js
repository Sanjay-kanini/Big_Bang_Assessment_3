import React, { useState } from 'react';
import axios from 'axios';
import User_Navbar from './User_Navbar';
import Footer from './Footer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    dob: '',
    gender: '',
    address: '',
    phoneNo: '',
  });

  const [warnPhoneNo, setWarnPhoneNo] = useState(false);
  const [warnDob, setWarnDob] = useState(false); // New state for Date of Birth warning

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

  const validateForm = () => {
    let isValid = true;

    if (!emailPattern.test(inputs.email)) {
      setWarnEmail(true);
      isValid = false;
    } else {
      setWarnEmail(false);
    }

    if (inputs.password.length < 8) {
      setWarnPass(true);
      isValid = false;
    } else {
      setWarnPass(false);
    }

    if (inputs.password !== inputs.confirmPassword) {
      setWarnConfirmPass(true);
      isValid = false;
    } else {
      setWarnConfirmPass(false);
    }

    const currentDate = new Date();
    const selectedDate = new Date(inputs.dob);
    if (selectedDate > currentDate) {
      setWarnDob(true);
      isValid = false;
    } else {
      setWarnDob(false);
    }


    if (!/^\d{10}$/.test(inputs.phoneNo)) {
      setWarnPhoneNo(true);
      isValid = false;
    } else {
      setWarnPhoneNo(false);
    }

    return isValid;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const apiUrl = 'https://localhost:7097/api/User';
    const userData = {
      email_id: inputs.email,
      password: inputs.password,
      user_name: inputs.userName,
      dob: inputs.dob,
      gender: inputs.gender,
      address: inputs.address,
      phone_no: inputs.phoneNo,
    };

    axios
      .post(apiUrl, userData)
      .then((response) => {
        alert('Signup Successful!');
        window.location.href = '/login';
      })
      .catch((error) => {
        alert('Signup failed. Please try again.');
      });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      backgroundColor: '#f5f5f5',
    },
    formContainer: {
      width: '100%',
      maxWidth: '700px',
      padding: '20px',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: 'white',
    },
    heading: {
      color: '#00a680',
      marginTop: '5px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    label: {
      marginBottom: '5px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      marginBottom: '10px',
    },
    dobError: {
      color: 'red',
      fontSize: '12px',
      margin: '5px 0',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      margin: '5px 0',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#00a680',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    link: {
      fontSize: '14px',
      color: '#555',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      
    },
    gridItem: {
      gridColumn: 'span 1',
    },
  };

  return (
    <>
      <div style={{ fontFamily: 'Roboto', marginTop: '150px',marginBottom:'00px' }}>
        <User_Navbar />
      </div>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={styles.heading}>
            <h3>Create a Kanini Account</h3>
          </div>
          <form onSubmit={submitForm}>
            <div style={styles.gridContainer}>
              <div style={styles.gridItem}>
                <label style={styles.label}>Email *</label>
                <input
                  style={{
                    ...styles.input,
                    border: warnEmail ? '1px solid red' : '1px solid #ccc',
                  }}
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={inputs.email}
                  onChange={inputEvent}
                  required
                />
                {warnEmail && (
                  <p style={styles.error}>Invalid email address.</p>
                )}
              </div>
              <div style={styles.gridItem}>
                <label style={styles.label}>Password *</label>
                <input
                  style={{
                    ...styles.input,
                    border: warnPass ? '1px solid red' : '1px solid #ccc',
                  }}
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={inputs.password}
                  onChange={inputEvent}
                  required
                />
                {warnPass && (
                  <p style={styles.error}>Password must be at least 8 characters.</p>
                )}
              </div>
              <div style={styles.gridItem}>
                <label style={styles.label}>Confirm Password *</label>
                <input
                  style={{
                    ...styles.input,
                    border: warnConfirmPass ? '1px solid red' : '1px solid #ccc',
                  }}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={inputEvent}
                  required
                />
                {warnConfirmPass && (
                  <p style={styles.error}>Passwords do not match.</p>
                )}
              </div>
              <div style={styles.gridItem}>
                <label style={styles.label}>User Name *</label>
                <input
                  style={{
                    ...styles.input,
                    border: '1px solid #ccc',
                  }}
                  type="text"
                  placeholder="Enter User Name"
                  name="userName"
                  value={inputs.userName}
                  onChange={inputEvent}
                  required
                />
              </div>
              <div style={styles.gridItem}>
        <label style={styles.label}>Date of Birth *</label>
        <input
          style={{
            ...styles.input,
            border: warnDob ? '1px solid red' : '1px solid #ccc',
          }}
          type="date"
          placeholder="Enter Date of Birth"
          name="dob"
          value={inputs.dob}
          onChange={inputEvent}
          required
        />
        {warnDob && (
          <p style={styles.dobError}>Date of Birth cannot be a future date.</p>
        )}
      </div>
              <div style={styles.gridItem}>
                <label style={styles.label}>Gender *</label>
                <select
                  style={{
                    ...styles.input,
                    border: '1px solid #ccc',
                  }}
                  name="gender"
                  value={inputs.gender}
                  onChange={inputEvent}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.gridItem}>
                <label style={styles.label}>Address *</label>
                <input
                  style={{
                    ...styles.input,
                    border: '1px solid #ccc',
                  }}
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={inputs.address}
                  onChange={inputEvent}
                  required
                />
              </div>
              <div style={styles.gridItem}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  style={{
                    ...styles.input,
                    border: warnPhoneNo ? '1px solid red' : '1px solid #ccc',
                  }}
                  type="tel"
                  placeholder="Enter Phone Number"
                  name="phoneNo"
                  value={inputs.phoneNo}
                  onChange={inputEvent}
                  required
                />
                {warnPhoneNo && (
                  <p style={styles.error}>Please enter a valid 10-digit phone number.</p>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button style={styles.button} type="submit">
                Create Account
              </button>
            </div>
          </form>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={styles.link}>
              Already a member? <a href="/" style={{ ...styles.link, color: '#00a680' }}>Log in</a>
            </p>
          </div>
        </div>
      </div>
      <Footer style={{marginTop:'350px'}} />
    </>
  );
};

export default Signup;
