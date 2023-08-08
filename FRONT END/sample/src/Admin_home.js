import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Admin_Navbar from './Admin_Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'
const TourAgencyCard = ({ tourOwnerId, name, address, status, onAccept }) => {

  return (
    <div style={{ width: '300px', margin: '10px', display: 'inline-block' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        {/* <h5 className="card-title">Tour Owner ID: {tourOwnerId}</h5> */}
        <p style={{ fontSize: '18px', margin: '5px 0' }}>Name: {name}</p>
        <p style={{ fontSize: '18px', margin: '5px 0' }}>Address: {address}</p>
        <p style={{ fontSize: '18px', margin: '5px 0' }}>Status: {status}</p>
        <button
          style={{
            backgroundColor: '#4682B4',
            color: '#FFF',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          
          }}
          onClick={onAccept}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

const AdminHomePage = () => {
  const [requestedTourAgencies, setRequestedTourAgencies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
   
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
    if (!isAuthenticated) {
      navigate('/admin_login'); // Redirect to the login page if not authenticated
    } else if (userRole !== 'admin') {
      navigate('/admin_login'); // Redirect to a different page if the role is not "user"
    } else {
      fetchRequestedTourAgencies();
    }
  }, []);

  const fetchRequestedTourAgencies = async () => {
    try {
      const response = await axios.get('https://localhost:7250/api/Tour_Agency/requested');
      setRequestedTourAgencies(response.data);
    } catch (error) {
      console.error('Error fetching tour agencies:', error);
    }
  };

  const handleAccept = async (tourOwnerId) => {
    try {
      const response = await axios.put(`https://localhost:7250/api/Tour_Agency/status/${tourOwnerId}`);
      // Handle the response as needed
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error accepting tour agency:', error);
    }
  };

  return (
    <div>
      <Admin_Navbar />

      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Requested Tour Agencies</h1>
      <div>
        {requestedTourAgencies.map((agency) => (
          <TourAgencyCard
            key={agency.id} // Replace 'id' with the unique identifier of the tour agency
            // tourOwnerId={agency.tour_owner_id}
            name={agency.tour_company_name}
            address={agency.tour_company_address}
            status={agency.status}
            onAccept={() => handleAccept(agency.tour_owner_id)}
          />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default AdminHomePage;
