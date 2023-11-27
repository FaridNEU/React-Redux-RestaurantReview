import React,{ useState,useEffect, useRef } from "react";
import './Register.css';
import { addUser } from '../reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Register(){
    const existingUsers = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputSubjectRef = useRef(null);


    useEffect(() => {
        inputSubjectRef.current.focus();
    }, []);

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
        country:'',
        agreeToTerms:false,
    });
    const handleChange = (e)=>{
        const {name, value, type, checked} = e.target;
        const newValue = (type === "checkbox" ? checked : value)

        setFormData({...formData, [name]:newValue});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isValidInput(formData)){
            handleRegister(formData);
            setFormData({
                username:'',
                email:'',
                password:'',
                country:'',
                agreeToTerms:false,
            });
        }else{
            alert("Please fill all fields correctly.")
        }
    };

    const handleRegister = async (formData)=>{

        const newUser = formData.username;

        const userExists = existingUsers.some((user) => user.username === newUser)

        if(userExists){
            alert("Username Already Exists. Please choose a different one!")
        } else{
            try {
                dispatch(addUser(formData));
                //Add (all-users) to (Api)
                await apiPostUser(formData);
                alert("Registration Successful!")
                navigate("/login");
            }catch{
                // Handle errors here
                alert('Error fetching or processing data! Please try again.');
            }
        }
    };

    const isValidInput = (formData) => {
        if (formData.username && formData.email && formData.password && formData.country && formData.agreeToTerms)
            return true;
        return false;
    };

    return(
        <div className="RegisterContainer">
            <h2>Registeration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name: </label>
                    <input ref={inputSubjectRef} type="text" name="username" value={formData.username} onChange={handleChange}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div>
                    <label>Country: </label>
                    <select name="country" value={formData.country} onChange={handleChange}>
                        <option value={"United State"}>United State</option>
                        <option value={"Canada"}>Canada</option>
                        <option value={"Other"}>Other</option>
                    </select>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange}/>
                        I agree to terms and conditions!
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;


function apiPostUser(formData){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU3MzJkMWRhMDQ1NGMzODY3NjQwNSIsInVzZXJuYW1lIjoiMDAyODMwNDk4UyIsImlhdCI6MTcwMDA5OTU0NCwiZXhwIjoxNzAxMzk1NTQ0fQ.yShpqb4vEkAb6ZOO4r_B82t177T17m1IfDjSgflBtd8");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": formData.username,
        "email": formData.email,
        "password": formData.password,
        "country": formData.country
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}