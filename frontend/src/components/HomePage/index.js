import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter, NavLink, Route, useParams } from "react-router-dom";
import { NavLink, useParams } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import { getSpots, addReview } from "../../store/spots";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // const allSpots = useSelector((state) => {
  //   let spotsArray = Object.entries(state.spots);
  //   let spots = spotsArray.map((obj) => obj[1]);
  //   return spots;
  // });
  const spots = useSelector((state) => Object.values(state.spots));

  console.log(spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  //To DO - UPDATE HREF ON LINE 46 TO REFLECT route to SPOT ID page
  return (
    <main>
      <nav>
        <div className="homeContainer">
          <h2>Magical Spots</h2>
          <ul className ="homeContainer">
            {spots.map((spot) => {
              return (
                <div className="spotDiv">
                  <li>
                    <NavLink to={`/spots/${spot.id}`}>
                      <h3>{spot.name}</h3>
                    </NavLink>

                    <ul className="spotImagesDiv">
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
                    <ul>
                      <li className="spotList" id="spotPrice">
                        ${spot.price} per night
                      </li>
                      <li classname="spotList" id="spotCity">
                        {spot.city}, {spot.state}
                      </li>
                    </ul>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </nav>
    </main>
  );
}

export default HomePage;
