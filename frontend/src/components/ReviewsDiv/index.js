import {useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ReviewsDiv.css"

function ReviewsDiv () {
 const {spotId} = useParams();
 const dispatch = useDispatch();
 const reviews = useSelector((state) => state.spots[spotId].Reviews)
 const sessionUser = useSelector((state=> state.session.user.id))


let reviewDisplay;

if(reviews.length < 1) {
  reviewDisplay = (
    <div className="reviewsDiv">No reviews for this spot yet... </div>
  )
} else {
  reviewDisplay = (
    <div>
      <h2>Reviews</h2>
      <ul className="reviewsDiv">
        {reviews.map((review) => {
          if (review) {
            return (
              <div className="singleReview">
                <li className="reviewText" key={review.id}>
                  {review.review}
                </li>
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}

  return (
    <>
    <div>
      {reviewDisplay}
    </div>
    </>
  )
}

export default ReviewsDiv;
