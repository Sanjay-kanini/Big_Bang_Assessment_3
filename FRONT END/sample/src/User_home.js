import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from './User_Navbar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { Carousel } from "react-responsive-carousel"; // Import the Carousel component
import Footer from "./Footer";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI

const UserHomePage = () => {
  const [tourCompanies, setTourCompanies] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

   // New state for feedback data

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchTourCompanies();
      fetchFeedbackData();
      setIsLoading(false);
    }, 5000);
  
  }, []);

  const fetchTourCompanies = async () => {
    try {
      const response = await axios.get("https://localhost:7250/api/Tour_Agency/accepted");
      setTourCompanies(response.data);
    } catch (error) {
      console.error("Error fetching tour companies:", error);
    }
  };
  const fetchFeedbackData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://localhost:7250/api/Feedback");
      const sortedFeedback = response.data.sort((a, b) => b.feedback_id - a.feedback_id);
      setTimeout(() => {
        setFeedbackData(sortedFeedback.slice(0, 4));
        setIsLoading(false);
      }, 500); // Simulate loading for 3 seconds
    } catch (error) {
      console.error("Error fetching feedback data:", error);
      setIsLoading(false);
    }
  };
  
  


  const handleViewTours = (tourOwnerId) => {
    localStorage.setItem('tour_owner_id', tourOwnerId);
    navigate(`/view_tours/${tourOwnerId}`);
  };

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "20px",
    },
    cardImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    cardTitle: {
      fontSize: "24px",
      marginBottom: "10px",
    },
    cardDescription: {
      fontSize: "16px",
      marginBottom: "10px",
    },
    learnMoreLink: {
      display: "block",
      backgroundColor: "#17a2b8",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "4px",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
    },
    feedbackCard: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "20px",
      backgroundColor: "#f7f7f7",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      flex: 1,
      marginRight: "15px", // Add some space between cards
    },
    reviewsHeader: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "20px",
      backgroundColor: "#36cee6", // Background color
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
  };
  const renderStarRating = (rating) => {
    const filledStars = Array.from({ length: rating }, (_, index) => (
      <span key={index} className="star-filled">&#9733;</span>
    ));
    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
      <span key={index} className="star-empty">&#9734;</span>
    ));
    return (
      <div className="star-rating">
        {filledStars}
        {emptyStars}
      </div>
    );
  };

  return (
    <div>
      <UserNavbar />
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}>
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
<div style={{ fontFamily: "Roboto" ,marginTop:'150px'}}>
      <div
        style={{
          backgroundColor: "#17a2b8",
          color: "#fff",
          textAlign: "center",
          padding: "30px 0",
          marginTop:'10px'
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Welcome to  Kanini Tours
          </h1>
          <p style={{ fontSize: "24px" }}>Plan Your Dream Vacation Today!</p>
        </div>
      </div>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000} // Change the interval as needed
        showThumbs={false}
        showStatus={false}
      >
        {/* Slide 1 */}
        <div>
          <img src="https://www.sismarketresearch.com/wp-content/uploads/2015/12/sis-travel-tourism.jpg" alt="Slide 1" style={{width:'1000px',height:'500px'  ,marginTop:'30px'}} />
        </div>
        {/* Slide 2 */}
        <div>
          <img src="https://www.grandbalitour.com/wp-content/uploads/2017/02/bali-tour-package.jpg" alt="Slide 2" style={{width:'1000px',height:'500px',marginTop:'30px'}} />
        </div>
        {/* Slide 3 */}
        <div>
          <img src="https://images.unsplash.com/photo-1598402453861-4fbcbf6ced3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmlhZ2FyYSUyMGZhbGxzJTIwY2FuYWRhfGVufDB8fDB8fHww&w=1000&q=80" alt="Slide 3" style={{width:'1000px',height:'500px',marginTop:'30px'}} />
        </div>
      </Carousel>

      <div className="container mt-5" id="tour">
        <div className="row">
          {tourCompanies.map((tourCompany) => (
            <div className="col-md-4" key={tourCompany.tour_owner_id}>
              <div
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                 <img src={`https://localhost:7250/uploads/${tourCompany.company_logo}`} className="img-fluid"  

                  alt={tourCompany.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h5 style={{ fontSize: "24px", marginBottom: "10px" }}>{tourCompany.tour_company_name}</h5>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>{tourCompany.description}</p>
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
                    textAlign: "center",
                  }}
                  onClick={() => handleViewTours(tourCompany.tour_owner_id)}
                >
                  View Packages
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-5" id="aboutus">
        <div className="row">
          <div className="col-md-12">
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
                backgroundColor: "#f7f7f7",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                 style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  backgroundColor: "#36cee6", // Background color
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                What We Do
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "20px",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                At Kanini Tours, we specialize in crafting memorable travel
                experiences for individuals, families, and groups. Our team of
                experienced professionals meticulously plan and organize every
                detail of your journey, from transportation and accommodations
                to guided tours and activities.
              </p>
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "20px",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                We take pride in our collaborations with a diverse network of exceptional travel
                agents who share our commitment to delivering top-notch service
                and unforgettable adventures. Our roster of agents represents a
                wide range of destinations and expertise, ensuring that your
                travel aspirations are met with personalized itineraries and
                seamless planning.
              </p>
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "0",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                Whether you're dreaming of a relaxing beach getaway, a cultural
                exploration, or an adrenaline-packed adventure, our dedicated
                team of agents will work closely with you to turn your travel
                dreams into reality.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5" id="feedback">
          <div className="row">
            <div className="col-md-12">
              <div style={styles.card}>
                <h2 style={styles.reviewsHeader}>Customer Reviews</h2>
                {isLoading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    {feedbackData.map((feedback) => (
                      <div key={feedback.feedback_id} style={styles.feedbackCard}>
                        {renderStarRating(feedback.rating)}
                        <p style={styles.cardDescription}>{feedback.feedback}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      <Footer />
    </div>
          )}

    </div>
  );
};

export default UserHomePage;
