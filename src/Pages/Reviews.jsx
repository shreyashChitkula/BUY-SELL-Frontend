// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { UserDetails } from "../Components/Profile";
// import ReviewCard from "../Components/ReviewCard";

// const SellerReview = () => {
//   const { id } = useParams(); // Get the seller ID from the URL
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/users/profile/${id}`
//         );
//         setUser(response.data.user);
//         console.log("user", response.data.user);
//       } catch (err) {
//         setError("Failed to fetch reviews. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   if (loading)
//     return <div className="text-center text-gray-500">Loading reviews...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="profile flex flex-col">
//       {user ? <UserDetails user={user} /> : <></>}
//       <div className="relative">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Seller Reviews
//         </h1>

//         <div
//           className="add-icon"
//           onClick={() => setUpdateDetails(!updateDetails)}
//         >
//           <img
//             title="Add review"
//             src="/images/add.webp"
//             className="w-full h-full object-cover rounded-full border border-gray-300 shadow-md scale-150"
//             alt="Edit"
//           />
//         </div>
//         {user.sellerReviews?.length > 0 ? (
//           user.sellerReviews.map((review, index) => (
//             <div
//               key={index}
//               className="mb-4 p-4 border border-gray-200 rounded-lg shadow-md"
//             >
//               <ReviewCard
//                 rating={review.rating}
//                 review={review.review}
//                 reviewerName={
//                   review.reviewerId.firstName + " " + review.reviewerId.lastName
//                 }
//                 reviewerProfileImage={review.reviewerId.profileImage}
//               />
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No reviews yet!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellerReview;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserDetails } from "../Components/Profile";
import ReviewCard from "../Components/ReviewCard";
import { useUserState } from "../utils/UserState";

const SellerReview = () => {
  const { id } = useParams();
  const { getUserId } = useUserState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [updateDetails, setUpdateDetails] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    review: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/profile/${id}`
        );
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/reviews/${id}`,
        { ...newReview, reviewerId: getUserId() }
      );
      // Assuming the response returns the updated user with new review
      // setUser(response.data.user);
      setUpdateDetails(false);
      // Reset form
      setUser({ ...user, sellerReviews: response.data.sellerReviews });
      setNewReview({ rating: 3, review: "" });
      console.log("new review", response.data);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-500">Loading reviews...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className=" w-full max-w-4xl mx-auto px-4">
      {user ? <UserDetails user={user} /> : <></>}
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Seller Reviews</h1>
          <div
            className="cursor-pointer w-10 h-10"
            onClick={() => setUpdateDetails(!updateDetails)}
          >
            <img
              title="Add review"
              src="/images/add.webp"
              className="w-full h-full object-cover rounded-full border border-gray-300 shadow-md hover:scale-110 transition-transform"
              alt="Add Review"
            />
          </div>
        </div>

        {updateDetails && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-6 p-4 border border-gray-200 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Review</label>
              <textarea
                value={newReview.review}
                placeholder="Write your review here"
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    review: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* <div className="flex flex-wrap gap-4 justify-center">
          {user.sellerReviews?.length > 0 ? (
            user.sellerReviews.map((review, index) => (
              <div
                key={index}
                className="max-w-[50%]  p-4 border border-gray-200 rounded-lg shadow-md"
              >
                <ReviewCard
                  rating={review.rating}
                  review={review.review}
                  reviewerName={
                    review.reviewerId.firstName +
                    " " +
                    review.reviewerId.lastName
                  }
                  reviewerProfileImage={review.reviewerId.profileImage}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No reviews yet!</p>
          )}
        </div> */}
        <div className="flex flex-wrap gap-4 justify-center">
          {user.sellerReviews?.length > 0 ? (
            user.sellerReviews.map((review, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-1rem)] p-4 border border-gray-200 rounded-lg shadow-md overflow-auto"
              >
                <ReviewCard
                  id={review.reviewerId.id}
                  rating={review.rating}
                  review={review.review}
                  reviewerName={
                    review.reviewerId.firstName +
                    " " +
                    review.reviewerId.lastName
                  }
                  reviewerProfileImage={review.reviewerId.profileImage}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No reviews yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerReview;
