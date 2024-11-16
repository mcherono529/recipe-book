import React, { useState } from 'react';

function StarRating({ rating, onRate }) {
  const [hovered, setHovered] = useState(null);  // Store the hovered star index

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index) => {
    onRate(index + 1);  (1-5)
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < (hovered !== null ? hovered : rating); // Check if the star should be filled
        return (
          <span
            key={index}
            className={`star ${isFilled ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            &#9733;  
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
