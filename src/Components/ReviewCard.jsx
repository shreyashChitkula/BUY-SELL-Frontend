// import React from "react";
// import { Star, StarHalf } from "lucide-react";
// import axios from "axios";

// const ReviewCard = ({ rating, review, reviewerName, reviewerProfileImage }) => {
//   // Render star rating
//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     return (
//       <div className="flex items-center">
//         {[...Array(fullStars)].map((_, i) => (
//           <Star key={`full-${i}`} color="#FFD700" fill="#FFD700" size={20} />
//         ))}
//         {hasHalfStar && <StarHalf color="#FFD700" fill="#FFD700" size={20} />}
//         {[...Array(5 - Math.ceil(rating))].map((_, i) => (
//           <Star key={`empty-${i}`} color="#E0E0E0" size={20} />
//         ))}
//       </div>
//     );
//   };

//   if (!reviewerName || !rating || !review )
//     return null;

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4 max-w-md">
//       <div className="flex items-center space-x-4 mb-4">
//         <img
//           src={reviewerProfileImage || "/icons/profile.webp"}
//           alt={reviewerName}
//           className="w-16 h-16 rounded-full object-cover"
//         />
//         <div>
//           <h3 className="text-lg font-semibold">{reviewerName}</h3>
//           {renderStars(rating)}
//         </div>
//       </div>
//       <p className="text-gray-700 italic">"{review}"</p>
//       {/* <div className="mt-4 text-sm text-gray-500">
//         Reviewed on {new Date().toLocaleDateString()}
//       </div> */}
//     </div>
//   );
// };

// export default ReviewCard;
import React from "react";
import { Star, StarHalf } from "lucide-react";
import { Link } from "react-router-dom";

const ReviewCard = ({
  id,
  rating,
  review,
  reviewerName,
  reviewerProfileImage,
}) => {
  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-500 fill-current"
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="w-5 h-5 text-yellow-500 fill-current" />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
      </div>
    );
  };

  // Modify the condition to allow 0 rating
  if (!reviewerName || rating === undefined || !review) return null;

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col overflow-auto">
      <Link to={`/reviews/${id}`}>
        <div className="flex items-center mb-2">
          {reviewerProfileImage && (
            <img
              src={reviewerProfileImage}
              alt={reviewerName}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800">{reviewerName}</h3>
            {renderStars(rating)}
          </div>
        </div>
      </Link>
      <p className="text-gray-600 italic ">"{review}"</p>
    </div>
  );
};

export default ReviewCard;
