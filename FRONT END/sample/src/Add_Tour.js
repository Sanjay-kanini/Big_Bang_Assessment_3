import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add_Tour.css';
import axios from 'axios';
import Agent_Navbar from './Agent_Navbar';
import Footer from './Footer';
import { useAccordionButton } from 'react-bootstrap';

const TourRegistrationForm = () => {
    const [tour_agentId, settour_agentId] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const initialFormData = {
        tour_name: '',
        tour_location: '',
        country: '',
        tour_duration_days: '',
        tour_duration_nights: '',
        tour_type: '',
        tour_price: '',
        nearby_hotels: '',
        costfor_two: '',
        hotel_cusine: '',
        imageFile: null,
        tour_Agency: {
            tour_owner_id: tour_agentId,
        },
    };

    useEffect(() => {
        const localtouragentid = localStorage.getItem('tour_owner_id');
        const parsednum = parseInt(localtouragentid);
        settour_agentId(parsednum);
        setFormData((prevData) => ({
            ...prevData,
            tour_Agency: {
                ...prevData.tour_Agency,
                tour_owner_id: parsednum,
            },
        }));
        const isAuthenticated = localStorage.getItem('token');
            const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
            
            if (!isAuthenticated) {
              navigate('/login'); // Redirect to the login page if not authenticated
            } else if (userRole !== 'agent') {
              navigate('/login'); // Redirect to a different page if the role is not "user"
            } else {
                handleSubmit();
            }
    }, [tour_agentId]);

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleSubmit = async (e = null) => { // Accept the event object or set a default value
        if (e) {
            e.preventDefault(); // Prevent form submission if event object is provided
        }
        if (validateForm()) {
            const data = new FormData();
            data.append('tour_name', formData.tour_name);
            data.append('tour_location', formData.tour_location);
            data.append('country', formData.country);
            data.append('tour_duration_days', formData.tour_duration_days);
            data.append('tour_duration_nights', formData.tour_duration_nights);
            data.append('tour_type', formData.tour_type);
            data.append('tour_price', formData.tour_price);
            data.append('nearby_hotels', formData.nearby_hotels);
            data.append('costfor_two', formData.costfor_two);
            data.append('hotel_cusine', formData.hotel_cusine);
            data.append('tour_Agency.tour_owner_id', formData.tour_Agency.tour_owner_id);
            if (selectedImage) {
                data.append('imageFile', selectedImage);
            }

            try {
                const response = await axios.post('https://localhost:7250/api/Add_Tour', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.status === 200 || response.status === 201) {
                    alert('Added a tour successfully');
                    navigate('/agent_homepage');
                    setFormData(initialFormData);
                    setSelectedImage(null);
                } else {
                    // Form data submission failed
                }
            } catch (error) {
                console.error('An error occurred while submitting the form data:', error);
            }
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const errorStyle = {
        fontSize: '14px',
        marginTop: '5px',
        color: 'red',
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.tour_name) errors.tour_name = 'Tour Name is required';
        if (!formData.tour_location) errors.tour_location = 'Tour Location is required';
        if (!formData.country) errors.country = 'Country is required';
        if (!formData.tour_duration_days) errors.tour_duration_days = 'Tour Duration (Days) is required';
        if (!formData.tour_duration_nights) errors.tour_duration_nights = 'Tour Duration (Nights) is required';
        if (!formData.tour_type) errors.tour_type = 'Tour Type is required';
        if (!formData.tour_price) errors.tour_price = 'Tour Price is required';
        if (!formData.nearby_hotels) errors.nearby_hotels = 'Nearby Hotels is required';
        if (!formData.costfor_two) errors.costfor_two = 'Cost for Two is required';
        if (!formData.hotel_cusine) errors.hotel_cusine = 'Hotel Cuisine is required';
        if (!formData.tour_Agency.tour_owner_id) errors.tour_Agency = 'Tour Owner ID is required';
        
    console.log('Form Data:', formData); // Log form data for debugging

    if (!formData.tour_name) {
        errors.tour_name = 'Tour Name is required';
        console.log('Error: Tour Name is required');
    }
    // ... (other validation checks)
    
    console.log('Form Errors:', errors);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <Agent_Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginTop:'100px' }}>
                <div style={{ padding: '20px', width: '600px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tour Registration Form</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '17px' }}>
                        <div>
                            <label>Tour Name:</label>
                            <input
                                type="text"
                                name="tour_name"
                                value={formData.tour_name}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Tour Name"
                                required
                            />
                            {formErrors.tour_name && <p style={errorStyle}>{formErrors.tour_name}</p>}
                        </div>
                        <div>
                            <label>Tour Location:</label>
                            <input
                                type="text"
                                name="tour_location"
                                value={formData.tour_location}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Tour Location"
                                required
                            />
                            {formErrors.tour_location && <p style={errorStyle}>{formErrors.tour_location}</p>}
                        </div>
                        <div>
                            <label>Country:</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Country"
                                required
                            />
                            {formErrors.country && <p style={errorStyle}>{formErrors.country}</p>}
                        </div>
                        <div>
                            <label>Tour Duration (Days):</label>
                            <input
                                type="text"
                                name="tour_duration_days"
                                value={formData.tour_duration_days}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Tour Duration (Days)"
                                required
                            />
                            {formErrors.tour_duration_days && <p style={errorStyle}>{formErrors.tour_duration_days}</p>}
                        </div>
                        <div>
                            <label>Tour Duration (Nights):</label>
                            <input
                                type="text"
                                name="tour_duration_nights"
                                value={formData.tour_duration_nights}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Tour Duration (Nights)"
                                required
                            />
                            {formErrors.tour_duration_nights && <p style={errorStyle}>{formErrors.tour_duration_nights}</p>}
                        </div>
                        <div>
                            <label>Tour Type:</label>
                            <input
                                type="text"
                                name="tour_type"
                                value={formData.tour_type}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Tour Type"
                                required
                            />
                            {formErrors.tour_type && <p style={errorStyle}>{formErrors.tour_type}</p>}
                        </div>
                        <div>
                            <label>Tour Price:</label>
                            <input
                                type="text"
                                name="tour_price"
                                value={formData.tour_price}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Tour Price"
                                required
                            />
                            {formErrors.tour_price && <p style={errorStyle}>{formErrors.tour_price}</p>}
                        </div>
                        <div>
                            <label>Nearby Hotels:</label>
                            <input
                                type="text"
                                name="nearby_hotels"
                                value={formData.nearby_hotels}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Nearby Hotels"
                                required
                            />
                            {formErrors.nearby_hotels && <p style={errorStyle}>{formErrors.nearby_hotels}</p>}
                        </div>
                        <div>
                            <label>Cost for Two:</label>
                            <input
                                type="text"
                                name="costfor_two"
                                value={formData.costfor_two}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Cost for Two"
                                required
                            />
                            {formErrors.costfor_two && <p style={errorStyle}>{formErrors.costfor_two}</p>}
                        </div>
                        <div>
                            <label>Hotel Cuisine:</label>
                            <input
                                type="text"
                                name="hotel_cusine"
                                value={formData.hotel_cusine}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter Hotel Cuisine"
                                required
                            />
                            {formErrors.hotel_cusine && <p style={errorStyle}>{formErrors.hotel_cusine}</p>}
                        </div>
                        <div>
                            <label>Hotel Image:</label>
                            <input
                                type="file"
                                name="placeImage"
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                            />
                            <button onClick={() => fileInputRef.current.click()} variant="contained" color="primary">
                                Upload Image
                            </button>
                            {selectedImage && <span>{selectedImage.name}</span>}
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#17a2b8',
                                    color: '#fff',
                                    padding: '10px 30px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TourRegistrationForm;
