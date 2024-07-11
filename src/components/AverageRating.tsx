import React from 'react';
import StarRatings from 'react-star-ratings';

type AverageRatingProps = {
  rating: number;
  starDimension?: string;
  starSpacing?: string;
};

const AverageRating: React.FC<AverageRatingProps> = ({ rating, starDimension = '48px', starSpacing = '5px' }) => {
  return (
    <div className="flex items-center justify-center h-full flexitems-center">
      <StarRatings rating={rating} starRatedColor="#FFD700" starDimension={starDimension} starSpacing={starSpacing} />
      <p className="ml-4 text-base text-[#505050]">({rating.toFixed(1)})</p>
    </div>
  );
};

export default AverageRating;
