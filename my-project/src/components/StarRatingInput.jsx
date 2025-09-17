import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";

const StarRatingInput = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        let StarIcon = FaRegStar;

        // Determine which icon to show
        if (hoverValue > 0) {
          if (hoverValue >= starValue) StarIcon = FaStar;
          else if (hoverValue >= starValue - 0.5) StarIcon = FaStarHalfAlt;
        } else {
          if (value >= starValue) StarIcon = FaStar;
          else if (value >= starValue - 0.5) StarIcon = FaStarHalfAlt;
        }

        const handleClick = (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const newRating = x < rect.width / 2 ? starValue - 0.5 : starValue;
          onChange(newRating);
        };

        return (
          <StarIcon
            key={i}
            className="text-[#FAA500] cursor-pointer"
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={handleClick}
            size={24}
          />
        );
      })}
    </div>
  );
};

export default StarRatingInput;