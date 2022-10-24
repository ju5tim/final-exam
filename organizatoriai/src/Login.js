import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./users/AddEditUser.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    username: "",
    password: "",
   
}

const Login = () => {
    const [state, setState] = useState(initialState);

    const {username, password} = state;

    const navigate = useNavigate();

    localStorage.clear();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !password ){
            toast.error("Please provide value into each input field");
        }
        else {
            axios
                .post("http://localhost:8083/login", {
                username,
                password,
                    
                })
                
                .then(response => {
                    
                
                    if (response.data.token) {
                      localStorage.setItem("user_token", response.data.token);
                      localStorage.setItem("user_role", response.data.user.role);
                      localStorage.setItem("user_id", response.data.user.id)

                      toast.success("Logged in successfully." + response.data.user.role);
                      if(response.data.user.role==="Admin"){
                        navigate("/user");
                      }
                      else if (response.data.user.role==="User"){
                          navigate("/")
                      }
                      else {
                          toast.error("You have no needed rights (Admin or User) rights are needed");
                          navigate("/login");
                      }

                    }  
                  }).catch((err) => toast.error(err.response.data));   
             
        }
        setTimeout(() => {
            toast.error("Please check username and password");
        }, 500)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value });
    }
    return (
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" 
                id="username" 
                name="username" 
                placeholder="Your username..."
                value={username || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="password">Password</label>
                <input type="password" 
                id="password" 
                name="password" 
                placeholder="Password... "
                value={password || ""}
                onChange={handleInputChange}
                />
                
                <input type="submit" value="Log in" />
            
            </form>

        </div>
    )
}

export default Login;