import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInUser, deleteLoggedInUser } from '../reducers/loggedInReducer';
import { fetchUsers } from '../FetchData/FetchData';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const loggedInUsername =  localStorage.getItem("loggedInUser");
    const users = useSelector((state) => state.users.users); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState({
      _id: "",
      username: "",
      email: "",
      password: "",
      country: "",
    });

    //User who logged In: 
    const userExists = users.some((user)=>(user.username === loggedInUsername));

    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
      users.some((user)=>{
        if(user.username === loggedInUsername){
          setLoggedInUser(user);
        }
      });
    });
  

    const handleLogout = ()=>{
      dispatch(deleteLoggedInUser());
      localStorage.removeItem("loggedInUser");
      setLoggedInUser({
        id: "",
        username: "",
        email: "",
        password: "",
        country: "",
      });
      navigate("/");
    };


    if (!users) {
      return <p>Loading...</p>; // Or a message indicating the post doesn't exist
    }

    return (
      (userExists)?(
        <div className="Dashboard">
          <h2>Profile</h2>
          <form>
            <div>
                <label>User Name: </label>
                <input  type="text" name="username" value={loggedInUser.username} readOnly/>
            </div>
            <div>
                <label>Email: </label>
                <input type="email" name="email" value={loggedInUser.email} readOnly/>
            </div>
            <div>
                <label>Password: </label>
                <input type="password" name="password" value={loggedInUser.password} readOnly/>
            </div>
            <div>
              <Link to={'/editProfile'}><button>Edit</button></Link> <button onClick={handleLogout}>Logout</button>
            </div>
          </form>
        </div>):(
          <div>
            There are no User Logged In!!
          </div>
        )
    );
}

export default Dashboard;