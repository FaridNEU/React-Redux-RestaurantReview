import { addPost, setPosts } from '../reducers/postReducer';
import { addUser, setUsers } from '../reducers/userReducer';
import { setLoggedInUser } from '../reducers/loggedInReducer';
//import restaurantsData from './PRODUCT.json';
//import usersData from './USERS.json';


export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await apiFindAllRestaurants(); 
    const restaurantsData = response.data;

    const fetchedPosts = restaurantsData.map((restaurant) => {
      const processedData = {
        _id: restaurant._id,
        name: restaurant.name,
        address: restaurant.address,
        description: restaurant.description,
      };

      const processedComments = restaurant.comments.map((comment) => ({
        text: comment.text,
        writer: comment.writer,
        timestamp: comment.timestamp,
      }));

      return {
        data: processedData,
        comments: processedComments,
      };
    });

    dispatch(setPosts(fetchedPosts));
  } catch (error) {
    // Handle errors here
    alert('Error fetching or processing data! Please refresh the page again.');
  }
};


export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await apiFindAllUsers(); 
    const usersData = response.data;
    dispatch(setUsers(usersData));

  } catch (error) {
    // Handle errors here
    console.error('Error fetching or processing data:', error);
  }
};

export const fetchLoggedInUser = () => (dispatch) => {
  dispatch(setLoggedInUser(localStorage.getItem("loggedInUser")));
}


function apiFindAllRestaurants() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/resutrants", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      return result; 
    })
    .catch(error => {
      console.log('Error fetching data:', error);
      throw error; // Throw the error to handle it outside
    });
}


function apiFindAllUsers() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users", requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
    return result; 
  })
  .catch(error => {
    console.log('Error fetching data:', error);
    throw error; // Throw the error to handle it outside
  });
}


