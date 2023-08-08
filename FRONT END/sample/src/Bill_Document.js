// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { PDFViewer } from "@react-pdf/renderer";
// import BillDocument from "./BillDocument";
// import axios from "axios";

// const BillPDF = () => {
//   const { booking_id, price } = useParams();
//   const [bookingData, setBookingData] = useState(null);
//   const [paymentData, setPaymentData] = useState(null);

//   useEffect(() => {
//     // Fetch booking details
//     axios.get(`https://localhost:7097/api/Booking/${booking_id}`)
//       .then((response) => {
//         setBookingData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching booking details:", error);
//       });

//     // Fetch payment details
//     axios.get(`https://localhost:7097/api/Payment/${booking_id}`)
//       .then((response) => {
//         setPaymentData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching payment details:", error);
//       });
//   }, [booking_id]);

//   if (!bookingData || !paymentData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <PDFViewer width="100%" height={500}>
//       <BillDocument bookingData={bookingData} paymentData={paymentData} />
//     </PDFViewer>
//   );
// };

// export default BillPDF;
