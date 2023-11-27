import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLoggedInUser } from '../reducers/loggedInReducer';
import { deletePost } from '../reducers/postReducer';
import { fetchUsers, fetchPosts } from '../FetchData/FetchData';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const users = useSelector((state) => state.users.users); 
    const restaurants = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleDelete = (index)=>{
        const post = restaurants[index]; 
        const { _id } = post.data;
        apiPostDelete(_id);
        dispatch(deletePost(index));
    }

    const handleLogout = ()=>{
        dispatch(deleteLoggedInUser());
        localStorage.removeItem("loggedInUser");
        navigate("/");
      };

    return(
      <div>
        <br/>
        <div className='RestaurantList'>
            <Link to={`/addPost`}> <button>Add Post</button> </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <br/>
        <ul className='RestaurantList'>
          {restaurants.map((restaurant, index) => (
            <li key={index}>
              <h2>{restaurant.data.name}</h2> 
              <img src={restaurant.data.image} alt={restaurant.data.name} />
              <p><strong>Address:</strong> {restaurant.data.address}</p>
              <p>{restaurant.data.description}</p>
              <Link to={`/editPost/${index}`}> <button>Edit Post</button> </Link>
              <button onClick={() => handleDelete(index)}>Delete Post</button>
              <br/>
              <br/>
              <br/>
              <br/>
            </li>
          ))}
        </ul>
      </div>
    );
}


export default AdminDashboard;


function apiPostDelete(post_Id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/resutrants/"+post_Id, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}