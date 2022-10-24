import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    namesurname: "",
    email: "",
    age: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {namesurname, email, age} = state;
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();

    const {id} = useParams();


    useEffect(() => {
        const loggedInUser = localStorage.getItem("user_role");
        if (!loggedInUser || !(loggedInUser === "User")){
            navigate("/login");
        }
        axios
            .get(`http://localhost:8083/api/get/${id}`)
            .then((resp) => setState({...resp.data[0]}));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!namesurname || !email || !age){
            toast.error("Please provide value into each input field")
        }
        else {
            if(!id){
                axios
                    .post("http://localhost:8083/api/addAttender", {
                    namesurname,
                    email,
                    age, 
                    userId
                })
                .then(() =>{
                    setState({namesurname: "", email: "", age: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Attender added successfully.");
             
            } else {
                axios
                    .put(`http://localhost:8083/api/update/${id}`, {
                    namesurname,
                    email,
                    age
                })
                .then(() =>{
                    setState({namesurname: "", email: "", age: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Attender updated successfully.");
            }
        }
        setTimeout(() => navigate("/addAttender"), 500)
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
                <label htmlFor="namesurname">Name</label>
                <input type="text" 
                id="namesurname" 
                name="namesurname" 
                placeholder="Your full name..."
                value={namesurname || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input type="text" 
                id="email" 
                name="email" 
                placeholder="Your email..."
                value={email || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="age">Age</label>
                <input type="number"
                id="age" 
                name="age" 
                placeholder="Your age..."
                value={age || ""}
                onChange={handleInputChange}
                />
                
                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/">
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