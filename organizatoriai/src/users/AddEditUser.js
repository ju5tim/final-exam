import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEditUser.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    username: "",
    password: "",
    password_repeat: "",
    role: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {username, password, password_repeat, role} = state;

    const navigate = useNavigate();


    const {id} = useParams();

    useEffect(() => {
        
        const loggedInUser = localStorage.getItem("user_role");
        if (!loggedInUser || !(loggedInUser === "Admin")){
            navigate("/login");
        }
        axios
            .get(`http://localhost:8083/api/getUser/${id}`)
            .then((resp) => setState({...resp.data[0]}));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !password || !role || !password_repeat){
            toast.error("Please provide value into each input field");
        }
        else if (password !== password_repeat){
            toast.error("password is not matching in fields password and password_repeat");
        }
        else {
            if(!id){
                axios
                    .post("http://localhost:8083/api/register", {
                    username,
                    password,
                    password_repeat,
                    role
                })
                .then(() =>{
                    setState({username: "", password: "", role: ""});
                }).catch((err) => {
                    if(err.response){
                        toast.error(err.response.data);
                    }
                    
                });
             
            } else {
                axios
                    .put(`http://localhost:8083/api/updateUser/${id}`, {
                    username,
                    password,
                    password_repeat,
                    role
                })
                .then(() =>{
                    setState({username: "", password: "", password_repeat: "", role: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("User updated successfully.");
            }
        }
        setTimeout(() => navigate("/addUser"), 500)
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
                <label htmlFor="password_repeat">Repeate passowrd</label>
                <input type="password"
                id="password_repeat"
                name="password_repeat"
                placeholder="Repeat Your password..."
                value={password_repeat || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="role">Role</label>
                <input type="text"
                id="role" 
                name="role" 
                placeholder="User role (Admin/User)..."
                value={role || ""}
                onChange={handleInputChange}
                />
                
                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/user">
                    <input type="button" value="Go Back" />
                </Link>
                <Link to="/login">
                    <input type="button" value="LOG OUT" />
                </Link>
            </form>

        </div>
    )
}

export default AddEdit;