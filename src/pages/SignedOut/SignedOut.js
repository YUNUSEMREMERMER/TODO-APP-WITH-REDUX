
import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserAsync } from "../../redux/user/userSlice";
import { useDispatch } from 'react-redux'


import "./styles.css";

function SignedOut() {
  const navigate = useNavigate();
  const[email, setEmail] = useState();
  const[password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleButton = () => {
    const login = {
      "email":email,
      "password":password
    }
    dispatch(getUserAsync(login));
    navigate("/home", { replace: true });
  }

  return (
    <div className="form">
      <form >
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required onChange={(e) => {setEmail(e.target.value)}} />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required onChange={(e) => {setPassword(e.target.value)}} />
          
        </div>
        <div className="button-container" style={{display:"flex", gap:"10px"}} >
          
          <Button variant="contained" color="success" onClick={handleButton}  >Sign in</Button>
          <Link to="/register"><Button variant="contained" >Register</Button></Link>
          
        
        </div>
      </form>
    </div>
  );

  
}

export default SignedOut
