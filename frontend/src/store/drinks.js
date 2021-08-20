import thunk from "redux-thunk";
import { csrfFetch } from './csrf';

const LOAD = 'drinks/LOAD'
const POST_DRINK = 'drinks/POST_DRINKS'



const loadDrinks = list => ({
  type: LOAD,
  list,
})
const addDrinks = list => ({
  type: POST_DRINK,
  list,
})


export const postDrink = payload => async dispatch => {
  const res = await csrfFetch('/api/drinks', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  const list = await res.json()
  if (res.ok) {
    dispatch(addDrinks(list))
  }
  return list
}


export const drinkList = () => async dispatch => {
  const res = await fetch(`/api/drinks`);
  const list = await res.json();
  if (res.ok) {
    dispatch(loadDrinks(list))
  }
  return list
}
const drinksReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const drinks = {}
      action.list.forEach((el) => drinks[el.id] = el)
      return {
        ...drinks,
        ...state
      }
    case POST_DRINK: {
      return {
        ...state,
        [action.list.id]: action.list,
      };
    }
    default:
      return state
  }
}

export default drinksReducer
