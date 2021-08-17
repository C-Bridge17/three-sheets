import thunk from 'redux-thunk'

const LOAD = "splash/LOAD"

const loadFeed = feed => ({
  type: LOAD,
  feed,
})


export const getHomepage = () => async dispatch => {
  const res = await fetch(`/api/`);

  const feed = await res.json();
  if (res.ok) {
    dispatch(loadFeed(feed))
  }
  return feed
}




const homePageReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const pageFeed = {}
      action.feed.forEach((el) => pageFeed[el.id] = el)
      return {
        ...pageFeed,
        ...state
      }
    default:
      return state
  }
}

export default homePageReducer
