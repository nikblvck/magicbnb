import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { useParams } from "react-router-dom";
import * as sessionActions from "../../store/spots";
import { getOneSpot, editSpot } from "../../store/spots";


const stateOptions = ["OR", "WA"];
const countryOptions = ["CA", "US"];

function EditSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState(spot?.name);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [price, setPrice] = useState(spot?.price);
  const [url, setImageUrl] = useState("")
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneSpot(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  const handleEdit = (e) => {

    e.preventDefault();
    const userId = sessionUser.id
    const editedSpot = {
      userId,
      spotId,
      name,
      address,
      city,
      state,
      country,
      price,
      url,
    };
    dispatch(editSpot(editedSpot)).then((spot) =>
      history.push(`/spots/${spot.id}`)
    );
  };

  return (
    <>
      {isLoaded && (
        <div>
          <form onSubmit={handleEdit}>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
            <label>
              Location Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <label id="state">
              State
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {stateOptions.map((option) => (
                  <option>{option}</option>
                ))}
                ;
              </select>
            </label>
            <label id="country">
              Country
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryOptions.map((option) => (
                  <option>{option}</option>
                ))}
                ;
              </select>
            </label>
            <label>
              Price - US Dollars
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <label>
              Image URL
              <input
                type="text"
                value={url}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <button type="submit">Update Spot</button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditSpot;
