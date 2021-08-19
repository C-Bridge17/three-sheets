import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHomepage } from "../../store/splash";
import FeedModalCard from "../FeedModalCard";
import './checkin.css'



const Checkin = ({ isLoaded }) => {
  const [currentCheckin, setCurrentCheckin] = useState()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.updatedAt).reverse())

  useEffect(() => {
    dispatch(getHomepage())
  }, [dispatch,])

  return (
    <div className='checkin-feed-container'>


      <h2>Recent Check-In</h2>
      {
        feed && feed.map((el) => (
          <FeedModalCard el={el} />
        ))
      }
    </div >
  )
}

export default Checkin
