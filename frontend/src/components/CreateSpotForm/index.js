import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from "react";
import { useHistory } from "react-router";
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
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState("");
    const [url, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
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
      dispatch(addSpot(newSpot)).then((spot) =>
      history.push(`spots/${spot.id}`));
    };

    return (
      <>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
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
            <button type="submit">SAVE SPOT</button>
          </form>
        </div>
      </>
    );
}

export default CreateSpot;
