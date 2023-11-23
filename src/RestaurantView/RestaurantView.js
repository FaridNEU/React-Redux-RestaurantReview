import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../FetchData/FetchData';
import './RestaurantView.css'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../reducers/postReducer';


const RestaurantView = () => {
  const restaurants = useSelector((state) => state.posts.posts); 
  const loggedInUser = localStorage.getItem("loggedInUser");

  console.log(loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  const { postId } = useParams();
  
  const [newComment, setNewComment] = useState('');
  
  const post = restaurants[postId];  
  
  if (!post) {
    return <p>Loading...</p>; // Or a message indicating the post doesn't exist
  }
  const { name, image, address, description } = post.data;
  const { comments } = post;

  const { _id } = post.data


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    try{
      var commentData = {
        id: comments.length,
        writer: loggedInUser,
        timestamp: new Date().toLocaleString(),
        text: newComment,
      };
      dispatch(addComment({ postId, commentData }));
      var updatedData = restaurants[postId];
      await apiPostUpdate(updatedData , _id, commentData);
      setNewComment('');
    } catch{
      alert('Error fetching or processing data! Please try again.');
    }
    
  };

  return (
    <div className="Restaurant">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p><strong>Address:</strong> {address}</p>
      <p>{description}</p>
      
      <div className="Comments">
        <h3>Comments:</h3>
        <ul>
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index}>
                <p><strong>Writer:</strong> {comment.writer}</p>
                <p><strong>Timestamp:</strong> {comment.timestamp}</p>
                <p>{comment.text}</p>
              </li>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </ul>
      </div>
        {loggedInUser !== null ? (
          <div className="NewComment">
            <textarea
              rows="4"
              cols="50"
              value={newComment}
              placeholder="Write your comment here..."
              onChange={handleCommentChange}
            ></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        ) : (
          <div>
            <p>You have to Login to add Comment!</p>
          </div> 
        )}
    </div>
  );
};

export default RestaurantView;


function apiPostUpdate(updatedData, post_Id, commentData){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");
  myHeaders.append("Content-Type", "application/json");


  var raw = JSON.stringify({
    "name": updatedData.data.name,
    "address": updatedData.data.address,
    "description": updatedData.data.description,
    "comments": [...updatedData.comments, commentData],
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