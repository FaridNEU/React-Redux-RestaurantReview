import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../FetchData/FetchData';
import './EditPost.css';
import { Link, useNavigate } from 'react-router-dom';
import { editPost } from '../reducers/postReducer';

function EditPost() {
    const restaurants = useSelector((state) => state.posts.posts); 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { postId } = useParams();

    const [editedPost, setEditedPost] = useState({
        _id: "",
        name: '',
        address: '',
        description: '',
        comments:[],
    });

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);




    const post = restaurants[postId];
    if (!post) {
        return <p>Loading...</p>; 
    }
    
    const { _id } = post.data; 
    const { name, address, description} = post.data;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedPost({...editedPost, [name]:value});  
    };
    
    const handleSave = async () => {
        try{
            await apiPostUpdate(editedPost , _id);
            navigate('/adminDashboard');
        } catch{
            alert('Error fetching or processing data! Please try again.');
        }
    };


    return(
        <div className="EditProfile">
            <h2>Edit Post</h2>
            <form onSubmit={handleSave}>
                <div>
                    <label>Restaurant Name: </label>
                    <br/>
                    Old:<input type="text" name="name" value={name} readOnly/>
                    New:<input type="text" name="name" value={editedPost.name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Address: </label>
                    <br/>
                    Old:<input type="text" name="address" value={address} readOnly/>
                    New:<input type="text" name="address" value={editedPost.address} onChange={handleChange}/>
                </div>
                <div>
                    <label>Description: </label>
                    <br/>
                    Old:<input type="text" name="description" value={description} readOnly/>
                    New:<input type="text" name="description" value={editedPost.description} onChange={handleChange}/>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}


export default EditPost;

function apiPostUpdate(updatedData, post_Id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");
    myHeaders.append("Content-Type", "application/json");
    
    
    var raw = JSON.stringify({
      "name": updatedData.name,
      "address": updatedData.address,
      "description": updatedData.description,
      "comments": updatedData.comments,
      "_id": post_Id
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/resutrants/"+post_Id, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}