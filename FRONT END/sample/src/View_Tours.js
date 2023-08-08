import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import User_Navbar from './User_Navbar';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
const ViewTourPage = () => {
    const { tourOwnerId } = useParams();
    const [agencyName, setAgencyName] = useState("");
    const [tours, setTours] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage

    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else if ( userRole!=='user' ){

      navigate('/login'); // Redirect to a different page if the role is not "user"
    } else {
        fetchTours();
    }

    }, []);

    const fetchTours = async () => {
        try {
            const response = await axios.get(`https://localhost:7250/api/Add_Tour/tour_owner_id/${tourOwnerId}`);
            setTours(response.data);
            if (response.data.length > 0) {
                setAgencyName(response.data[0].tour_Agency.tour_company_name);
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
        }
    };

    const handleSearch = () => {
        const filteredTours = tours.filter(tour =>
          tour.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTours(filteredTours);
      };
    const cardStyles = {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        maxWidth: "350px",
        maxHeight:'500px',
        margin: "0 auto",
        borderColor: "#ccc",
        transition: "transform 0.2s, box-shadow 0.2s",
    };

    const cardHoverStyles = {
        transform: "scale(1.05)",
        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
    };

    return (
<div style={{ fontFamily: "Roboto" ,marginTop:'150px'}}>
            <User_Navbar />
            <div 
                style={{
                    backgroundColor: "#17a2b8",
                    color: "#fff",
                    textAlign: "center",
                    padding: "30px 0",
                    
                    marginTop: "10px"
                }}
            >
                <div className="container">
                    <h3 style={{ fontSize: "48px", marginBottom: "20px" }}>
                        Embark on Unforgettable Journeys with {agencyName || "Travel Agency"}
                    </h3>
                    <p style={{ fontSize: "24px" }}>Plan Your Dream Vacation Today!</p>
                </div>
            </div>
            <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="input-group">
            <input
                type="text"
                className="form-control rounded-pill border-secondary"
                style={{ maxWidth: "200px" }} // Adjust the width here
                placeholder="Search by country..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

            <div className="container mt-4">
                <div className="row">
                    {tours.map((tour) => (
                        <div key={tour.tour_id} className="col-lg-4 col-md-6 mb-4">
                            <div style={{ ...cardStyles, ...(tour.isHovered ? cardHoverStyles : null) }}
                                onMouseEnter={() => {tour.isHovered = true; setTours([...tours])}}
                                onMouseLeave={() => {tour.isHovered = false; setTours([...tours])}}
                            >
                                <img src={`https://localhost:7250/uploads/${tour.hotel_image}`}  className="img-fluid" alt={tour.tour_name} />
                                <h3 className="mt-2">{tour.tour_name}</h3>
                                <p className="mb-2">{tour.tour_locations}</p>
                                <p className="mb-2">{tour.tour_duration_days} Days and {tour.tour_duration_nights} Nights</p>
                                <p className="mb-2">{tour.tour_location}</p>
                                <p className="mb-2">Price: {tour.tour_price}</p>
                                <Link to={`/view_package/${tour.tour_id}`} className="btn btn-primary">
                                    View Package
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
        </div>
    );
};

export default ViewTourPage;
