import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import User_navbar from './User_Navbar'
import Footer from './Footer'

const vacationTypes = ["Educational Trip", "Family Trip", "Solo Trip", "Honeymoon"];

const BookingForm = () => {
  const { tourId, tourPrice } = useParams();
  const [bookingData, setBookingData] = useState({
    email_id: "",
    name: "",
    phone_no: "",
    tour_id: tourId,
    date_of_travel: "",
    no_of_person: "1",
    vacation_type: "",
    price: tourPrice,
    status: null,
    user_id_fk: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch user_id from local storage and set it in bookingData
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setBookingData((prevData) => ({
        ...prevData,
        user_id_fk: user_id,
      }));
    }
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else if (userRole !== 'user') {
      navigate('/login'); // Redirect to a different page if the role is not "user"
    } else {
      handleSubmit();
    }
   
    
    
  }, []);

  const handleSubmit = async (e) => {
    if(e){
      e.preventDefault();
    }
  

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://localhost:7097/api/Booking",
          {
            ...bookingData,
            tour_id: tourId,
            price: tourPrice,
          }
        );
        if (response.status === 201 || response.status === 200) {
          navigate(`/payment/${response.data.booking_id}/${bookingData.price}`, {
            state: { bookingData: bookingData },
          });
        } else {
          console.error("Booking creation failed");
          // Handle error, display an error message
        }
        console.log(tourId, tourPrice);
        console.log("Booking successful:", response.data);
        // Handle success, display a message or redirect to a thank-you page
      } catch (error) {
        console.error("Error booking:", error);
        // Handle error, display an error message
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!bookingData.email_id) {
      newErrors.email_id = "Email is required";
    } else if (!isValidEmail(bookingData.email_id)) {
      newErrors.email_id = "Invalid email format";
    }

    if (!bookingData.name) {
      newErrors.name = "Name is required";
    }

    if (!bookingData.phone_no) {
      newErrors.phone_no = "Phone Number is required";
    } else if (!isValidPhoneNumber(bookingData.phone_no)) {
      newErrors.phone_no = "Invalid phone number format";
    }

    if (!bookingData.date_of_travel) {
      newErrors.date_of_travel = "Date of Travel is required";
    }

    if (!bookingData.no_of_person) {
      newErrors.no_of_person = "Number of Persons is required";
    }

    if (!bookingData.vacation_type) {
      newErrors.vacation_type = "Vacation Type is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    // Basic phone number validation: 10 digits, optional + sign
    const phonePattern = /^(\+)?\d{10}$/;
    return phonePattern.test(phone);
  };

  const handleNoOfPersonsChange = (e) => {
    const { value } = e.target;
    const SGST = 70;
    const CGST = 70;
    const parsedPrice = parseFloat(tourPrice);
    if (!isNaN(parsedPrice) && value !== "") {
      setBookingData((prevData) => ({
        ...prevData,
        no_of_person: value,
        price: parsedPrice * parseFloat(value)+SGST+CGST,
      }));
    } else {
      setBookingData((prevData) => ({
        ...prevData,
        no_of_person: value,
        price: "",
      }));
    }
  };

  return (
    <div
      style={{
        background: "#f8f8f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Roboto" ,
        marginTop:'150px'

      }}
    >
      <User_navbar />
      <Container maxWidth="xs" style={{ flex: 1 }}>
        <Box
          sx={{
            margin: "auto",
            bgcolor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "24px",
            display: "flex",
          marginLeft:'-100px',
            flexDirection: "column",
            gap: "16px",
            width:'600px',
            marginBottom:'20px',
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}
          >
            Book Your Trip
          </Typography>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gap: "16px",
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                name="email_id"
                label="Email"
                fullWidth
                value={bookingData.email_id}
                onChange={handleInputChange}
                error={!!errors.email_id}
                helperText={errors.email_id}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={bookingData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="phone_no"
                label="Phone Number"
                fullWidth
                value={bookingData.phone_no}
                onChange={handleInputChange}
                error={!!errors.phone_no}
                helperText={errors.phone_no}
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="date_of_travel"
                label="Date of Travel"
                type="date"
                fullWidth
                value={bookingData.date_of_travel}
                onChange={handleInputChange}
                error={!!errors.date_of_travel}
                helperText={errors.date_of_travel}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                name="no_of_person"
                label="Number of Persons"
                fullWidth
                value={bookingData.no_of_person}
                onChange={handleNoOfPersonsChange}
                error={!!errors.no_of_person}
                helperText={errors.no_of_person}
                margin="normal"
                variant="outlined"
                select
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="vacation_type"
                label="Vacation Type"
                select
                fullWidth
                value={bookingData.vacation_type}
                onChange={handleInputChange}
                error={!!errors.vacation_type}
                helperText={errors.vacation_type}
                margin="normal"
                variant="outlined"
              >
                {vacationTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="price"
                label="Price"
                fullWidth
                value={bookingData.price}
                InputProps={{ readOnly: true }}
                error={!!errors.price}
                helperText={errors.price}
                margin="normal"
                variant="outlined"
              />
            </div>
            {errors.email_id && (
              <Alert severity="error" style={{ marginTop: "10px" }}>
                {errors.email_id}
              </Alert>
            )}
            {errors.name && (
              <Alert severity="error" style={{ marginTop: "10px" }}>
                {errors.name}
              </Alert>
            )}
            {errors.phone_no && (
              <Alert severity="error" style={{ marginTop: "10px" }}>
                {errors.phone_no}
              </Alert>
            )}
            {errors.date_of_travel && (
              <Alert severity="error" style={{ marginTop: "10px" }}>
                {errors.date_of_travel}
              </Alert>
            )}
            {errors.no_of_person && (
              <Alert severity="error" style={{ marginTop: "10px" }}>
                {errors.no_of_person}
              </Alert>
            )}
            {errors.vacation_type && (
              <Alert severity="error" style={{ marginTop: "10px" }}>
                {errors.vacation_type}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "20px",
                backgroundColor: "#00bcd4",
                color: "#fff",
              }}
            >
              Pay {bookingData.price} USD
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default BookingForm;
  