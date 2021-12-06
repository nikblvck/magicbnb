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

  console.log(spot);

  useEffect(() => {
    dispatch(getOneSpot(spotId))
      .then((spot) => setSpot(spot))
      .then(() => setIsLoaded(true));
  }, [dispatch]);
  const { id, name, address, cityName, stateName, country, price } = spot;

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
        <button onClick={handleSubmit}> Edit</button>
        <button onClick={handleDelete}> Delete</button>
      </>
    );
  } else {
    userButtons = null;
  }

  return (
    <>
      {isLoaded && (
        <div className="SpotPage">
          <div className="spotContainer">
            <h1>{name}</h1>
            <div className="spotImageDiv">
              {spot.Images.map((image) => {
                if (image) {
                  return (
                    <div className="spotImage" key={image.id}>
                      <img src={image.url} className="spotImage" />
                    </div>
                  );
                }
              })}
            </div>
            <ul className="spotInfo">
              <li> {price} per night</li>
              <li>
                {cityName},{stateName} | {country}
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* <div>
        <h1>{spot.name}</h1>
      </div>
      <div className="spotIdContainer">
        {spot.Images.map((image) => {
          if (image) {
            return (
              <div className="spotImageDiv" key={image.id}>
                <img src={image.url} className="spotImage" />
              </div>
            );
          }
        })}
        <ul>
          <li>{spot.price} per night</li>
          <li>{spot.cityName}, {spot.stateName}</li>
        </ul>
      </div> */}
      {userButtons}
    </>
  );
}

export default SpotPage;
