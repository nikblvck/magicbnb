import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory, useParams} from "react-router-dom";
import { createReview } from "../../store/spots";
import "./AddReview.css";

function AddReviewForm () {
const {spotId} = useParams();
const dispatch = useDispatch();
const history = useHistory();
const sessionUser = useSelector((state) => state.session.user);
const [review, setReview] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const userId = sessionUser.id;


      const newReview = {
        userId,
        spotId,
        review,
      };
      dispatch(createReview(newReview));
      console.log(newReview);
      history.push(`/spots/${spotId}`)
    };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Your thoughts on this spot...
        <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required />
      </label>
      <button type="submit">ADD REVIEW</button>
    </form>
    </>
  )
}

export default AddReviewForm;
