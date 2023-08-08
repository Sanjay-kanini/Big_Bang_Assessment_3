import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Agent_Navbar from './Agent_Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
const MyProfile = () => {
    const [profileData, setProfileData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const localTourOwnerId = localStorage.getItem('tour_owner_id');
const navigate = useNavigate();
    useEffect(() => {
        
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`https://localhost:7250/api/Tour_Agency/${localTourOwnerId}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        const isAuthenticated = localStorage.getItem('token');
        const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
        
        if (!isAuthenticated) {
          navigate('/login'); // Redirect to the login page if not authenticated
        } else if (userRole !== 'agent') {
          navigate('/login'); // Redirect to a different page if the role is not "user"
        } else {
            fetchProfileData();
        }
       
    }, [localTourOwnerId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Perform save action here (e.g., update data on the server)
        setIsEditing(false);
    };

    return (
        <div style={{marginTop:'90px'}}>
            <Agent_Navbar />
            <div style={styles.profileCard}>
                <h2 style={styles.profileHeader}>My Profile</h2>
                <div className="profile-details">
                <div style={styles.profileField}>
                        <label style={styles.profileLabel}>Email:</label>
                        {isEditing ? (
                            <input
                                style={styles.profileInput}
                                value={profileData.email_id}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        email_id: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p style={styles.profileValue}>{profileData.email_id}</p>
                        )}
                    </div>
                    <div style={styles.profileField}>
                        <label style={styles.profileLabel}>Password:</label>
                        {isEditing ? (
                            <input
                                type="password"
                                style={styles.profileInput}
                                value={profileData.password}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        password: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p style={styles.profileValue}>********</p>
                        )}
                    </div>
                    <div style={styles.profileField}>
                        <label style={styles.profileLabel}>Tour Company Name:</label>
                        {isEditing ? (
                            <input
                                style={styles.profileInput}
                                value={profileData.tour_company_name}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        tour_company_name: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p style={styles.profileValue}>{profileData.tour_company_name}</p>
                        )}
                    </div>
                    <div style={styles.profileField}>
                        <label style={styles.profileLabel}>Tour Company Address:</label>
                        {isEditing ? (
                            <input
                                style={styles.profileInput}
                                value={profileData.tour_company_address}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        tour_company_address: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p style={styles.profileValue}>{profileData.tour_company_address}</p>
                        )}
                    </div>
                    <div style={styles.profileField}>
                        <label style={styles.profileLabel}>Status:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                style={styles.profileInput}
                                value={profileData.status}
                                readOnly
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        status: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p style={styles.profileValue}>{profileData.status}</p>
                        )}
                    </div>
                    {/* Add more fields as needed */}
                </div>
                <div style={styles.profileButtonContainer}>
                    {isEditing ? (
                        <button style={styles.profileButton} onClick={handleSaveClick}>
                            Save
                        </button>
                    ) : (
                        <button style={styles.profileButton} onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyProfile;

const styles = {
    profileContainer: {
        margin: '20px',
        padding: '20px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    profileHeader: {
        fontSize: '24px',
        marginBottom: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileField: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    profileLabel: {
        width: '150px',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    profileValue: {
        margin: '0',
        fontSize: '16px',
    },
    profileInput: {
        width: '100%',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    profileButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    profileButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    profileCard: {
        margin: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};
