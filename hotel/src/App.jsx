import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RoomSearch from './components/RoomSearch'
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NavPanel from "./components/NavPanel";

function App()
{
  return(
    <Router>
      <NavPanel />

      <main style= {{maxWidth: "1200px", margin: "30px auto", padding: "0 20px"}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<RoomSearch />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;