import React from 'react';
import RecipeList from './RecipeList';

function Recipe({ recipe, setRecipe, handleLike, handleAddComment, handleDelete, handleRating }) {
  return (
    <div>
      {recipe.length > 0 ? recipe.map(rec => (
        <RecipeList
          key={rec.id}
          id={rec.id}
          name={rec.name}
          image={rec.image}
          description={rec.description}
          likes={rec.likes}
          ingredients={rec.ingredients}
          instructions={rec.instructions}
          comments={rec.comments}
          rating={rec.rating}
          handleLike={handleLike}
          handleAddComment={handleAddComment}
          handleDelete={handleDelete}  
          handleRating={handleRating}
        />
      )) : null}
    </div>
  );
}

export default Recipe;
