import { csrfFetch } from "./csrf";

const LOAD = "spots/load";
const LOAD_ONE = "spots/loadOne";
const ERASE = "spots/erase";
const ADD = "spots/add";
const ADD_REVIEW = "spots/addReview"

const load = (spots, images) => {
  return {
    type: LOAD,
    spots,
    images,
  };
};

const loadOne = (spot, image, review) => {
  return {
    type: LOAD_ONE,
    spot,
    image,
    review
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

const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})


//get all spots
export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(load(spots));
  }
};

//get one spot
export const getOneSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  const data = await res.json();
  dispatch(loadOne(data.spot));
  return data.spot;
};
//edit spot
export const editSpot = (editedSpot) => async (dispatch) => {
  const spotId = editedSpot.spotId;
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedSpot),
  });
  const data = await res.json();
  await dispatch(editSpot(data.spot, data.image));
};

//add spot
export const addSpot = (spot) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spot)
  });

  const data = await res.json();

  await dispatch(add(data.spot, data.image));
  return data.spot;
}

//delete spot
export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (data.message) {
    dispatch(erase(spotId));
  }
};

//addReview
export const createReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews`, {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(review)
  });
  const data = await res.json();
  dispatch(addReview(data.review))
  return data.review
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
    case ADD:
      newState = {...state};
      newState[action.spot.id] = action.spot;
      newState[action.spot.id].Images = [];
      newState[action.spot.id].Images.push(action.image);
      return newState;

    case ERASE:
      newState = { ...state };
      delete newState[action.spotId];
      return newState;

    case ADD_REVIEW:
     const spotId = action.review.spotId

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
