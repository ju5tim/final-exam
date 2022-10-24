import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./HomeUser.css";
import {toast} from "react-toastify";
import axios from "axios";
const Home = () => {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const loadData = async () => {
        const response = await axios.get("http://localhost:8083/api/getUsers");
        setData(response.data);
    };

    useEffect(() => {        
        loadData();

        const loggedInUser = localStorage.getItem("user_role");
        if (!loggedInUser || !(loggedInUser === "Admin")){
            navigate("/login");
        }
    }, []);

    const deleteUser = (id) => {
        if(
            window.confirm("Are you sure you want delete user?")
        ){
        axios.delete(`http://localhost:8083/api/removeUser/${id}`);
        toast.success("User Deleted Successfully");
        setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{marginTop: "150px"}}>
                <Link to="/addUser">
                    <button className="btn btn-contact">Add User</button>
                </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Id.</th>
                        <th style={{textAlign: "center"}}>Username</th>
                        <th style={{textAlign: "center"}}>Role</th>
                        <th style={{textAlign: "center"}}>Registered</th>
                        <th style={{textAlign: "center"}}>Last Login</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.username}</td>
                                <td>{item.role}</td>
                                <td>{item.registered}</td>
                                <td>{item.last_login}</td>
                                <td>
                                    <Link to={`/updateUser/${item.id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete"
                                    onClick={() => deleteUser(item.id)}>Delete</button>                                   
                                    <Link to={`/viewUser/${item.id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
                
            </table>
            <Link to="/login">
                <input type="button" value="LOG OUT" />
            </Link>
        </div>
    )
}

export default Home;