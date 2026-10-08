import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";
import Sidebar from "./component/Sidebar/Sidebar";

import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const url = "https://food-delivery-system-2xcs.onrender.com";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />

      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
