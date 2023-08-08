import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import User_navbar from './User_Navbar'
import Footer from './Footer'

const Payment = () => {
  const { booking_id, price } = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [billDownloaded, setBillDownloaded] = useState(false);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const navigate = useNavigate();

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://localhost:7097/api/Payment",
          {
            booking_id_fk: booking_id,
            card_no: cardNumber,
            cvv_no: cvv,
            price: price,
          }
        );
        if (response.status === 201 || response.status === 200) {
          setPaymentSuccessful(true);
        } else {
          console.error("Payment failed");
        }
      } catch (error) {
        console.error("Error making payment:", error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNumber.length !== 6) {
      newErrors.cardNumber = "Card number must be 6 digits";
    }

    if (!cvv) {
      newErrors.cvv = "CVV is required";
    } else if (cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleDownloadBill = () => {
    setBillDownloaded(true);
  };

  return (

    <div style={{ fontFamily: "Roboto",background: "#f8f8f8", minHeight: "100vh", display: "flex", flexDirection: "column",marginTop:'150px' }}>
      <User_navbar />
      <Container maxWidth="xs" style={{ flex: 1 }}>
        <Box
          sx={{
            margin: "auto",
            bgcolor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "24px",
          }}
        >
          <Typography variant="h6" gutterBottom style={{ marginBottom: "24px" }}>
            Payment
          </Typography>
          {paymentSuccessful ? (
            !billDownloaded ? (
              <div>
                <Typography variant="body1" gutterBottom>
                  Payment successful! Click below to download the bill:
                </Typography>
                <Button
                  onClick={handleDownloadBill}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px", backgroundColor: "#009688", color: "#fff" }}
                >
                  Download Bill
                </Button>
              </div>
            ) : (
              <div>
                <Typography variant="body1" gutterBottom>
                  Bill successfully downloaded. You can now{" "}
                  <Link to={`/pdf/${booking_id}`} target="_blank">
                    view the PDF.
                  </Link>
                  <br />
                  Have a safe journey
                </Typography>
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                name="cardNumber"
                label="Card Number"
                fullWidth
                value={cardNumber}
                onChange={handleCardNumberChange}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                margin="normal"
              />
              <TextField
                name="cvv"
                label="CVV"
                fullWidth
                value={cvv}
                onChange={handleCvvChange}
                error={!!errors.cvv}
                helperText={errors.cvv}
                margin="normal"
              />
              {errors.cardNumber && (
                <Alert severity="warning" style={{ marginBottom: "10px" }}>
                  {errors.cardNumber}
                </Alert>
              )}
              {errors.cvv && (
                <Alert severity="warning">
                  {errors.cvv}
                </Alert>
              )}
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px", backgroundColor: "#00bcd4", color: "#fff" }}>
                Make Payment
              </Button>
            </form>
          )}
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default Payment;
