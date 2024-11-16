import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';

function RecipeDetail() {
  const [recipe, setRecipe] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    fetch('https://json-server-recipes-1.onrender.com/recipes')
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleLike = async (id) => {
    const updatedRecipe = await Promise.all(
      recipe.map(async (rec) => {
        if (rec.id === id) {
          const updatedLikes = rec.likes + 1;
          try {
            await fetch(`https://json-server-recipes-1.onrender.com/recipes/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ likes: updatedLikes }),
            });
          } catch (error) {
            console.error('Error updating likes:', error);
          }
          return { ...rec, likes: updatedLikes };
        }
        return rec;
      })
    );
    setRecipe(updatedRecipe);
  };

  const handleAddComment = async (id, newComment) => {
    const updatedRecipe = await Promise.all(
      recipe.map(async (rec) => {
        if (rec.id === id) {
          const updatedComments = [...rec.comments, newComment];
          try {
            await fetch(`https://json-server-recipes-1.onrender.com/recipes/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ comments: updatedComments }),
            });
          } catch (error) {
            console.error('Error adding comment:', error);
          }
          return { ...rec, comments: updatedComments };
        }
        return rec;
      })
    );
    setRecipe(updatedRecipe);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://json-server-recipes-1.onrender.com/recipes/${id}`, {
        method: 'DELETE',
      });
      const updatedRecipe = recipe.filter((rec) => rec.id !== id);
      setRecipe(updatedRecipe);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleRating = async (id, newRating) => {
    const updatedRecipe = await Promise.all(
      recipe.map(async (rec) => {
        if (rec.id === id) {
          try {
            await fetch(`https://json-server-recipes-1.onrender.com/recipes/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ rating: newRating }),
            });
          } catch (error) {
            console.error('Error updating rating:', error);
          }
          return { ...rec, rating: newRating };
        }
        return rec;
      })
    );
    setRecipe(updatedRecipe);
  };

  const filteredRecipes = recipe.filter((rec) =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <Recipe
        recipe={filteredRecipes} 
        setRecipe={setRecipe}
        handleLike={handleLike}
        handleAddComment={handleAddComment}
        handleDelete={handleDelete}
        handleRating={handleRating}
      />
    </div>
  );
}

export default RecipeDetail;
