import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import EditProfile from '../EditProfile/EditProfile';
import RestaurantView from '../RestaurantView/RestaurantView';
import Dashboard from '../AdminDashboard/Dashboard';
import RestaurantList from '../RestaurantList/RestaurantList';
import EditPost from '../EditPost/EditPost';
import AddPost from '../AddPost/AddPost';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';

function App() {
  return (
    <Router>
      <div>
        <Header/>
      </div>
      <div className="App">
        <Routes>
          <Route path="/" exact element={
            <div>
              <RestaurantList/>
            </div>
          } />
          <Route path="/login" exact element={
            <div>
              <LogIn/>
            </div>
          } />
          <Route path="/register" exact element={
            <div>
              <Register/>
            </div>
          } />
          <Route path="/dashboard" exact element={
            <div>
              <Dashboard/>
            </div>
          } />
          <Route path="/editProfile" exact element={
            <div>
              <EditProfile/>
            </div>
          } />
          <Route path="/adminDashboard" exact element={
            <div>
              <AdminDashboard/>
            </div>
          } />
          <Route path="/view/:postId" element={<RestaurantView />} />
          <Route path="/editPost/:postId" element={<EditPost />} />
          <Route path="/addPost" element={<AddPost />} />
        </Routes>
      </div>
      <div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

