import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeForm({ setRecipe, fetchRecipes }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newRecipe = {
      name,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions,
      likes: 0,
      comments: comments.split(',').map(item => item.trim()),
      image,
      description: ""
    };
  
    fetch('https://json-server-recipes-3.onrender.com/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to add recipe');
        }
        return res.json();
      })
      .then(() => {
        setName('');
        setIngredients('');
        setInstructions('');
        setImage('');
        setComments('');
        fetchRecipes(); // Fetch updated recipes list
        navigate('/recipes'); // Redirect to the recipes page
      })
      .catch(error => console.error('Error adding recipe:', error));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Recipe</h2>
      <input 
        type="text" 
        placeholder="Recipe Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Ingredients" 
        value={ingredients} 
        onChange={e => setIngredients(e.target.value)} 
      />
      <textarea 
        placeholder="Instructions" 
        value={instructions} 
        onChange={e => setInstructions(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Image URL" 
        value={image} 
        onChange={e => setImage(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Initial Comments" 
        value={comments} 
        onChange={e => setComments(e.target.value)} 
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;
