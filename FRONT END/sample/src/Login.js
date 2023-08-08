import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import User_Navbar from './User_Navbar'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Form = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [warnEmail, setWarnEmail] = useState(false);
  const [warnPass, setWarnPass] = useState(false);
  const [eye, setEye] = useState(true);
  const [pass, setPass] = useState('password');

  const [userLogin, setUserLogin] = useState(true);
  const navigate = useNavigate();

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setWarnEmail(false);
    setWarnPass(false);
    let isValid = true;

    if (inputs.email === '' || !emailPattern.test(inputs.email)) {
      setWarnEmail(true);
      isValid = false;
    }

    if (inputs.password === '') {
      setWarnPass(true);
      isValid = false;
    }

    return isValid;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const apiUrl = userLogin
      ? 'https://localhost:7097/api/Token/user'
      : 'https://localhost:7250/api/Token/Agents';

    const userData = {
      email_id: inputs.email,
      password: inputs.password,
    };
    axios
      .post(apiUrl, userData)
      .then((response) => {
        const data = response.data;

        if (data !== 'Invalid credentials') {
          const { token, user, tour } = data;
          alert('Logged in Successfully!');

          localStorage.setItem('token', token);
          if (userLogin) {
            navigate('/user_home');
            localStorage.setItem('user_id', user);
            localStorage.setItem('role', 'user');
            localStorage.removeItem('tour_owner_id');
          } else {
            navigate('/agent_homepage');

            localStorage.setItem('tour_owner_id', tour);
            localStorage.setItem('role', 'agent');
            localStorage.removeItem('user_id');
          }
        } else {
          alert('Invalid credentials');
        }
      })
      .catch((error) => {
        alert('Login failed. Please try again.');
      });
  };

  const Eye = () => {
    setPass((prevPass) => (prevPass === 'password' ? 'text' : 'password'));
    setEye((prevEye) => !prevEye);
  };

  const handleSliderToggle = () => {
    setUserLogin((prevUserLogin) => !prevUserLogin);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      
    },

    card: {
      width: '700px',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      overflow: 'hidden',
    },
    leftSide: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#f6f6f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      maxWidth: '100%',
    },
    rightSide: {
      flex: 1,
      padding: '20px',
    },
    toggleSwitch: {
      position: 'relative',
      width: '50px',
      height: '24px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      marginRight: '10px',
    },
    toggleSlider: {
      position: 'absolute',
      top: '1px',
      left: userLogin ? '1px' : '26px',
      width: '24px',
      height: '24px',
      background: '#fff',
      borderRadius: '50%',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      transition: '0.3s',
    },
    toggleLabel: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
    hello: {
      marginBottom: '40px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    inputWrapper: {
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      outline: 'none',
    },
    warning: {
      borderColor: 'red',
    },
    danger: {
      color: 'red',
      marginTop: '5px',
    },
    eyeIcon: {
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    },
    recovery: {
      fontSize: '14px',
      color: '#333',
      textAlign: 'right',
      marginBottom: '10px',
    },
    btn: {
      textAlign: 'center',
    },
    submitBtn: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      outline: 'none',
    },
    or: {
      fontSize: '14px',
      color: '#333',
      textAlign: 'center',
      marginTop: '20px',
    },
    signUpLink: {
      color: 'blue',
      textDecoration: 'none',
    },
  };

  return (
    <div>
      
   <User_Navbar/>
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.leftSide}>
          <img src="https://imgur.com/XaTWxJX.jpg" alt="Logo" style={styles.logo} />
        </div>

        <div style={styles.rightSide}>
          <div style={styles.toggleSwitch} onClick={handleSliderToggle}>
            <input
              type="checkbox"
              style={{ opacity: '0', width: '0', height: '0' }}
              checked={!userLogin}
              onChange={() => {}}
            />
            <span style={styles.toggleSlider}></span>
          </div>
          <span style={styles.toggleLabel}>
   
          </span>

          <div style={styles.hello}>
            {userLogin ? <h3>Hello User!</h3> : <h3>Hello Travel Agent!</h3>}
            <h4>Welcome back, you have been missed!</h4>
          </div>

          <form onSubmit={submitForm}>
            <div style={styles.inputWrapper}>
              <input
                style={{
                  ...styles.input,
                  ...(warnEmail ? styles.warning : {}),
                }}
                type="text"
                placeholder="Enter Email"
                name="email"
                value={inputs.email}
                onChange={inputEvent}
              />
              {warnEmail && (
                <p style={styles.danger}>
                  <i className="fa fa-warning"></i>Please enter a valid email address.
                </p>
              )}
            </div>
            <div style={styles.inputWrapper}>
              <input
                style={{
                  ...styles.input,
                  ...(warnPass ? styles.warning : {}),
                }}
                type={pass}
                placeholder="Enter Password"
                name="password"
                value={inputs.password}
                onChange={inputEvent}
              />
              <i
                style={styles.eyeIcon}
                onClick={Eye}
                className={`fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
              ></i>
              {warnPass && (
                <p style={styles.danger}>
                  <i className="fa fa-warning"></i>Please enter a password.
                </p>
              )}
            </div>
            <div style={styles.recovery}>
              <p>Recovery Password</p>
            </div>
            <div style={styles.btn}>
              <button type="submit" style={styles.submitBtn}>
                Sign in
              </button>
            </div>
          </form>

          <hr />
          <div style={styles.or}>
            New User?&nbsp;&nbsp;
            <Link style={styles.signUpLink} to={userLogin ? '/user_signup' : '/agent_signup'}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Form;
