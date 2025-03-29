import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/AdminPage.jsx';
import ItemsPage from './pages/ItemsPage.jsx';
import ItemDetailPage from './pages/ItemDetailPage.jsx';
import DeletePage from './pages/DeletePage.jsx';
import UpdateItemPage from './pages/UpdateItemPage.jsx';
import Navbar from './components/Navbar';
import axios from 'axios';
import HomePage from './pages/HomePage.jsx';

// Set up Axios default base URL
axios.defaults.baseURL = 'http://localhost:8000'; // Ensure this matches your backend URL
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // Include credentials if required by the backend

// Optional: Add an interceptor for logging or handling errors
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Items page */}
          <Route path="/items" element={<ItemsPage />} /> {/* Items page */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} /> {/* Item detail page */}
          <Route path="/delete" element={<DeletePage />} />
          <Route path="/items/:id/update" element={<UpdateItemPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;