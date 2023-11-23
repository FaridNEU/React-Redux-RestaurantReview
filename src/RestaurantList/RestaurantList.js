import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../FetchData/FetchData';
import Comment from '../Comment/Comment'
import './RestaurantList.css';




const RestaurantList = () => {

  const restaurants = useSelector((state) => state.posts.posts); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  return (
    <div>
      <ul className='RestaurantList'>
        {restaurants.map((restaurant, index) => (
          <li key={index}>
            <h2>{restaurant.data.name}</h2> 
            <img src={restaurant.data.image} alt={restaurant.data.name} />
            <p><strong>Address:</strong> {restaurant.data.address}</p>
            <p>{restaurant.data.description}</p>
            <Comment comments={restaurant.comments} />
            <Link to={`/view/${index}`}> <button>View</button> </Link>
            <br/>
            <br/>
            <br/>
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;