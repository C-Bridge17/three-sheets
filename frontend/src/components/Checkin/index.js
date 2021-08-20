import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHomepage } from "../../store/splash";
import FeedModalCard from "../FeedModalCard";
import DrinkSplash from "../DrinkSplash";
import './checkin.css'



const Checkin = ({ isLoaded }) => {
  const dispatch = useDispatch()
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.updatedAt).reverse().slice(0, 25))

  useEffect(() => {
    dispatch(getHomepage())
  }, [dispatch,])

  return (
    <div className='page-container'>
      <div className='checkin-feed-container'>

        <h2>Recent Check-In</h2>
        {
          feed && feed.map((el) => (
            <FeedModalCard el={el} key={el.id} />
          ))
        }
      </div >
      <div className='drink-container-splash'>
        <DrinkSplash feed={feed} />
      </div>


    </div>
  )
}

export default Checkin
