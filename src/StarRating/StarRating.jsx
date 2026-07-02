import { useState } from "react";

export default function StarRating() {
  const [rating, setRating] = useState(0);

  const starArray = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {starArray.map((star) => (
          <button
            onClick={() => setRating(star)}
            key={star}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            className={`text-4xl leading-none transition-transform hover:scale-110 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            {star <= rating ? "★" : "☆"}
          </button>
        ))}
      </div>
      <p className="text-sm font-medium text-gray-700">{rating} / 5</p>
    </div>
  );
}
/*
DECOMPOSITION
1. What VALUES can CHANGE? Star rating can change
2. Which changes UPDATE the UI? star rating will update the UI, the text below also updates the UI
3. What does the USER do? Users select the star rating
4. What does the UI show? 5 empty Stars used for rating, text rating out of 5

MAPPING
- rating → useState(0)
- the 5 stars → map over a manufactured array ([1, 2, 3, 4, 5])
- each star filled/empty → star's number <= rating means filled
- the "X / 5" text → derived from rating
 */
