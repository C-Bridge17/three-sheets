import react, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHomepage } from "../../store/splash";

const Checkin = () => {
  const dispatch = useDispatch()

  // const feed = useSelector(state => Object.values(state.feed))



  useEffect(() => {
    dispatch(getHomepage())
  }, [dispatch])


  return (
    <>
      <h2>Test</h2>
      {/* {feed && feed.map((el) => <h1>{el.Drink.Name}</h1>)} */}
    </>
  )
}

export default Checkin;
