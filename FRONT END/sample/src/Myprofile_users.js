    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import UserNavbar from './User_Navbar';
    import Footer from './Footer';
    import jwt_decode from 'jwt-decode'; // Import the jwt-decode library

import { useNavigate } from 'react-router-dom';
    const UserProfile = () => {
        const [userData, setUserData] = useState({});
        const [isEditing, setIsEditing] = useState(false);
        const localUserId = localStorage.getItem('user_id');
        const navigate = useNavigate();
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        };
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`https://localhost:7097/api/User/${localUserId}`);
                    if (response.data && response.data.length > 0) {
                        setUserData(response.data[0]); // Set data from the first user object in the array
                    }
                    console.log('API Response:', response.data);
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            const isAuthenticated = localStorage.getItem('token');
            const userRole = localStorage.getItem('role'); // Assuming role is stored in local storage
            
            if (!isAuthenticated) {
              navigate('/login'); // Redirect to the login page if not authenticated
            } else if (userRole !== 'user') {
              navigate('/login'); // Redirect to a different page if the role is not "user"
            } else {
              fetchUserData();
            }
            
           
        }, [localUserId]);

        const handleEditClick = () => {
            setIsEditing(true);
        };

        const handleSaveClick = () => {
            // Perform save action here (e.g., update data on the server)
            setIsEditing(false);
        };

        return (
            <div style={{ marginTop: '90px' }}>
                <UserNavbar />
                <div style={styles.profileCard}>
                    <h2 style={styles.profileHeader}>My Profile</h2>
                    <div className="profile-details">
                        <div style={styles.profileField}>
                            <label style={styles.profileLabel}>Email:</label>
                            {isEditing ? (
                                <input
                                    style={styles.profileInput}
                                    value={userData.email_id}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            email_id: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <p style={styles.profileValue}>{userData.email_id}</p>
                            )}
                        </div>
                        <div style={styles.profileField}>
                            <label style={styles.profileLabel}>Password:</label>
                            {isEditing ? (
                                <input
                                    type="password"
                                    style={styles.profileInput}
                                    value={userData.password}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <p style={styles.profileValue}>********</p>
                            )}
                        </div>
                        <div style={styles.profileField}>
                            <label style={styles.profileLabel}>User Name:</label>
                            {isEditing ? (
                                <input
                                    style={styles.profileInput}
                                    value={userData.user_name}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            user_name: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <p style={styles.profileValue}>{userData.user_name}</p>
                            )}
                        </div>
                        <div style={styles.profileField}>
                            <label style={styles.profileLabel}>Date of Birth:</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    style={styles.profileInput}
                                    value={userData.dob}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            dob: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <p style={styles.profileValue}>{formatDate(userData.dob)}</p>

                            )}
                        </div>
                        <div style={styles.profileField}>
                            <label style={styles.profileLabel}>Gender:</label>
                            {isEditing ? (
                                <select
                                    style={styles.profileInput}
                                    value={userData.gender}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            gender: e.target.value,
                                        })
                                    }
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : (
                                <p style={styles.profileValue}>{userData.gender}</p>
                            )}
                        </div>
                        <div style={styles.profileField}>
                            <label style={styles.profileLabel}>Address:</label>
                            {isEditing ? (
                                <textarea
                                    style={styles.profileInput}
                                    value={userData.address}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <p style={styles.profileValue}>{userData.address}</p>
                            )}
                        </div>
                        <div style={styles.profileField}>
                            <label style={styles.profileLabel}>Phone Number:</label>
                            {isEditing ? (
                                <input
                                    style={styles.profileInput}
                                    value={userData.phone_no}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            phone_no: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <p style={styles.profileValue}>{userData.phone_no}</p>
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

    export default UserProfile;

    const styles = {
        profileCard: {
            margin: '20px',
            padding: '20px',
            backgroundColor: '#fff',
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
    };
