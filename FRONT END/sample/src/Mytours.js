import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Card, Button, Tab, Tabs, Container, Col, Row } from 'react-bootstrap';
import User_Navbar from './User_Navbar'
import Footer from "./Footer";

const MyToursPage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else if (userRole !== 'user') {
      navigate('/login'); // Redirect to a different page if the role is not "user"
    } else {
      fetchUserBookings();
    }
  
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`https://localhost:7097/api/Booking/users/${userId}`);
      setUserBookings(response.data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };
  const navigate = useNavigate(); // Declare navigate function

  const today = new Date();
  const upcomingBookings = userBookings.filter(booking => new Date(booking.date_of_travel) >= today);
  const feedbackBookings = userBookings.filter(booking => new Date(booking.date_of_travel) < today);
  const cancelledBookings = userBookings.filter(booking => booking.status === 'Payment Pending');

  const tabPanelStyle = {
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    width: '100%', // Adjust the width of the card
    maxWidth: '500px', // Set the maximum width of the car
  };
  
  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
  const tabsStyle = {
    fontSize: '15px', // Increase font size for the tabs
    marginBottom: '20px', // Add some space below the tabs
  };
  const handleFeedbackClick = (bookingId) => {
    navigate(`/feedback/${bookingId}`); // Navigate to feedback component with booking ID parameter
  };

  return (
<div style={{ fontFamily: "Roboto" ,marginTop:'150px'}}>
       < User_Navbar/>

   
      <div style={{ padding: '20px' }}>
      <div
        style={{
          backgroundColor: "#17a2b8",
          color: "#fff",
          textAlign: "center",
          padding: "30px 0",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
           My Tours
          </h1>
          <p style={{ fontSize: "24px" }}>Plan Your Dream Vacation Today!</p>
        </div>
      </div >
        <Tabs defaultActiveKey="upcoming" id="my-tours-tabs" style={{fontSize:'20px',marginTop:'30px'}}>
        <Tab eventKey="upcoming" title="Upcoming"style={tabsStyle}>
          <Row>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Col key={booking.booking_id} xs={12} sm={6} md={4} lg={3}>
                 <div style={{ ...tabPanelStyle, ...cardStyle }}>
                    <Card>
                      <Card.Body>
                        <Card.Title>Tour: {booking.name}</Card.Title>
                        <Card.Text>Date of Travel: {booking.date_of_travel}</Card.Text>
                        <Button variant="primary" onClick={() => navigate(`/Pdf/${booking.booking_id}`)}>View Details</Button>
                        {booking.date_of_travel >= today ? (
                          <Button variant="primary">Give Feedback</Button>
                        ) : null}
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))
            ) : (
              <p>No upcoming bookings found.</p>
            )}
          </Row>
        </Tab>
          <Tab eventKey="feedback" title="Completed Trips"style={tabsStyle}>
            <Row>
              {feedbackBookings.length > 0 ? (
                feedbackBookings.map((booking) => (
                  <Col key={booking.booking_id} xs={12} sm={6} md={4} lg={3}>
                    <div style={tabPanelStyle}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Tour: {booking.name}</Card.Title>
                          <Card.Text>Date of Travel: {booking.date_of_travel}</Card.Text>
                          <Button variant="primary" onClick={() => handleFeedbackClick(booking.booking_id)}>Give Feedback</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))
              ) : (
                <p>No feedback bookings found.</p>
              )}
            </Row>
          </Tab>
          <Tab eventKey="cancelled" title="Cancelled"style={tabsStyle}>
            <Row>
              {cancelledBookings.length > 0 ? (
                cancelledBookings.map((booking) => (
                  <Col key={booking.booking_id} xs={12} sm={6} md={4} lg={3}>
                    <div style={tabPanelStyle}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Tour: {booking.name}</Card.Title>
                          <Card.Text>Date of Travel: {booking.date_of_travel}</Card.Text>
                          <Card.Text>Status: Cancelled (Payment Pending)</Card.Text>
                          {booking.status === 'Payment Pending' ? (
                            <Button variant="primary">View Details</Button>
                          ) : null}
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))
              ) : (
                <p>No cancelled bookings found.</p>
              )}
            </Row>
          </Tab>
        </Tabs>
      </div>
      <Footer/>
      </div>
  );
};

export default MyToursPage;
