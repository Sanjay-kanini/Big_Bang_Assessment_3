// FeedbackForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import User_Navbar from './User_Navbar';
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  const [tour_id, setTour_id] = useState(201);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // New state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
const navigate= useNavigate();
  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };
  useEffect(() => {
   
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);
  const handleUserAction = () => {
    // Perform the action based on authentication and user role
    if (!isAuthenticated) {
      navigate('/login');
    } else if (userRole !== 'user') {
      // Redirect to a different page or show a message if user role is not "user"
      navigate('/different-page');
    } else {
      // Perform the action here (for example, call handleSubmit)
      handleSubmit();
    }
  };

  const handleSubmit = async (event) => {
    if(event){
      event.preventDefault();
    }
    


    try {
      const response = await axios.post('https://localhost:7250/api/Feedback', {
        user_id: user_id,
        rating: rating,
        feedback: feedbackText,
        tour_id: tour_id,
      });

      console.log('Feedback submitted:', response.data);

      // Clear the form after successful submission
      setRating(0);
      setFeedbackText('');
      setFeedbackSubmitted(true); // Update the state
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Inline styles
  const formContainerStyle = {
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    width: '100%',
    maxWidth: '400px', // Adjust the max width as needed
    margin: '0 auto', // Center the form horizontally
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom:'50px'
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
  };

  const submitButtonStyle = {
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
<div style={{ fontFamily: "Roboto" ,marginTop:'150px'}}>
      <User_Navbar />

      <div style={formContainerStyle} >
        {feedbackSubmitted ? (
          <p>Thanks for giving feedback! We look forward to your next trip.</p>
        ) : (
          <Form onSubmit={handleSubmit} >
            <Form.Group controlId="rating">
              <Form.Label style={labelStyle}>Rating</Form.Label>
              <Form.Control as="select" value={rating} onChange={handleRatingChange} style={inputStyle}>
                <option value={0}>Select Rating</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="feedbackText">
              <Form.Label style={labelStyle}>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={feedbackText}
                onChange={handleFeedbackChange}
                style={inputStyle}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={submitButtonStyle}>
              Submit Feedback
            </Button>
          </Form>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default FeedbackForm;
