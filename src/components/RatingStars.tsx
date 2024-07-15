import React, { useState } from 'react';
import LeftStar from './LeftStar';
import RightStar from './RightStar';

type RatingStarsProps = {
  totalStars: number;
  onRatingChange: (rating: number) => void;
};

const RatingStars: React.FC<RatingStarsProps> = ({ totalStars, onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  const handleMouseEnter = (newHoverRating: number) => {
    setHoverRating(newHoverRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    console.log(`Submitted Rating: ${rating}`);
  };

  return (
    <div className="flex flex-col items-center ml-4">
      <div className="flex flex-row-reverse items-center justify-center mx-5 space-x-reverse text-2xl">
        <div className="text-base text-[#505050]">{`(${rating})`}</div>
        {Array.from({ length: totalStars * 2 }, (_, index) => {
          const starValue = (totalStars * 2 - index) / 2;
          return (
            <label
              key={starValue}
              className="cursor-pointer"
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
            >
              <input
                type="radio"
                className="hidden peer"
                id={`star${starValue}`}
                value={starValue}
                name="rating"
                onChange={() => handleRatingChange(starValue)}
              />
              {starValue % 1 === 0 ? (
                <LeftStar
                  className={`mr-4 fill-current inline ${
                    starValue <= (hoverRating || rating) ? 'fill-yellow-400' : 'fill-gray-300'
                  } peer-hover:fill-yellow-400`}
                />
              ) : (
                <RightStar
                  className={`fill-current inline ${
                    starValue <= (hoverRating || rating) ? 'fill-yellow-400' : 'fill-gray-300'
                  } peer-hover:fill-yellow-400`}
                />
              )}
            </label>
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="w-[12.5rem] h-[3.75rem] my-8 text-white bg-midnight rounded-full text-xl font-semibold"
      >
        평가하기
      </button>
    </div>
  );
};

export default RatingStars;
