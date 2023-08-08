import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin_Navbar from "./Admin_Navbar";
import { useNavigate } from "react-router-dom";
const TourAgencies = () => {
  const [tourAgencies, setTourAgencies] = useState([]);
  const [selectedTourOwnerId, setSelectedTourOwnerId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
    if (!isAuthenticated) {
      navigate('/admin_login'); // Redirect to the login page if not authenticated
    } else if (userRole !== 'admin') {
      navigate('/admin_login'); // Redirect to a different page if the role is not "user"
    } else {
      fetchTourAgencies();
    }
    
  }, []);

  const fetchTourAgencies = async () => {
    try {
      const response = await axios.get("https://localhost:7250/api/Tour_Agency/accepted");
      setTourAgencies(response.data);
    } catch (error) {
      console.error("Error fetching tour agencies:", error);
    }
  };

  const handleDecline = async () => {
    try {
      if (selectedTourOwnerId) {
        await axios.put(
          `https://localhost:7250/api/Tour_Agency/status_decline/${selectedTourOwnerId}`
        );
        // Remove the declined tour agency from the tourAgencies state
        setTourAgencies((prevTourAgencies) =>
          prevTourAgencies.filter((agency) => agency.tour_owner_id !== selectedTourOwnerId)
        );
        setSelectedTourOwnerId(null);
        setShowWarning(false);
      }
    } catch (error) {
      console.error("Error declining tour agency:", error);
    }   
  };

  const handleDeclineConfirmation = (tourOwnerId) => {
    setSelectedTourOwnerId(tourOwnerId);
    setShowWarning(true);
  };

  const handleCancelDecline = () => {
    setSelectedTourOwnerId(null);
    setShowWarning(false);
  };

  return (
    <div>
      <Admin_Navbar />
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Tour Agencies</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tourAgencies.map((agency) => (
          <div
            key={agency.id}
            style={{
              width: "300px",
              margin: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <h5 style={{ fontSize: "20px", marginBottom: "10px" }}>{agency.tour_company_name}</h5>
            <p style={{ fontSize: "16px", margin: "5px 0" }}>Email: {agency.email_id}</p>
            <p style={{ fontSize: "16px", margin: "5px 0" }}>Phone: {agency.phone}</p>
            <p style={{ fontSize: "16px", margin: "5px 0" }}>Address: {agency.tour_company_address}</p>
            {/* Add other agency details as needed */}
            <div>
              <button
                style={{
                  backgroundColor: "#FF6347",
                  color: "#FFF",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDeclineConfirmation(agency.tour_owner_id)}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
      {showWarning && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            Are you sure you want to decline this tour agency?
          </p>
          <button
            style={{
              backgroundColor: "#FF6347",
              color: "#FFF",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={handleDecline}
          >
            Yes
          </button>
          <button
            style={{
              backgroundColor: "#4682B4",
              color: "#FFF",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleCancelDecline}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default TourAgencies;
