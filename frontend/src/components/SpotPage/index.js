import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteSpot, getOneSpot } from "../../store/spots";
import "./SpotPage.css";


function SpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);


  const [isLoaded, setIsLoaded] = useState(false);
  const [spot, setSpot] = useState({});

  // console.log(spots[spotId])

  ;

  useEffect(() => {
    dispatch(getOneSpot(spotId))
      .then((spot) => setSpot(spot))
      .then(() => setIsLoaded(true));
  }, [dispatch]);
  const { id, name, address, city, state, country, price } = spot;

  const handleSubmit = (e) => {
    e.preventDefault();
    return history.push(`/spots/${spotId}/edit`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId)).then(() => history.push(`/`));
  };

  let userButtons;

  if (sessionUser && sessionUser.id === spot.userId) {
    userButtons = (
      <>
        <button onClick={handleSubmit}>
          {" "}
          <i className="fas fa-edit"/>
        </button>
        <button onClick={handleDelete}>
          <i className="fas fa-trash"/>
        </button>
      </>
    );
  } else {
    userButtons = null;
  }

  let reviewButtons;

  if(sessionUser && sessionUser.id !== spot.userId) {
    reviewButtons = (
      <>
      <button>Add Review</button>
      </>
    )
  } else {
    reviewButtons = null;
  }

  return (
    <>
      {isLoaded && (
        <div className="SpotPageContainer">
          <div className="spotContainer">
            <h1>{name}</h1>
            <ul className="spotImageDiv">
              {spot.Images.map((image) => {
                if (image) {
                  return (
                    <li className="spotImage" key={image.id}>
                      <img src={image.url} className="spotImage" />
                    </li>
                  );
                }
              })}
            </ul>
            <ul className="spotInfo">
              <li> {price} per night</li>
              <br />
              <li>
                {city},{state} | {country}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="userButtons">{userButtons}</div>
      <br />
      {reviewButtons}
      <br />
      <div className="reviewsContainer">
        <h1>R E V I E W S </h1>
        {spot.Reviews.map((review) => {
          if (review) {
            return <p>{review.review}</p>;
          }
        })}
      </div>
    </>
  );
}

export default SpotPage;
