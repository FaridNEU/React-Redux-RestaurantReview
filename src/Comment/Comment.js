import React from 'react';
import './Comment.css'

const Comments = ({ comments }) => {
  return (
    <div className='Comment'>
      <h3>Comments:</h3>
      {comments && comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p><strong>Writer:</strong> {comment.writer}</p>
              <p><strong>Timestamp:</strong> {comment.timestamp}</p>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;