import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./ViewUser.css";

const View = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const loggedInUser = localStorage.getItem("user_role");
        if (!loggedInUser || !(loggedInUser === "Admin")){
            navigate("/login");
        }
        axios
            .get(`http://localhost:8083/api/getUser/${id}`)
            .then((resp) => setUser({...resp.data[0]}));
    }, [id]);

    return (
        <div style = {{marginTop: "150px"}}>
           <div className='card'>
               <div className='card-header'>
                   <p>User Contact Detail</p>
               </div>
               <div className='container'>
                   <strong>ID:</strong>
                   <span>{id}</span>
                   <br />
                   <br />
                   <strong>Username:</strong>
                   <span>{user.username}</span>
                   <br />
                   <br />
                   <strong>Role:</strong>
                   <span>{user.role}</span>
                   <br />
                   <br />
                   <strong>Last logged in:</strong>
                   <span>{user.last_login}</span>
                   <br />
                   <br />
                   <strong>Registered:</strong>
                   <span>{user.registered}</span>
                   <br />
                   <br />
                   <Link to="/user">
                       <div className="btn btn-edit">Go Back</div>
                   </Link>
                   <Link to="/login">
                        <input type="button" value="LOG OUT" />
                    </Link>
               </div>
           </div>
        </div>
    )
}

export default View;