import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInUser, deleteLoggedInUser } from '../reducers/loggedInReducer';
import { fetchUsers } from '../FetchData/FetchData';
import './AddPost.css';
import { Link, useNavigate } from 'react-router-dom';

function AddPost() {

    const navigate = useNavigate();

    const [newPost, setNewPost] = useState({
        name: '',
        address: '',
        description: '',
        comments:[],
    });

    const handleChange = (e)=>{
        const {name, value, type} = e.target;
        setNewPost({...newPost, [name]:value});
    };

    const handleAdd = (e)=>{
        e.preventDefault();
        if(isValidInput(newPost)){
            apiPostAdd(newPost);
            setNewPost({
                name: '',
                address: '',
                description: '',
                comments:[],
            });
            navigate('/adminDashboard');
        }else{
            alert("Please fill all fields correctly.")
        }
    };

    const isValidInput = (newPost) => {
        if (newPost.name && newPost.address && newPost.description)
            return true;
        return false;
    };

    return(
        <div className="EditProfile">
            <h2>Add New Post</h2>
            <form onSubmit={handleAdd}>
                <div>
                    <label>Restaurabt Name: </label>
                    <input type="text" name="name" value={newPost.name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Address: </label>
                    <input type="text" name="address" value={newPost.address} onChange={handleChange}/>
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" name="description" value={newPost.description} onChange={handleChange}/>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}


export default AddPost;



function apiPostAdd(post){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": post.name,
        "address": post.address,
        "description": post.description,
        "comments": []
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/resutrants", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}