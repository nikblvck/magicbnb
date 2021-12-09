import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, Redirect } from "react-router";
import { useParams } from "react-router-dom";
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
  const [url, setImageUrl] = useState(spot?.Images[0].url)
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneSpot(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

 if (!sessionUser) return <Redirect to="/login" />;
  const handleEdit = async function(e){
    e.preventDefault();

       const validationErrors = [];

       if (!name) validationErrors.push("Please give your spot a name");
       if (name.length < 10)
         validationErrors.push(
           "Location name must be greater than 10 characters"
         );
       if (name.length > 255)
         validationErrors.push(
           "Location Name Must Be Less Than 255 Characters"
         );
       if (!address) validationErrors.push("Please enter an address");
       if (!city) validationErrors.push("Please enter a city");
       if (!state) validationErrors.push("Please select a state");
       if (!country) validationErrors.push("Please select a country");
       if (!price) validationErrors.push("Please enter a price");
       setErrors(validationErrors);

    const userId = sessionUser.id;
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

   dispatch(editSpot(editedSpot))
    console.log(spot)

      history.push(`/spots/${spot.id}`)

  };


  return (
    <>
      {isLoaded && (

        <div className="formContainer">
          <h2> Edit Your Spot</h2>
          <form  onSubmit={handleEdit}>
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
            <button type="submit" onClick={handleEdit}>Update Spot</button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditSpot;
