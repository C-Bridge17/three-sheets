export const getHomepage = () => async dispatch => {
  const res = await fetch(`/api/home`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
  return res
}
