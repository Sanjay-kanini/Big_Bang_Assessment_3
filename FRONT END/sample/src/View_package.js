import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import User_Navbar from './User_Navbar';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageGallery from './ImageGallery';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Button } from "@mui/material";
import Footer from './Footer'

const ViewPackagePage = () => {
    const { tourId } = useParams();

    const [tourPackage, setTourPackage] = useState(null);
    const [itinerary, setItinerary] = useState([]);
    const [itineraryImages, setItineraryImages] = useState([]);
    const [tourPrice, setTourPrice] = useState(null);    
    const navigate  = useNavigate();
  
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else if ( userRole!=='user') {
      navigate('/login'); // Redirect to a different page if the role is not "user"
    } else {
        fetchTourData();
    }
  
       
    }, []);
    const fetchTourData = async () => {
        try {
            const [tourResponse, itineraryResponse] = await Promise.all([
                axios.get(`https://localhost:7250/api/Add_Tour/${tourId}`),
                axios.get(`https://localhost:7250/api/Itinerary/${tourId}`)
            ]);

            const tourData = tourResponse.data[0];
            const tourPrice = parseFloat(tourData.tour_price);

            setTourPackage(tourData);
            setTourPrice(tourPrice);

            const images = itineraryResponse.data || [];
            setItineraryImages(images);
            setItinerary(itineraryResponse.data);
        } catch (error) {
            console.error("Error fetching tour package:", error);
        }
    };

    const handleBookNowClick = () => {
        navigate(`/booking/${tourId}/${tourPrice}`);
    };
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    };

    return (
<div style={{ fontFamily: "Roboto" ,marginTop:'150px'}}>
            <User_Navbar />
            <Container maxWidth="md" style={containerStyle}>
                {tourPackage ? (
                    <div>
                        
                     
                         <h3 style={{ display: "inline", marginRight: "10px" }}>
                            <LocationOnIcon /> {tourPackage.tour_name}
                        </h3>   <br/>  <br/>
                        <div style={{ display: "inline" }}>
                        
                        <p style={{ display: "inline", marginRight: "10px" }}>
                            <LocationOnIcon />  {tourPackage.tour_location}
                        </p>
                        <p style={{ display: "inline", marginRight: "10px" }}>
                            <DirectionsCarIcon /> Tour Type: {tourPackage.tour_type}
                        </p>
                        <p style={{ display: "inline", marginRight: "10px" }}>
                            <AccessTimeIcon /> Duration: {tourPackage.tour_duration_days} Days and {tourPackage.tour_duration_nights} Nights
                        </p>
                        <p style={{ display: "inline" }}>
                            <AttachMoneyIcon /> Price: {tourPackage.tour_price}
                        </p>
                    </div>  <br/>  <br/>
                    </div>
                ) : (
                    <p>Loading tour package details...</p>
                )}
                <div>
                    <ImageGallery images={itineraryImages.map(image => `https://localhost:7250/uploads/${image.location_image}`)} />
                </div>
                <div>
                    <h2 style={{ marginRight:'700px', marginTop:'20px',marginBottom:'20px'}}>Itinerary</h2>
                    {itinerary.map((item, index) => (
                        <div key={index}>
                            <Accordion style={{ marginBottom: "10px" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`day${index}-content`}
                                    id={`day${index}-header`}
                                >
                                    <h5 style={{marginLeft:'10px'}}>Day {item.day}</h5>&nbsp;&nbsp;&nbsp;
                                    <p>{item.location}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <p>{item.description}</p>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </div>
                <div>
                    <Button variant="contained" onClick={handleBookNowClick}>
                        Book Now
                    </Button>
                </div>
            </Container>
            <Footer/>
        </div>
    );
};

export default ViewPackagePage;
