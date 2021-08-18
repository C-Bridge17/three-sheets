import thunk from 'redux-thunk'

const LOAD = "splash/LOAD"
const ADD_CHECKIN = "checking/ADD_CHECKIN"

const loadFeed = feed => ({
  type: LOAD,
  feed,
})

const addCheckin = payload => ({
  type: ADD_CHECKIN,
  payload
})

export const postCheckin = (payload) => async dispatch => {
  const res = await fetch('/api/checkin', {
    method: 'POST',
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const list = await res.json(payload)
  if (res.ok) {
    dispatch(addCheckin(list))
  }
  return payload
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
        ...action.payload
      }
      return newState
    }

    default:
      return state
  }
}

export default homePageReducer
