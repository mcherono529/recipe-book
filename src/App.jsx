import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm'; // Assuming you want to navigate to this

import './App.css';

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
      </Routes>
    </div>
  );
}

export default App;
