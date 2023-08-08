import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PDFViewer, Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: 40,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      backgroundColor: "white",
      borderRadius: 5,
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: 24,
      marginBottom: 10,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "Times-Roman",
    },
    text: {
      fontSize: 14,
      marginBottom: 5,
      fontFamily: "Helvetica",
    },
    subheading: {
      fontSize: 18,
      marginTop: 20,
      marginBottom: 10,
      fontWeight: "bold",
      fontFamily: "Times-Bold",
    },
    image: {
      width: "70%",
      height: 70,
      marginBottom: 10,
    },
    highlightText: {
      color: "#ff9933", // Highlight color
      fontWeight: "bold",
    },
     calculationBox: {
    marginVertical: 20,
    padding: 10,
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#DCDCDC", // Add background color
  },
  
  
  dottedBorder: {
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: "#ff9933", 
  },
  
  
  highlightBackground: {
    backgroundColor: "#ffcc66", // Choose your highlight background color
    paddingHorizontal: 5,
  },
  pageContainer: {
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: "#aaa",
    padding: 20, // Add some padding to the page container
  },

      label: {
        width: "60%", // Adjust the width as needed
        paddingRight: 10,
        fontFamily: "Helvetica",
      },
      amount: {
        width: "40%", // Adjust the width as needed
        fontFamily: "Helvetica",
      },
  });
  

const BillPDFViewer = () => {
    const { booking_id } = useParams();
    const [bookingData, setBookingData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [priceDetails, setPriceDetails] = useState({});
const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchDetails() {
        try {
          const response = await axios.get(
            `https://localhost:7097/api/Booking/${booking_id}`
          );
  
          if (response.status === 200 || response.status === 201) {
            setBookingData(response.data);
            setLoading(false);
            setDataLoaded(true);
          } else {
            console.error("Error fetching booking details:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      }
      const isAuthenticated = localStorage.getItem('token');
      const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to the login page if not authenticated
      } else if (userRole !== 'user') {
        navigate('/login'); // Redirect to a different page if the role is not "user"
      } else {
        fetchDetails();
      }
    }, [booking_id]); // Make sure to include booking_id as a dependency
   // Now, the fetchDetails function will be called if the user is authenticated and has the role 'user', and it will be triggered whenever the booking_id changes. This ensures that you fetch the details when the component mounts and when the booking_id changes.
    
    
    
    
    
    
    const pricePerPerson = priceDetails.pricePerPerson || 0;
    const numberOfPersons = bookingData.no_of_person || 1;
    const totalPrice = pricePerPerson * numberOfPersons;
    return (
      <PDFViewer width="100%" height={1500}>
        <Document>
          <Page size="A4" style={styles.page}>
          <View style={styles.pageContainer}> {/* Apply the new style */}

            <View style={styles.section}>
              {dataLoaded ? (
                <>
                  <Text style={styles.heading}>Annexure - Tour Package Bill</Text>
                  
                  <Text style={styles.text}>Name: {bookingData.name}</Text>
                  <Text style={styles.text}>Email: {bookingData.email_id}</Text>
                  <Image
                    src="data:image/png;base64,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"
                    style={styles.image}
                  />
                  <Text style={styles.subheading}>Travel Information</Text>
                  <Text style={styles.text}>
                    Destination: <Text style={styles.highlightText}>{bookingData.destination}</Text>
                  </Text>
                  <Text style={styles.text}>
                    Departure Date: <Text style={styles.highlightText}>{bookingData.date_of_travel}</Text>
                  </Text>
                  <Text style={styles.text}>
                    Itinerary: <Text style={styles.highlightText}>{bookingData.itinerary}</Text>
                  </Text>
                  <Text style={styles.subheading}>Explore Your Dream Destination</Text>
                  <Text style={styles.text}>
                    Get ready to embark on a once-in-a-lifetime journey to <Text style={styles.highlightText}>{bookingData.destination}</Text>.
                    Experience breathtaking landscapes, immerse yourself in vibrant cultures, and create unforgettable memories.
                  </Text>
                  <Text style={styles.text}>
                    Our carefully curated itinerary will take you to the most iconic landmarks and hidden gems. From <Text style={styles.highlightText}>exploring ancient ruins</Text> to <Text style={styles.highlightText}>relaxing on pristine beaches</Text>, your adventure awaits!
                  </Text>
                  <Text style={styles.subheading}>About Our Tour Company</Text>
                  <Text style={styles.text}>
                    As a leading provider of exceptional travel experiences, our tour company is dedicated to making your dream vacations a reality. With a team of passionate experts and a commitment to quality, we ensure that every journey is filled with wonder, joy, and cultural enrichment.
                  </Text>
                  <Text style={styles.text}>
                    Address: 123 Travel Street, Adventure City
                  </Text>
                  <Text style={styles.text}>
                    Contact: contact@tourcompany.com | Phone: +1-123-456-7890
                  </Text>
                  <br/>
                  <Text style={styles.heading}>Annexure - Tour Package Bill</Text>
                  <Text style={styles.heading}>Tour Package </Text>
                {/* ... (booking details content) */}
                <View style={styles.calculationBox}>
                  <Text style={styles.subheading}>Bill Calculation</Text>
                  <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <Text style={styles.label}>Price per Person:</Text>
                    <Text style={styles.amount}>${bookingData.price}</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <Text style={styles.label}>Number of Persons:</Text>
                    <Text style={styles.amount}>{bookingData.no_of_person}</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <Text style={styles.label}>SGST:</Text>
                    <Text style={styles.amount}>$70.00</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <Text style={styles.label}>CGST:</Text>
                    <Text style={styles.amount}>$70.00</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>Total Price:</Text>
                    <Text style={styles.amount}>
                      ${bookingData.no_of_person * bookingData.price + 70 + 70}
                    </Text>
                  </View>
                  </View>
                </>
              ) : (
                <Text>Loading...</Text>
              )}
            </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  };
  
  export default BillPDFViewer;
  