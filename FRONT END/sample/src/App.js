


import logo from './logo.svg';
import {  Route,Routes } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router component

import './App.css';
import Form from './Login';
import Signup from './User_singup';
import Agency_signup from './Agent_signup';
import Manage_agency from './Manage_agencies';
import Agent_Navbar from './Agent_Navbar';
import Agent_HomePage from './Agent_home';
import Add_Tour from './Add_Tour'
import Itinerary from './Post_Itinerary'
import ViewTourPage from './View_Tours';
import View_package from './View_package'
import BookingForm from './Booking_page';
import Payment from './Payment';
import Pdf from './Bill_Pdf';
import Footer from './Footer';
import MyToursPage from './Mytours'
import Feedback from './Feedback'
import Admin_login from './Admin_login';
import Admin_HomePage from './Admin_home';
import Admin_Navbar from './Admin_Navbar';
import Agent_profile from './Myprofile_agent'
import User_profile from './Myprofile_users'
import User_Navbar from './User_Navbar'
import UserHomePage from './User_home';
function App() {
  return (
    
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<UserHomePage/>} />
        <Route path='/login' element={<Form/>}/>
        <Route path ='/user_signup' element={<Signup/>}/>
        <Route path='/user_home' element={<UserHomePage/>}/>
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/agent_signup' element={<Agency_signup/>}/>




        <Route path="/view_tours/:tourOwnerId" element={<ViewTourPage />} />
        <Route path="/view_package/:tourId" element={<View_package />} />
        <Route path="/booking/:tourId/:tourPrice" element={<BookingForm />} />
        <Route path="/payment/:booking_id/:price" element={<Payment />} />
        <Route path='/my_tours' element={<MyToursPage/>}/>
       
    
        <Route path='/Pdf/:booking_id' element={<Pdf/>}/>
        <Route path='/feedback/:booking_id' element={<Feedback/>}/>


      
        <Route path='/agent_navbar' element={<Agent_Navbar/>}/>
        <Route path='/agent_homepage' element={<Agent_HomePage/>}/>
        <Route path='/agent_profile' element={<Agent_profile/>}/>
        <Route path='/add_tour' element={<Add_Tour/>}/>
        <Route path='/add_itinerary' element={<Itinerary/>}/>
        <Route path='/manage_agenices' element={<Manage_agency/>}/>
        <Route path='/user_navbar' element={<User_Navbar/>}/>
        <Route path='/user_profile' element={<User_profile/>}/>

        <Route path='/admin_login' element={<Admin_login/>}/>
        <Route path='/admin_navbar' element={<Admin_Navbar/>}/>
        <Route path='/admin_home' element={<Admin_HomePage/>}/>

      </Routes>
      </Router>
     
      
    </div>
  );
}

export default App;
