import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import UpdateCheckin from "../UpdateCheckin";
import { delCheckin } from "../../store/splash";


const DrinkPageModal = ({ el }) => {
  const dispatch = useDispatch()
  const [currentCheckin, setCurrentCheckin] = useState()
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  let userCheck = true
  const checkUser = (checkinUser) => {
    if (!sessionUser) return userCheck = true
    if (sessionUser.id === checkinUser.userId) {
      userCheck = false
    } else {
      userCheck = true
    }
  }
  const deleteCheckin = (checkinId) => {
    dispatch(delCheckin(checkinId))
    window.location.reload()
  }

  const updateCheckin = (checkinId) => {
    setCurrentCheckin(checkinId)
    setShowModal(true)
  }

  return (

    <div key={el.id} className="checkin-feed-div">
      {checkUser(el)}
      <div className='checkin-delete-button-div'>
        <button
          className='checkin-delete-button'
          hidden={userCheck}
          onClick={() => deleteCheckin(el.id)}
        >
          ❌
        </button>
      </div>
      <h3>
        <NavLink to={`/users/${el.User.id}`}>{el.User.username}</NavLink>
      </h3>
      <p className='comment-container'>{`"${el.comment}"`}</p>
      <div className='checkin-delete-button-div'>
        <button className='checkin-update-button' value={el.id} onClick={(e) => updateCheckin(e.target.value)} hidden={userCheck}>Update Check-In</button>
      </div >
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateCheckin setShowModal={setShowModal} checkinId={currentCheckin} />
        </Modal>
      )}
    </div>




  )

}


export default DrinkPageModal
