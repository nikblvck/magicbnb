import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "../../store/spots";
import "./AddReview.css";

function AddReview () {
const {spotId} = useParams();
const dispatch = useDispatch();
const history = useHistory();
const sessionUser = useSelector((state) => state.session.user);

const handleSubmit = (e) => {
  e.preventDefault();
  const userId = sessionUser.id;
  const spotId = useParams();

  const newReview = {
    userId,
    spotId,
    review
  }
   dispatch(addReview(newReview))
   console.log(newReview)
}
const
  return (
    <>
    <form>
      <label>
        Your thoughts on this spot...
        <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required />
      </label>
      <button>ADD REVIEW</button>
    </form>
    </>
  )
}

export default AddReview;
