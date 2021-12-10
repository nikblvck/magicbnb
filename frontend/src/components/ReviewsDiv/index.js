import {useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ReviewsDiv.css"

function ReviewsDiv () {
 const {spotId} = useParams();
 const dispatch = useDispatch();
 const reviews = useSelector((state) => state.spots[spotId]?.Reviews)
 const sessionUser = useSelector((state=> state.session.user.id));
 const review = useSelector(state => state.spots[spotId]?.Review)
 const userId = sessionUser.id
 const handleSubmit = (e) =>  {

 }
 const handleDelete = (e) => {

 }
let reviewUserButtons


  // if (sessionUser && sessionUser.id === review.userId) {
  //   reviewUserButtons = (
  //     <>
  //       <button onClick={handleSubmit}>
  //         {" "}
  //         <i className="fas fa-edit" />
  //       </button>
  //       <button onClick={handleDelete}>
  //         <i className="fas fa-trash" />
  //       </button>
  //     </>
  //   );
  // } else {
  //   reviewUserButtons = null;
  // }

let reviewDisplay;

if(!reviews) {
  reviewDisplay = (
    <div>No reviews for this spot yet... </div>
  )
} else {
  reviewDisplay = (
    <div>
      <ul className="reviewsDiv">
        {reviews.map((review) => {
          if (review) {
            return (
              <div className="singleReview">
                <li className="reviewText" key={review.id}>
                  {review.review}
                </li>
                {reviewUserButtons}
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
