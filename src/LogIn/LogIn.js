import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInUser, deleteLoggedInUser } from '../reducers/loggedInReducer';
import React,{ useState,useEffect, useRef } from "react";
import { fetchUsers } from '../FetchData/FetchData';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';

function LogIn(){
    const existingUsers = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputSubjectRef = useRef(null);


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        inputSubjectRef.current.focus();
    }, []);

    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();
        handleLogin()
    };

    const handleLogin = () => {
        const userExists = existingUsers.some((user)=>(user.username === username && user.password === password));

        if (userExists){
            dispatch(setLoggedInUser(username));
            localStorage.setItem("loggedInUser", username);
            setUsername('');
            setPassword('');
            alert("You are Login")
            navigate("/");
        }else{
            alert("invalid username or password!")
        }
    };

    return(
        <div className="LogInContainer">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <input ref={inputSubjectRef} type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            <div>
                <br/>
                <Link to={'/register'}><button>Register</button></Link>
            </div>
        </div>
    );
}

export default LogIn;