import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import {addSpot} from "../../store/spots";


const stateOptions = ["OR", "WA"];
const countryOptions = ["CA", "US"];


function CreateSpot () {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) =>  state.session.user);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState(stateOptions[0]);
    const [country, setCountry] = useState(stateOptions[0]);
    const [price, setPrice] = useState("");
    const [url, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);



    if (!sessionUser) return <Redirect to="/login" />;
    const handleSubmit = (e) => {
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


      const userId = sessionUser.id
      const newSpot = {
        userId,
        name,
        address,
        city,
        state,
        country,
        price,
        url,
      };

      if(errors.length === 0){
  dispatch(addSpot(newSpot)).then((spot) => history.push(`/spots/${spot.id}`));
      }
      else return

    };

    return (
      <>
        <div className="formContainer">
          <h2> Create A New Spot</h2>
          <form onSubmit={handleSubmit}>
            <ul className="errors">
              {errors.map((error) => (
                <li key={error}>
                  {error}
                </li>
              ))}
            </ul>
            <br/>
            <label>
              Location Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </label>
            <label id="state">
              State
              <select
                className="select"
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
                className="select"
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
            <button type="submit">SAVE SPOT</button>
          </form>
        </div>
      </>
    );
}

export default CreateSpot;
