const LOAD = 'USER/LOAD'

const loadUser = list => ({
  type: LOAD,
  list,
})

export const getUser = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}`);

  const user = await res.json();
  if (res.ok) {
    dispatch(loadUser(user))
  }
  return user
}


const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...action.list,
        ...state
      }
    default:
      return state
  };
}

export default sessionReducer;
