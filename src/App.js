import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import Users from './Components/Users'
import UserCreate from "./Components/UserCreate"
import UserUpdate from "./Components/UserUpdate"
import UserCheck from "./Components/UserCheck"
import ListCheck from "./Components/ListCheck"
import CheckUpdate from "./Components/CheckUpdate"
import CheckBrokenPoint from "./Components/CheckBrokenPoint"
import ValidateData from "./Components/ValidateData"

export default function App() {
  return (
      <div>
        <Navbar />
        <Routes >
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/listcheck' element={<ListCheck />} />
          <Route path='/update/:id' element={<UserUpdate />} />
          <Route path='/checkupdate/:id' element={<CheckUpdate />} />
          <Route path='/checkbrokenpoint/:id/:point_id' element={<CheckBrokenPoint />} />
          <Route path='/validatedata/:id/:point_id' element={<ValidateData />} />
          <Route path='/check/:id' element={<UserCheck />} />
        </Routes>
      </div>
  );
}