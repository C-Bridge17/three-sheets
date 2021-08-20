import thunk from "redux-thunk";
import { csrfFetch } from './csrf';
const LOAD = 'store/LOAD'
const POST_STORES = 'store/PUT_STORES'


const loadStore = list => ({
  type: LOAD,
  list,
})

const addStore = payload => ({
  type: POST_STORES,
  payload,
})

export const storeList = () => async dispatch => {
  const res = await fetch(`/api/store`);
  const list = await res.json();
  if (res.ok) {
    dispatch(loadStore(list))
  }
  return list
}

export const postStore = (payload) => async dispatch => {
  const res = await csrfFetch('/api/store', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  const list = await res.json()
  if (res.ok) {
    dispatch(addStore(list))
  }
  return list
}


const storeReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const stores = {}
      action.list.forEach((el) => stores[el.id] = el)
      return {
        ...stores,
        ...state
      }
    case POST_STORES: {
      return {
        ...state,
        [action.list.id]: action.list,
      };
    }
    default:
      return state
  }
}
export default storeReducer
