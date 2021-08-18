import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHomepage } from "../../store/splash";
import FeedModalCard from "../FeedModalCard";
import './checkin.css'
import { delCheckin } from "../../store/splash";


const Checkin = ({ isLoaded }) => {
  const [currentCheckin, setCurrentCheckin] = useState()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.id).reverse())

  const deleteCheckin = (checkinId) => {
    dispatch(delCheckin(checkinId))
    window.location.reload()
  }

  const updateCheckin = (checkinId) => {
    setCurrentCheckin(checkinId)
    setShowModal(true)
  }


  useEffect(() => {
    dispatch(getHomepage())
  }, [dispatch])

  return (
    <div className='checkin-feed-container'>

      {
        feed && feed.map((el) => (
          <FeedModalCard el={el} />
          //   <div key={el.id} className="checkin-feed-div">
          //     {aOrAn(el.Drink.name)}
          //     {checkUser(el)}
          //     <div className='checkin-delete-button-div'>
          //       <button
          //         className='checkin-delete-button'
          //         hidden={userCheck}
          //         onClick={() => deleteCheckin(el.id)}
          //       >
          //         ❌
          //       </button>
          //     </div>
          //     <h3>
          //       <NavLink to={`/users/${el.User.id}`}>{el.User.username}</NavLink> {`is drinking ${a}`} <NavLink to={`/drinks/${el.Drink.id}`}>{el.Drink.name}</NavLink> by <NavLink to={`/stores/${el.Drink.Store.id}`}>{el.Drink.Store.title}</NavLink>
          //     </h3>
          //     <p>{`at ${el.Drink.Store.location}.`}</p>
          //     <p className='comment-container'>{`"${el.comment}"`}</p>
          //     <div className='checkin-delete-button-div'>
          //       <button className='checkin-update-button' value={el.id} onClick={(e) => updateCheckin(e.target.value)} hidden={userCheck}>Update Check-In</button>
          //     </div >
          //     {showModal && (
          //       <Modal onClose={() => setShowModal(false)}>
          //         <UpdateCheckin checkinId={currentCheckin} />
          //       </Modal>
          //     )}
          //   </div>
        ))
      }
    </div >
  )
}

export default Checkin
