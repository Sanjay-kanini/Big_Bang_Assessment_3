import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import AgentNavbar from "./User_Navbar";

const TourAgency = () => {
  const [toursWithoutItineraries, setToursWithoutItineraries] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itineraryData, setItineraryData] = useState([
    {
      tour_id: null,
      day: 0,
      location: "",
      description: "",
      location_image: null,
    },
  ]);
  const [firstItineraryPosted, setFirstItineraryPosted] = useState(false);

  useEffect(() => {
    fetchToursWithoutItineraries();
  }, []);

  const fetchToursWithoutItineraries = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7250/api/Add_Tour/tours_without_itineraries"
      );
      setToursWithoutItineraries(response.data);
    } catch (error) {
      console.error("Error fetching tours without itineraries:", error);
    }
  };

  const handleTourCardClick = (tourId) => {
    setSelectedTourId(tourId);
    setItineraryData([
      {
        tour_id: tourId,
        day: 0,
        location: "",
        description: "",
        location_image: null,
      },
    ]);
    setFirstItineraryPosted(false);
  };

  const handleItineraryChange = (e, field, index) => {
    const newData = [...itineraryData];
    newData[index][field] = e.target.value;
    setItineraryData(newData);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const newData = [...itineraryData];
      newData[index].location_image = file;
      setItineraryData(newData);
    }
  };

  const handleSaveItineraries = async () => {
    try {
      for (const [index, itinerary] of itineraryData.entries()) {
        const formData = new FormData();
        formData.append("tour_id", itinerary.tour_id);
        formData.append("day", itinerary.day);
        formData.append("location", itinerary.location);
        formData.append("description", itinerary.description);
        formData.append("imageFile", itinerary.location_image);

        await axios.post("https://localhost:7250/api/Itinerary", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (index === 0) {
          setFirstItineraryPosted(true);
        }
      }

      setItineraryData([
        {
          tour_id: null,
          day: 0,
          location: "",
          description: "",
          location_image: null,
        },
      ]);
      setSelectedTourId(null);
      setSelectedImage(null);
      setFirstItineraryPosted(false);
    } catch (error) {
      console.error("Error saving itineraries:", error);
    }
  };

  return (
    <div>
      <AgentNavbar/>
  
    <div style={styles.container}>
      <h1>Tours Without Itineraries</h1>
      <div style={styles.tourContainer}>
        {toursWithoutItineraries.map((tour) => (
          <div
            key={tour.tour_id}
            style={styles.tourCard}
            onClick={() => handleTourCardClick(tour.tour_id)}
          >
            <h5 style={styles.tourTitle}>{tour.tour_name}</h5>
            <p style={styles.tourDetail}>
              Duration: {tour.tour_duration_days} Days, {tour.tour_duration_nights} Nights
            </p>
            <p style={styles.tourDetail}>Price: ${tour.tour_price}</p>
          </div>
        ))}
      </div>

      {selectedTourId && (
        <div style={styles.formContainer}>
          {itineraryData.map((itinerary, index) => (
            <div key={index} style={styles.itineraryBox}>
              <h3 style={styles.itineraryHeading}>Itinerary {index + 1}</h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Day:
                  <input
                    type="number"
                    value={itinerary.day}
                    onChange={(e) =>
                      handleItineraryChange(e, "day", index)
                    }
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Location:
                  <input
                    type="text"
                    value={itinerary.location}
                    onChange={(e) =>
                      handleItineraryChange(e, "location", index)
                    }
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Description:
                  <textarea
                    value={itinerary.description}
                    onChange={(e) =>
                      handleItineraryChange(e, "description", index)
                    }
                    style={styles.textarea}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Location Image:
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, index)}
                    name="imageFile"
                    style={styles.fileInput}
                  />
                </label>
              </div>
              {firstItineraryPosted && index === 0 && (
                <div style={styles.secondItinerary}>
                  <h4>Enter Details for Second Itinerary</h4>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Day:
                      <input
                        type="number"
                        value={itineraryData[index + 1]?.day || ""}
                        onChange={(e) =>
                          handleItineraryChange(e, "day", index + 1)
                        }
                        style={styles.input}
                      />
                    </label>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Location:
                      <input
                        type="text"
                        value={itineraryData[index + 1]?.location || ""}
                        onChange={(e) =>
                          handleItineraryChange(e, "location", index + 1)
                        }
                        style={styles.input}
                      />
                    </label>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Description:
                      <textarea
                        value={itineraryData[index + 1]?.description || ""}
                        onChange={(e) =>
                          handleItineraryChange(e, "description", index + 1)
                        }
                        style={styles.textarea}
                      />
                    </label>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Location Image:
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(e, index + 1)}
                        name="imageFile"
                        style={styles.fileInput}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button onClick={handleSaveItineraries} style={styles.saveButton}>
            Save Itineraries
          </button>
        </div>
      )}
      <Footer />
    </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    marginTop:'90px'
  },
  tourContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  tourCard: {
    width: "200px",
    margin: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  tourTitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  tourDetail: {
    fontSize: "14px",
    margin: "5px 0",
  },
  formContainer: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    width:'50%',
    marginLeft:'450px'

  },
  itineraryBox: {
    marginBottom: "20px",
  },
  itineraryHeading: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  formGroup: {
    marginBottom: "15px",
    marginTop:'20px',
    width:'50%',
    marginLeft:'150px'


  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  fileInput: {
    display: "block",
    padding: "8px",
  },
  secondItinerary: {
    marginTop: "20px",
    border: "1px solid #ccc",
    padding: "10px",
  },
  saveButton: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "14px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TourAgency;
