import thunk from "redux-thunk";

const LOAD = 'drinks/LOAD'


const loadDrinks = list => ({
  type: LOAD,
  list,
})


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
    default:
      return state
  }
}

export default drinksReducer
