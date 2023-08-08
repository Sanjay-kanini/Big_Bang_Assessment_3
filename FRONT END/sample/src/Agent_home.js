import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Agent_Navbar from './Agent_Navbar';
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Assuming the tour_owner_id is stored in localStorage
  const localTourOwnerId = localStorage.getItem('tour_owner_id');
const navigate = useNavigate();
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(`https://localhost:7250/api/Add_Tour/tour_owner_id/${localTourOwnerId}`);
        setTourData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tour data:', error);
        setIsLoading(false);
      }
    };
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else if (userRole !== 'agent') {
      navigate('/login'); // Redirect to a different page if the role is not "user"
    } else {
        fetchTourData();
    }
   
  }, [localTourOwnerId]);

  return (
    <div>
      <div><Agent_Navbar/></div>
      <div
        style={{
          backgroundColor: "#17a2b8",
          color: "#fff",
          textAlign: "center",
          padding: "40px 0",
        }}
      >
        <div className="container" style={{marginTop:'100px'}}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Welcome to Awesome Travel Agency
          </h1>
          <p style={{ fontSize: "24px" }}>Plan Your Dream Vacation Today!</p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            tourData.map((tour) => (
              <div key={tour.tour_id} className="col-md-4">
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                  }}
                >
                  <img
                    src={`https://localhost:7250/uploads/${tour.hotel_image}`}
                    className="img-fluid"
                    alt={tour.tour_name}
                    style={{ maxHeight: "120px", objectFit: "cover" }} // Adjust the maximum height as needed
                  />
                  <div style={{ marginTop: "10px" }}>
                    <h5 style={{ fontSize: "24px", marginBottom: "10px" }}>
                      {tour.tour_name}
                    </h5>
                  <p>  Duration: {tour.tour_duration_days} Days and {tour.tour_duration_nights} Nights
                        </p>
                    <p style={{ fontSize: "16px" }}>{tour.description}</p>
                    <a
                      href="#"
                      style={{
                        display: "block",
                        backgroundColor: "#17a2b8",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                    Upate Package
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
