import {BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import HomeUser from "./users/HomeUser";
import AddEditUser from "./users/AddEditUser";
import ViewUser from "./users/ViewUser";
import Login from "./Login"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
        <Routes>
          <Route path="/login" element={<Login /> } />
          <Route path="/" element={<Home />}/>
          <Route path="/addAttender" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/user" element={<HomeUser />} />
          <Route path="/addUser" element ={<AddEditUser />} />
          <Route path="/updateUser/:id" element = {<AddEditUser />} />
          <Route path="/viewUser/:id" element={<ViewUser /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
