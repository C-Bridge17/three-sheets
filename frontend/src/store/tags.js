import thunk from "redux-thunk";
import { csrfFetch } from './csrf';

const LOAD = 'tag/LOAD'



const loadTag = list => ({
  type: LOAD,
  list,
})



export const tagList = () => async dispatch => {
  const res = await fetch(`/api/tags`);
  const list = await res.json();
  if (res.ok) {
    dispatch(loadTag(list))
  }
  return list
}




const tagReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const tags = {}
      action.list.forEach((el) => tags[el.id] = el)
      return {
        ...tags,
        ...state
      }
    default:
      return state
  }
}
export default tagReducer
