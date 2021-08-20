import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { drinkList } from "../../store/drinks";
import { useDebounce } from "../../hooks/useDebounce";
import { Modal } from "../../context/Modal";
import { postCheckin } from "../../store/splash";
import './checkinForm.css'
import AddDrinkForm from "../AddDrinkForm";

const CheckInForm = ({ user }) => {
  const dispatch = useDispatch()
  const [selectedDrink, setSelectedDrink] = useState('')
  const [disable, setDisable] = useState(true)
  const [drinkId, setDrinkId] = useState(1)
  const [userId, setUserId] = useState(user.id)
  const [comment, setComment] = useState('')
  const [search, setSearch] = useState('')
  const [visibleDrinks, setVisibleDrinks] = useState([])
  const [showModal, setShowModal] = useState(false);
  const debouncedSearch = useDebounce(search, 250)


  const drinks = useSelector(state => Object.values(state.drinks))

  useEffect(() => {
    dispatch(drinkList())
  }, [dispatch])

  const searchDrinks = (drinkName) => {
    const lowerCaseDrinkName = drinkName.toLowerCase()
    const drinkArray = drinks.filter(el => {
      return el.name.toLowerCase().includes(lowerCaseDrinkName)
    })
    setVisibleDrinks(drinkArray)
  }


  useEffect(() => {
    searchDrinks(search)
  }, [debouncedSearch])



  const handleSubmit = (e) => {
    e.preventDefault()
    if (drinkId) {
      const payload = { drinkId, userId, comment }
      dispatch(postCheckin(payload))
      window.location.reload()
    }
  }

  return (
    <div className='update-checkin-modal'>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddDrinkForm setShowModal={setShowModal} />
        </Modal>
      )}
      <div className='update-checkin-header'>
        <h2>Check-In</h2>
      </div>
      <div className='update-form-container'>
        <form onSubmit={handleSubmit} className='update-form'>
          <h3>Search drinks:</h3>
          <input
            className="drink-input-update"
            value={search}
            onChange={(e) => (setSearch(e.target.value), setDisable(true))}
          >
          </input>
          <h3>If your Drink is not in our database: </h3>
          <button type='button' onClick={(e) => setShowModal(true)}>Add Drink to our database</button>
          <h3>Select an avaible drink: </h3>
          <ul className='search-update-drinks'>
            {visibleDrinks && selectedDrink !== search && visibleDrinks.map(el =>
              <li
                key={el.id}
              ><button
                value={el.name}
                onClick={() => (
                  setDisable(false),
                  setSelectedDrink(el.name),
                  setSearch(el.name),
                  setDrinkId(el.id)
                )}
              >
                  {el.name}</button>
              </li>)}
          </ul>
          <h3>Comment:</h3>
          <textarea
            className="comment-textarea-update"
            placeholder="Leave a review"
            maxLength='255'
            onChange={(e) => setComment(e.target.value)}
          >
          </textarea>
          <button type='submit' disabled={disable}>Confirm</button>
        </form >
      </div>

    </div >
  )
}
export default CheckInForm
