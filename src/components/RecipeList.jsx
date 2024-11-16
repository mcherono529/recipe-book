import React, { useState } from 'react';
import StarRating from './StarRating';

function RecipeList({
  id, 
  name, 
  image, 
  description, 
  likes, 
  ingredients, 
  instructions, 
  comments, 
  rating,
  handleLike, 
  handleAddComment, 
  handleDelete,
  handleRating
}) {
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // Track expanded state

  const onCommentSubmit = (e) => {
    e.preventDefault();
    handleAddComment(id, newComment);
    setNewComment('');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="recipe-card" onDoubleClick={toggleExpanded}>
      <div className="rating-container">
        <StarRating 
          rating={rating} 
          onRate={(newRating) => handleRating(id, newRating)} 
        />
      </div>

      <h2>{name}</h2>
      <img id="image" src={image} alt={name} />
      <p>{description}</p>

      {isExpanded && (
        <>
          <p>Likes: {likes}</p>
          <button onClick={() => handleLike(id)}>Like</button>
          <p>Ingredients: {ingredients.join(', ')}</p>
          <h4>Instructions: {instructions}</h4>

          <div className="comment-section">
            <h3>Comments:</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
            <form onSubmit={onCommentSubmit}>
              <input
                type="text"
                value={newComment}
                placeholder="Add a comment"
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>

          <button onClick={() => handleDelete(id)}>Delete Recipe</button>
        </>
      )}
    </div>
  );
}

export default RecipeList;
