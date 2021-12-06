import { csrfFetch } from "./csrf";

const LOAD = "spots/load";
const LOAD_ONE = "spots/loadOne";
const ERASE = "spots/erase";

const load = (spots, images) => {
  return{
    type: LOAD,
    spots,
    images
  }
}

const loadOne = (spot, image) => {
  return {
    type: LOAD_ONE,
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

//delete spot
export const deleteSpot = (spotId) => async(dispatch) => {
  const response = await csrfFetch(`api/spots/${spotId}`, {
    method: 'DELETE'
  });

  const data = await response.json();
  if(data.message) {
    dispatch(erase(spotId))
  }
}


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
      newState = {...state};
      delete newState[action.spotId]
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
