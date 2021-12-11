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
const [content, setContent] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const userId = sessionUser.id;


      const newReview = {
        userId,
        spotId,
        content,
      };
      dispatch(createReview(newReview));
      console.log(newReview);
      history.push(`/spots/${spotId}`)
    };

  return (
    <>
    <div className="addReviewContainer">
    <form onSubmit={handleSubmit}>
      <label>
        Your thoughts on this spot...
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required />
      </label>
      <button type="submit">ADD REVIEW</button>
    </form>
    </div>
    </>
  )
}

export default AddReviewForm;
