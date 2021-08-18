import thunk from 'redux-thunk'
import { csrfFetch } from './csrf';
const LOAD = "splash/LOAD"
const ADD_CHECKIN = "checkin/ADD_CHECKIN"
const DEL_CHECKIN = "checkin/DEL_CHECKIN"
const PUT_CHECKIN = "checkin/PUT_CHECKIN"


const updateCheckin = payload => ({
  type: PUT_CHECKIN,
  payload
})

const loadFeed = feed => ({
  type: LOAD,
  feed,
})

const addCheckin = payload => ({
  type: ADD_CHECKIN,
  payload
})

const deleteCheckin = (checkinId) => ({
  type: DEL_CHECKIN,
  checkinId
})

export const putCheckin = payload => async dispatch => {
  const res = await csrfFetch(`/api/checkin/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  })
  const updated = await res.json()
  if (res.ok) {
    dispatch(updateCheckin(updated))
  }
  return updated
}


export const delCheckin = (checkinId) => async dispatch => {
  const res = await csrfFetch(`/api/checkin/${checkinId}`, {
    method: 'DELETE'
  })
  const deleted = await res.json()
  if (res.ok) {
    dispatch(deleteCheckin(deleted))
  }
  return deleted
}

export const postCheckin = (payload) => async dispatch => {
  const res = await csrfFetch('/api/checkin', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  const list = await res.json()
  if (res.ok) {
    dispatch(addCheckin(list))
  }
  return list
}

export const getHomepage = () => async dispatch => {
  const res = await fetch(`/api/`);

  const feed = await res.json();
  if (res.ok) {
    dispatch(loadFeed(feed))
  }
  return feed
}




const homePageReducer = (state = {}, action) => {
  const pageFeed = {}
  switch (action.type) {
    case LOAD:
      action.feed.forEach((el) => pageFeed[el.id] = el)
      return {
        ...pageFeed,
        ...state
      }
    case ADD_CHECKIN: {
      const newState = {
        ...state,
        [action.payload.id]: action.payload
      }
      return newState
    }
    case DEL_CHECKIN: {
      const newState = { ...state };
      delete newState[action.checkinId];
      return newState;
    }
    case PUT_CHECKIN: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    default:
      return state
  }
}

export default homePageReducer
