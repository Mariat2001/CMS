import logo from './logo.svg';
import './App.css';
import TodoWrapper from './component/TodoWrapper';
import Login from './component/Login';
import {BrowserRouter, Routes, Route, Switch} from 'react-router-dom'
import Register from './component/Register';
import Home from './component/Home'
import Productindex from './component/Products/Productindex'
import AddProduct from './component/Products/AddProduct'; 
import EditProduct from './component/Products/EditProduct'; 
import Header from './component/Header/Header';
import Sidebar from './component/sidebar';
import Sidebarlayout from './component/Sidebarlayout';
import HomeDashboards from './component/Home/HomeDashboards';
import Usertable from './component/UserTable/Usertable';
import React, { useState, useEffect } from "react";
import Calendar from './component/calendar/calendar';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState(""); // Add this state variable
  useEffect(() => {
    // Fetch the user's name based on the email
    if (email) {
      axios
        .get('http://localhost:8082/getUserName', { params: { email } })
        .then((response) => {
          setUserName(response.data.name); // Set userName here
        })
        .catch((error) => {
          console.error('Error fetching user name:', error);
        });
    }
  }, [email]);
  return (
    <div className='App'>
      {/* <Sidebar/> */}
      <Sidebarlayout setEmail={setEmail} userName={userName}></Sidebarlayout>
      
      <div className='content' >
        
      <Header/>  
      <div style={{ marginTop:'40px' }}>
      <Routes>
          <Route path='/' element={<Login setEmail={setEmail} />}></Route>
          <Route path='/signup' element={<Register  />}></Route>
          <Route path='/HomeDashboards' element={<HomeDashboards/>}></Route>
          <Route path='/Productindex' element={<Productindex/>}></Route>
          <Route path='/AddProduct' element={<AddProduct/>}></Route>
          <Route path="/EditProduct/:id" element={<EditProduct />} />
          <Route path='/UserTable' element={<Usertable />}></Route>
          <Route path='/Calendar' element={<Calendar/>}></Route>
        
      </Routes>
     
      </div>
      
     </div>
        
    </div>
    
  
  );
}

export default App;
