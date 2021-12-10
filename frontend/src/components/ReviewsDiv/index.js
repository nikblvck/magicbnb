import {useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function ReviewsDiv () {
 const {spotId} = useParams();
 const dispatch = useDispatch();
 const reviews = useSelector((state) => state.spots[spotId].Reviews)

let reviewDisplay;

if(!reviews) {
  reviewDisplay = (
    <div>No reviews for this spot yet... </div>
  )
} else {
  reviewDisplay = (
    <div>
      <ul>
        {reviews.map((review) => {
          <li>{review.review}</li>
        })}
      </ul>
    </div>
  );
}

  return (
    <>
    <div>
      <h2>REVIEWS</h2>
      {reviewDisplay}
    </div>
    </>
  )
}

export default ReviewsDiv;
