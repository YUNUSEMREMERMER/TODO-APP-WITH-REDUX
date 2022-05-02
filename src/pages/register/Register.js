import { Button } from '@mui/material';
import { useState } from 'react';
import "./style.css"
import { addUserAsync } from "../../redux/user/userSlice"
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate  } from "react-router-dom"


export default function Register() {

    // States for registration
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
    const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setError(true);
        } else {
            const user = {
                "id":nanoid(),
                "firstName":name,
                "lastName":lastName,
                "email":email,
                "password":password,
            }
            dispatch(addUserAsync(user));
            navigate("/home", { replace: true })
        }

    };


    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>



            <form >
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input onChange={handleName} className="input"
                    value={name} type="text" />
                <label className="label">Last Name</label>
                <input onChange={handleLastName} className="input"
                    value={lastName} type="text" />

                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                    value={email} type="email" />

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                    value={password} type="password" />


            </form>
            <Button variant="contained" style={{ margin: "10px" }} onClick={handleSubmit}>Register</Button>
        </div>
    );
}
