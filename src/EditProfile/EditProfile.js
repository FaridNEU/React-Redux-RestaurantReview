
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInUser, deleteLoggedInUser } from '../reducers/loggedInReducer';
import { editUser } from '../reducers/userReducer';
import { fetchUsers } from '../FetchData/FetchData';
import './EditProfile.css';
import { Link, useNavigate } from 'react-router-dom';



function EditProfile() {
    const loggedInUsername =  localStorage.getItem("loggedInUser");
    const users = useSelector((state) => state.users.users); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputSubjectRef = useRef(null);

    const [loggedInUser, setLoggedInUser] = useState({
        _id: "",
        username: "",
        email: "",
        password: "",
        country: "",
    });
    const [userId, setUserId] = useState();


    //const userExists = users.some((user)=>(user.username === loggedInUsername));

    useEffect(() => {
        dispatch(fetchUsers());
        users.some((user , index)=>{
          if(user.username === loggedInUsername){
            setLoggedInUser(user);
            setUserId(index);
          }
        });
    }, [dispatch]);

    useEffect(() => {
        inputSubjectRef.current.focus();
    }, []);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLoggedInUser({...loggedInUser, [name]:value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isValidInput(loggedInUser)){
            handleUpdate(loggedInUser);
            setLoggedInUser({
                _id: "",
                username:'',
                email:'',
                password:'',
                country:'',
            });
        }else{
            alert("Please fill all fields correctly.")
        }
    };

    const handleUpdate = async (loggedInUser)=>{

        const Username = loggedInUser.username;

        try {
            await apiUpdateUser(loggedInUser);
            alert("Update Successful!")
            navigate("/dashboard");
        }catch{
            alert('Error fetching or processing data! Please try again.');
        }
    
    };

    const isValidInput = (formData) => {
        if (formData.username && formData.email && formData.password && formData.country)
            return true;
        return false;
    };

    return(
        <div className="EditProfile">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>User Name: </label>
                <input type="text" name="username" value={loggedInUser.username} readOnly/>
            </div>
            <div>
                <label>Email: </label>
                <input ref={inputSubjectRef} type="email" name="email" value={loggedInUser.email} onChange={handleChange}/>
            </div>
            <div>
                <label>Password: </label>
                <input type="password" name="password" value={loggedInUser.password} onChange={handleChange}/>
            </div>
            <div>
                <label>Country: </label>
                <select name="country" value={loggedInUser.country} onChange={handleChange}>
                    <option value={"United State"}>United State</option>
                    <option value={"Canada"}>Canada</option>
                    <option value={"Other"}>Other</option>
                </select>
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
    );
}
export default EditProfile;


function apiUpdateUser(loggedInUser){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");
    myHeaders.append("Content-Type", "application/json");
  
  
    var raw = JSON.stringify({
        "username": loggedInUser.username,
        "email": loggedInUser.email,
        "password": loggedInUser.password,
        "country": loggedInUser.country,
        "_id": loggedInUser._id
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/"+loggedInUser._id, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}