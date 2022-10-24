import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
    const [attender, setAttender] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8083/api/get/${id}`)
            .then((resp) => setAttender({...resp.data[0]}));
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
                   <strong>Name Surname:</strong>
                   <span>{attender.namesurname}</span>
                   <br />
                   <br />
                   <strong>Email:</strong>
                   <span>{attender.email}</span>
                   <br />
                   <br />
                   <strong>Age:</strong>
                   <span>{attender.age}</span>
                   <br />
                   <br />
                   <Link to="/">
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