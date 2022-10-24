import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";


const Home = () => {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");

    const loadData = async () => {
        const response = await (await axios.get(`http://localhost:8083/api/getAttenders/${userId}` ));
        
        setData(response.data);
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user_role");
        if (!loggedInUser || !(loggedInUser === "User")){
            navigate("/login");
        }
        loadData();
    }, []);

    const deleteAttender = (id) => {
        if(
            window.confirm("Are you sure you want delete attender?")
        ){
        axios.delete(`http://localhost:8083/api/remove/${id}`);
        toast.success("Attender Deleted Successfully");
        setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{marginTop: "150px"}}>
                <Link to="/addAttender">
                    <button className="btn btn-contact">Add Attender</button>
                </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Name Surname.</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Age</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.namesurname}</td>
                                <td>{item.email}</td>
                                <td>{item.age}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete"
                                    onClick={() => deleteAttender(item.id)}>Delete</button>                                   
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        );
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