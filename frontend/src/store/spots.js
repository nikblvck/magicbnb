import { csrfFetch } from "./csrf";

const LOAD = "spots/load";
const LOAD_ONE = "spots/loadOne";
const ERASE = "spots/erase";
const ADD = "spots/add";

const load = (spots, images) => {
  return {
    type: LOAD,
    spots,
    images,
  };
};

const loadOne = (spot, image) => {
  return {
    type: LOAD_ONE,
    spot,
    image,
  };
};


const add = (spot, image) => {
  return {
    type: ADD,
    spot,
    image,
  };
};


const erase = (spotId) => ({
  type: ERASE,
  spotId,
});

//get all spots
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(load(spots));
  }
};

//get one spot
export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(loadOne(data.spot));
  return data.spot;
};
//edit spot
export const editSpot = (editedSpot) => async (dispatch) => {
  const spotId = editedSpot.spotId;
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedSpot),
  });
  const data = await response.json();
  await dispatch(addSpot(data.spot, data.image));
};

//add spot
export const addSpot = (spot) => async(dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spot)
  });

  const data = await response.json();

  await dispatch(add(data.spot, data.image));
  return data.spot;
}

//delete spot
export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (data.message) {
    dispatch(erase(spotId));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOAD:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;

    case LOAD_ONE:
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;

    case ERASE:
      newState = { ...state };
      delete newState[action.spotId];
      return newState;

    case ADD:
      const spotId = action.spot.id;

      if (!state[spotId]) {
        return { ...state, [spotId]: { Reviews: [action.review] } };
      }

      newState = { ...state };
      newState[spotId].Reviews = [...state[spotId].Reviews, action.review];
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
